import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { ListaArticulosComponent } from '../../components/lista-articulos/lista-articulos.component';
import { FormComboComponent } from '../../components/form-combo/form-combo.component';
import {MatButtonModule} from '@angular/material/button';
import { UploadArticuloComponent } from '../../components/upload-articulo/upload-articulo.component';

@Component({
  selector: 'app-articulos',
  standalone: true,
  imports: [
    MatTabsModule,
    FormComboComponent,
    ListaArticulosComponent,
    UploadArticuloComponent,
    MatButtonModule
  ],
  templateUrl: './articulos.component.html',
  styleUrl: './articulos.component.scss'
})
export class ArticulosComponent {
  selectedTabIndex = 0
}
