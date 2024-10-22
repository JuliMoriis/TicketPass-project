import { Component } from '@angular/core';
import { ListRecintoComponent } from '../../components/list-recinto/list-recinto.component';
import { AddRecintoComponent } from "../../components/add-recinto/add-recinto.component";

@Component({
  selector: 'app-recinto-page',
  standalone: true,
  imports: [ListRecintoComponent, AddRecintoComponent],
  templateUrl: './recinto-page.component.html',
  styleUrl: './recinto-page.component.css'
})
export class RecintoPageComponent {
}
