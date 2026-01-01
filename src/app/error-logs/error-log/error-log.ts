import { Component, inject } from '@angular/core';
import { ErrorLogService } from '../../core/services/error-log.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-error-log',
  imports: [
    CommonModule, 
    TableModule, 
    ButtonModule, 
    TagModule, 
    CardModule
  ],
  templateUrl: './error-log.html',
  styleUrl: './error-log.scss',
})
export class ErrorLogComponent {
  public errorService = inject(ErrorLogService);

  getSeverity(status: number): "success" | "secondary" | "info" | "warn" | "danger" | "contrast" | undefined {
    if (status >= 500) return 'danger';
    if (status >= 400) return 'warn';
    return 'info';
  }
}
