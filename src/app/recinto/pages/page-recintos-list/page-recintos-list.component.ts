import { Component } from '@angular/core';
import { ListRecintoComponent } from '../../components/list-recinto/list-recinto.component';

@Component({
  selector: 'app-page-recintos-list',
  standalone: true,
  imports: [ListRecintoComponent],
  templateUrl: './page-recintos-list.component.html',
  styleUrl: './page-recintos-list.component.css'
})
export class PageRecintosListComponent {

}
