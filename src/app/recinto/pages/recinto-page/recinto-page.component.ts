import { Component } from '@angular/core';
import { ListRecintoComponent } from '../../components/list-recinto/list-recinto.component';

@Component({
  selector: 'app-recinto-page',
  standalone: true,
  imports: [ListRecintoComponent],
  templateUrl: './recinto-page.component.html',
  styleUrl: './recinto-page.component.css'
})
export class RecintoPageComponent {
}
