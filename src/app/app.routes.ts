import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    {path: '', component: DashboardComponent, children:[
        {path: 'venta', loadComponent: () => import('./pages/venta/venta.component').then(m => m.VentaComponent), pathMatch: 'full'},
        {path: 'lista', loadComponent: () => import('./pages/articulos/articulos.component').then(m => m.ArticulosComponent), pathMatch: 'full'},
        {path: '', loadComponent: () => import('./components/lista-metodo-pago/lista-metodo-pago.component').then(m => m.ListaMetodoPagoComponent), pathMatch: 'full'},
    ]},
];
