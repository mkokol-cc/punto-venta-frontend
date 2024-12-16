import { Component } from '@angular/core';
import { UploadArticuloComponent } from '../../components/upload-articulo/upload-articulo.component';
import { FormComboComponent } from '../../components/form-combo/form-combo.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-articulo',
  standalone: true,
  imports: [UploadArticuloComponent,FormComboComponent,MatButtonModule,RouterModule],
  templateUrl: './articulo.component.html',
  styleUrl: './articulo.component.scss'
})
export class ArticuloComponent {

}
