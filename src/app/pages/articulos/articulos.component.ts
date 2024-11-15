import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { ListaArticulosComponent } from '../../components/lista-articulos/lista-articulos.component';
import { FormComboComponent } from '../../components/form-combo/form-combo.component';

@Component({
  selector: 'app-articulos',
  standalone: true,
  imports: [
    MatTabsModule,
    FormComboComponent,
    ListaArticulosComponent
  ],
  templateUrl: './articulos.component.html',
  styleUrl: './articulos.component.scss'
})
export class ArticulosComponent {
  selectedTabIndex = 0
}
