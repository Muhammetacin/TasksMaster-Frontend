import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { TaskItem } from '../models/taskItem.model';
import { API_CONFIG } from '../../core/config/api.config';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);
  private apiUrl = `${API_CONFIG.baseUrl}${API_CONFIG.tasks.base}`;
  private tasksSubject = new BehaviorSubject<TaskItem[]>([]);
  public tasks$ = this.tasksSubject.asObservable();

  getTasks(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(this.apiUrl).pipe(
      tap(tasks => this.tasksSubject.next(tasks))
    );
  }

  loadTasks(): void {
    this.getTasks().subscribe();
  }

  getTask(id: number): Observable<TaskItem> {
    return this.http.get<TaskItem>(`${this.apiUrl}/${id}`);
  }

  createTask(task: Partial<TaskItem>): Observable<TaskItem> {
    return this.http.post<TaskItem>(this.apiUrl, task).pipe(
      tap(newTask => {
        const currentTasks = this.tasksSubject.value;
        this.tasksSubject.next([...currentTasks, newTask]);
      })
    );
  }

  updateTask(id: string, task: TaskItem): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, task).pipe(
      tap(() => {
        const currentTasks = this.tasksSubject.value;
        const updatedTasks = currentTasks.map(t => t.id === id ? task : t);
        this.tasksSubject.next(updatedTasks);
      })
    );
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentTasks = this.tasksSubject.value;
        const filteredTasks = currentTasks.filter(t => t.id !== id);
        this.tasksSubject.next(filteredTasks);
      })
    );
  }
}
