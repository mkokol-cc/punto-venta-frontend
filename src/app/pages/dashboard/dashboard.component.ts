import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { SesionService } from '../../services/sesion.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  isAdmin:boolean = false
  constructor(private sesionService:SesionService){
    let role = sesionService.getRole();
    if(role && role=='ADMINISTRADOR'){
      this.isAdmin=true
    }
  }
  logout(){
    this.sesionService.logout()
  }
}
