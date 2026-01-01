import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { noAuthGuard } from './core/guards/no-auth.guard';

export const routes: Routes = [
    // Publieke routes
    { 
        path: 'login', 
        canActivate: [noAuthGuard], 
        loadComponent: () => import('./auth/login/login').then(m => m.LoginComponent) 
    },
    { 
        path: 'register', 
        canActivate: [noAuthGuard],
        loadComponent: () => import('./auth/register/register').then(m => m.RegisterComponent) 
    },

    // Beveiligde routes (met functionele Guard)
    { 
        path: 'tasks', 
        canActivate: [authGuard],
        loadComponent: () => import('./tasks/task-list/task-list').then(m => m.TaskListComponent) 
    },
    { 
        path: 'error-logs', 
        loadComponent: () => import('./error-logs/error-log/error-log').then(m => m.ErrorLogComponent) 
    },

    // Standaard routering - redirect to tasks
    { path: '', redirectTo: 'tasks', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];
