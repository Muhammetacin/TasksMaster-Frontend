import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    // Publieke routes
    { path: 'login', loadComponent: () => import('./auth/login/login').then(m => m.LoginComponent) },
    { path: 'register', loadComponent: () => import('./auth/register/register').then(m => m.RegisterComponent) },

    // Beveiligde routes (met functionele Guard)
    { 
        path: 'tasks', 
        canActivate: [authGuard],
        loadComponent: () => import('./tasks/task-list/task-list').then(m => m.TaskListComponent) 
    },

    // Standaard routering
    { path: '', redirectTo: 'tasks', pathMatch: 'full' },
    { path: '**', redirectTo: 'tasks' }
];
