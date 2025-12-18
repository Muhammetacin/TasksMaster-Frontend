import { Component, inject } from '@angular/core';
import { Button } from "primeng/button";
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-task-list',
  imports: [Button],
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskListComponent {
  authService = inject(AuthService);

  public onLogout() {
    console.log('Logout button clicked');
    this.authService.logout();
  }
}
