import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; // Si usas Reactive Forms
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ArticuloService } from '../../services/articulo.service';
import { Articulo } from '../../interfaces/articulo';

@Component({
  selector: 'app-buscador-articulos',
  standalone: true,
  imports: [
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,

    ReactiveFormsModule,
    //FormsModule
  ],
  templateUrl: './buscador-articulos.component.html',
  styleUrl: './buscador-articulos.component.scss'
})
export class BuscadorArticulosComponent {
  items: Articulo[] = [];
  selectedArticulo?: Articulo;
  selected = new FormControl('',[Validators.required]);

  filter:string = ''
  combos:boolean = true
  productos:boolean = true

  constructor(private service:ArticuloService) {
    this.getItems()
  }

  getItems(){
    this.service.list(0,5,false,this.combos,this.productos,false,false,false,this.filter).subscribe(obj=>{
      this.items = <Articulo[]>obj.data
    })
  }

  onInputChange(event: any): void {
    const query = event.target.value;
    if(query.length){
      this.filter = query.toLowerCase()
      this.getItems()
    }else{
      this.filter = ''
    }
  }

  onEnter(): void {
    if(this.selected.value){
      this.service.getByCodigo(this.selected.value).subscribe(obj=>{
        this.selectedArticulo = obj
      })
    }
  }

  getSelected():Articulo|undefined{
    return this.items.find(item => item.codigo.toLowerCase() == this.selected.value?.toLowerCase());
  }
}
