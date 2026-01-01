import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ErrorLogService } from '../services/error-log.service';
import { catchError, throwError } from 'rxjs';
import { ErrorResponseDto } from '../models/error-log.models';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);
  const errorLogService = inject(ErrorLogService);
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let displayMessage = 'Er is een onbekende fout opgetreden';
      let summary = 'Fout';

      // 1. Probeer de ErrorResponseDto uit het backend-antwoord te halen
      const apiError = error.error as ErrorResponseDto;
      
      if (error.status === 0) {
        // Netwerkfout (bijv. API staat uit of CORS probleem)
        displayMessage = 'Kan geen verbinding maken met de server.';
        summary = 'Netwerkfout';
      } 
      else if (error.status === 401) {
        displayMessage = 'U bent niet ingelogd of uw sessie is verlopen of u heeft geen toegang.';
        summary = 'Niet geautoriseerd';
      }
      else if (error.status === 403) {
        displayMessage = 'U heeft geen toestemming voor deze actie.';
        summary = 'Toegang geweigerd';
      }
      else if (apiError && apiError.message) {
        // Als de backend een specifiek bericht stuurde via onze Middleware
        displayMessage = apiError.message;
        summary = `Server fout ${error.status}`;
      }

      // 2. Toon de PrimeNG Toast
      messageService.add({
        severity: 'error',
        summary: summary,
        detail: displayMessage,
        life: 5000
      });

      // 3. Log de fout in onze ErrorLog Service (voor de tabel)
      errorLogService.logError({
        timestamp: new Date(),
        statusCode: error.status,
        message: summary,
        details: displayMessage
      });

      // Geef de fout door aan de aanroepende component
      return throwError(() => error);
    })
  );
};
