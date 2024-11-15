import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'; // Si usas Reactive Forms
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-buscador-articulos',
  standalone: true,
  imports: [
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule
  ],
  templateUrl: './buscador-articulos.component.html',
  styleUrl: './buscador-articulos.component.scss'
})
export class BuscadorArticulosComponent {
  items: string[] = ['Manzana', 'Banana', 'Cereza', 'Durazno', 'Uva'];
  filteredItems: string[] = [];

  constructor() {
    this.filteredItems = this.items; // Inicializa con todos los elementos
  }

  onInputChange(event: any): void {
    const query = event.target.value.toLowerCase();
    this.filteredItems = this.items.filter(item => item.toLowerCase().includes(query));
  }

  onEnter(): void {
    console.log('Enter presionado, se puede realizar acción adicional');
  }
}
