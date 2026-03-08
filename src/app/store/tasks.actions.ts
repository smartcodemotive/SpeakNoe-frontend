import { Task } from '../models/task.model';

export class SubmitTask {
  static readonly type = '[Tasks] Submit Task';
  constructor(public taskId: string, public answer: string) {}
}

export class FetchTasks {
  static readonly type = '[Tasks] Fetch Tasks';
}

export class SetTasks {
  static readonly type = '[Tasks] Set Tasks';
  constructor(public tasks: Task[]) {}
}

export class SetSubmitting {
  static readonly type = '[Tasks] Set Submitting';
  constructor(public submitting: boolean) {}
}

export class SetLoading {
  static readonly type = '[Tasks] Set Loading';
  constructor(public loading: boolean) {}
}
