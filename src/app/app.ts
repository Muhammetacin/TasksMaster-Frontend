import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    ToastModule, 
    ConfirmDialogModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('TasksMaster-Frontend');

  constructor(private primeng: PrimeNG) {}

    ngOnInit() {
        this.primeng.ripple.set(true);
    }
}
