import { Injectable, signal } from '@angular/core';
import { ErrorResponseDto } from '../models/error-log.models';

@Injectable({
  providedIn: 'root',
})
export class ErrorLogService {
  // Een Signal die de lijst met fouten bijhoudt
  private errorLogsSignal = signal<ErrorResponseDto[]>([]);
  
  // Read-only versie voor de componenten
  public errorLogs = this.errorLogsSignal.asReadonly();

  logError(log: ErrorResponseDto) {
    this.errorLogsSignal.update(logs => [log, ...logs]); // Nieuwste bovenaan
  }

  clearLogs() {
    this.errorLogsSignal.set([]);
  }
}
