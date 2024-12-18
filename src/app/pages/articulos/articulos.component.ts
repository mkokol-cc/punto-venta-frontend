import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { ListaArticulosComponent } from '../../components/lista-articulos/lista-articulos.component';
import { FormComboComponent } from '../../components/form-combo/form-combo.component';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-articulos',
  standalone: true,
  imports: [
    MatTabsModule,
    FormComboComponent,
    ListaArticulosComponent,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './articulos.component.html',
  styleUrl: './articulos.component.scss'
})
export class ArticulosComponent {
}
