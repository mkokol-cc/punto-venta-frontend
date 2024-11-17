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
  filteredItems: Articulo[] = [];
  selected = new FormControl('',[Validators.required]);

  constructor(private service:ArticuloService) {
    this.service.list().subscribe(obj=>{
      this.items = obj
      this.filteredItems = this.items;
    })
  }

  onInputChange(event: any): void {
    const query = event.target.value.toLowerCase();
    this.filteredItems = this.items.filter(item => item.nombre.toLowerCase().includes(query) || item.codigo.toLowerCase().includes(query));
  }

  onEnter(): void {
    console.log('Enter presionado, se puede realizar acción adicional');
  }

  getSelected():Articulo|undefined{
    return this.items.find(item => item.codigo.toLowerCase() == this.selected.value?.toLowerCase());
  }
}
