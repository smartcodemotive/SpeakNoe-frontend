import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly apiUrl = `${environment.apiUrl}/api/tasks`;

  constructor(private http: HttpClient) {}

  submitTask(taskId: string, answer: string): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, { taskId, answer });
  }

  fetchTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }
}
