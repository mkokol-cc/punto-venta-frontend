import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { authAdminGuard, authUserGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: '', component: DashboardComponent, children:[
        {path: 'venta', canActivate: [authUserGuard], loadComponent: () => import('./pages/venta/venta.component').then(m => m.VentaComponent), pathMatch: 'full'},
        {path: 'mis-ventas', canActivate: [authUserGuard], loadComponent: () => import('./components/lista-ventas/lista-ventas.component').then(m => m.ListaVentasComponent), pathMatch: 'full'},
        {path: 'articulo', canActivate: [authAdminGuard], loadComponent: () => import('./pages/articulo/articulo.component').then(m => m.ArticuloComponent), pathMatch: 'full'},
        {path: 'mis-articulos', canActivate: [authUserGuard], loadComponent: () => import('./pages/articulos/articulos.component').then(m => m.ArticulosComponent), pathMatch: 'full'},
        {path: 'tipo-pago', canActivate: [authAdminGuard], loadComponent: () => import('./pages/tipo-pago/tipo-pago.component').then(m => m.TipoPagoComponent), pathMatch: 'full'},
        /*{path: '', canActivate: [],loadComponent: () => import('./components/lista-metodo-pago/lista-metodo-pago.component').then(m => m.ListaMetodoPagoComponent), pathMatch: 'full'},*/
    ]},
    //{path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent}
];
