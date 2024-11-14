import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    {path: '', component: DashboardComponent, children:[
        {path: 'venta', loadComponent: () => import('./pages/venta/venta.component').then(m => m.VentaComponent), pathMatch: 'full'},
        {path: 'lista', loadComponent: () => import('./components/lista-articulos/lista-articulos.component').then(m => m.ListaArticulosComponent), pathMatch: 'full'},
        {path: 'combo', loadComponent: () => import('./components/form-combo/form-combo.component').then(m => m.FormComboComponent), pathMatch: 'full'},
    ]},
];
