import { Component } from '@angular/core';
import { ListaVentasComponent } from '../../components/lista-ventas/lista-ventas.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { FormComboComponent } from '../../components/form-combo/form-combo.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [
    MatTabsModule,
    FormComboComponent,
    ListaVentasComponent,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.scss'
})
export class VentasComponent {

}
