import { Component, ViewChild } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { ListaArticulosComponent } from '../../components/lista-articulos/lista-articulos.component';
import { FormComboComponent } from '../../components/form-combo/form-combo.component';
import {MatButtonModule} from '@angular/material/button';
import { UploadArticuloComponent } from '../../components/upload-articulo/upload-articulo.component';
import { Articulo } from '../../interfaces/articulo';

@Component({
  selector: 'app-articulos',
  standalone: true,
  imports: [
    MatTabsModule,
    FormComboComponent,
    ListaArticulosComponent,
    
    MatButtonModule
  ],
  templateUrl: './articulos.component.html',
  styleUrl: './articulos.component.scss'
})
export class ArticulosComponent {
  selectedTabIndex = 0
  articuloSelected?:Articulo
  @ViewChild(ListaArticulosComponent) lista!: ListaArticulosComponent;

  toEdit(articulo:Articulo){
    this.articuloSelected = articulo
    this.selectedTabIndex = 1
  }

  new(){
    this.articuloSelected = undefined
    this.selectedTabIndex = 1
  }

  reloadList(){
    this.lista.getItems()
  }
}
