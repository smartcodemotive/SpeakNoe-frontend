import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import {
  SubmitTask,
  FetchTasks,
  SetTasks,
  SetSubmitting,
  SetLoading
} from './tasks.actions';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export interface TasksStateModel {
  tasks: Task[];
  loading: boolean;
  submitting: boolean;
}

@State<TasksStateModel>({
  name: 'tasks',
  defaults: {
    tasks: [],
    loading: false,
    submitting: false
  }
})
@Injectable()
export class TasksState {
  constructor(private taskService: TaskService) {}

  @Selector()
  static tasks(state: TasksStateModel): Task[] {
    return state.tasks;
  }

  @Selector()
  static loading(state: TasksStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static submitting(state: TasksStateModel): boolean {
    return state.submitting;
  }

  @Action(SubmitTask)
  submitTask(ctx: StateContext<TasksStateModel>, action: SubmitTask) {
    ctx.patchState({ submitting: true });

    return this.taskService.submitTask(action.taskId, action.answer).pipe(
      tap((task) => {
        const state = ctx.getState();
        ctx.patchState({
          tasks: [task, ...state.tasks],
          submitting: false
        });
      }),
      catchError(() => {
        ctx.patchState({ submitting: false });
        return of(null);
      })
    );
  }

  @Action(FetchTasks)
  fetchTasks(ctx: StateContext<TasksStateModel>) {
    ctx.patchState({ loading: true });

    return this.taskService.fetchTasks().pipe(
      tap((tasks) => {
        ctx.patchState({
          tasks,
          loading: false
        });
      }),
      catchError(() => {
        ctx.patchState({ loading: false });
        return of(null);
      })
    );
  }

  @Action(SetTasks)
  setTasks(ctx: StateContext<TasksStateModel>, action: SetTasks) {
    ctx.patchState({ tasks: action.tasks });
  }

  @Action(SetSubmitting)
  setSubmitting(ctx: StateContext<TasksStateModel>, action: SetSubmitting) {
    ctx.patchState({ submitting: action.submitting });
  }

  @Action(SetLoading)
  setLoading(ctx: StateContext<TasksStateModel>, action: SetLoading) {
    ctx.patchState({ loading: action.loading });
  }
}
