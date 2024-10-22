import { Component } from '@angular/core';
import { Recinto } from '../../recinto.interface';
import { AddRecintoComponent } from '../add-recinto/add-recinto.component';

@Component({
  selector: 'app-list-recinto',
  standalone: true,
  imports: [AddRecintoComponent],
  templateUrl: './list-recinto.component.html',
  styleUrl: './list-recinto.component.css'
})
export class ListRecintoComponent {

}
