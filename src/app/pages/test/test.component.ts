import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngxs/store';
import { Select } from '@ngxs/store';
import { Observable, Subscription, interval } from 'rxjs';
import { TasksState } from '../../store/tasks.state';
import { SubmitTask, FetchTasks } from '../../store/tasks.actions';
import { Task } from '../../models/task.model';
import { StatusBadgeComponent } from '../../components/status-badge/status-badge.component';
@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, FormsModule, StatusBadgeComponent],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private pollSubscription?: Subscription;

  @Select(TasksState.tasks) tasks$!: Observable<Task[]>;
  @Select(TasksState.submitting) submitting$!: Observable<boolean>;
  @Select(TasksState.loading) loading$!: Observable<boolean>;

  answer = '';
  readonly maxAnswerLength = 200;
  readonly placeholderQuestion = 'Lorem ipsum dolor sit amet consectetur. Et sagittis morbi accumsan ultricies eu rhoncus. Ultrices rhoncus massa duis non id neque?';
  private readonly pollIntervalMs = 2000;

  ngOnInit() {
    this.store.dispatch(new FetchTasks());
    this.startPolling();
  }

  ngOnDestroy() {
    this.pollSubscription?.unsubscribe();
  }

  private startPolling() {
    this.pollSubscription = interval(this.pollIntervalMs).subscribe(() => {
      this.store.dispatch(new FetchTasks());
    });
  }

  onSubmit() {
    const trimmed = this.answer.trim();
    if (!trimmed || trimmed.length > this.maxAnswerLength) return;

    const taskId = crypto.randomUUID();
    this.store.dispatch(new SubmitTask(taskId, trimmed));
    this.answer = '';
  }

  refreshTasks() {
    this.store.dispatch(new FetchTasks());
  }

  get characterCount(): number {
    return this.answer.length;
  }
}
