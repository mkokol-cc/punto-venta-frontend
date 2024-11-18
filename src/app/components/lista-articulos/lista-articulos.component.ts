import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ArticuloService } from '../../services/articulo.service';
import { Articulo } from '../../interfaces/articulo';

@Component({
  selector: 'app-lista-articulos',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule, 
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './lista-articulos.component.html',
  styleUrl: './lista-articulos.component.scss'
})
export class ListaArticulosComponent {
  articulos: Articulo[] = []
  displayedColumns: string[] = ['codigo', 'nombre', 'descripcion', 'precio'];
  
  constructor(private service:ArticuloService){
    this.service.list().subscribe(obj=>{
      this.articulos = obj
    })
  }
  send(string:string){
    alert(string)
  }
}
