import { Component } from '@angular/core';
import { ListRecintoComponent } from '../../components/list-recinto/list-recinto.component';
import { RouterLink, RouterModule } from '@angular/router';
import { FiltrarRecintoComponent } from '../../components/filtrar-recintos/filtrar-recintos.component';

@Component({
  selector: 'app-page-recintos-list',
  standalone: true,
  imports: [ListRecintoComponent, RouterModule, FiltrarRecintoComponent],
  templateUrl: './page-recintos-list.component.html',
  styleUrl: './page-recintos-list.component.css'
})
export class PageRecintosListComponent {

}
