import { Component, inject } from '@angular/core';
import { Button } from "primeng/button";
import { AuthService } from '../../core/services/auth.service';
import { TaskService } from '../services/task.service';
import { TaskItem, TaskStatus } from '../models/taskItem.model';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  imports: [Button, AsyncPipe, FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskListComponent {
  private authService = inject(AuthService);
  TaskStatus = TaskStatus; // Expose enum to template

  // Will be deleted in future edits
  public onLogout() {
    console.log('Logout button clicked');
    this.authService.logout();
  }

  private taskService = inject(TaskService);
  
  tasks$ = this.taskService.tasks$;
  loading$ = new BehaviorSubject<boolean>(true);
  newTask = { title: '', description: '' };

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: () => {
        this.loading$.next(false);
      },
      error: (err) => {
        console.error('Fout bij laden taken', err);
        this.loading$.next(false);
      }
    });
  }

  deleteTask(id: string): void {
    if (confirm('Weet je zeker dat je deze taak wilt verwijderen?')) {
      this.taskService.deleteTask(id).subscribe({
        error: (err) => console.error('Fout bij verwijderen taak', err)
      });
    }
  }

  addTask(): void {
    if (this.newTask.title.trim()) {
      this.taskService.createTask(this.newTask).subscribe({
        next: (createdTask) => {
          this.loadTasks();
          this.newTask = { title: '', description: '' }; // Reset het formulier
        },
        error: (err) => console.error('Kon taak niet toevoegen', err)
      });
    }
  }
}
