import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RecintoPageComponent } from './recinto/pages/recinto-page/recinto-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RecintoPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TicketPass-project';
}
