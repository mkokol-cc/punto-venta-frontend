import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ArticuloService } from '../../services/articulo.service';
import { Articulo } from '../../interfaces/articulo';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TipoPago } from '../../interfaces/tipo-pago';
import { TipoPagoService } from '../../services/tipo-pago.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { BarcodePrintComponent } from '../barcode-print/barcode-print.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista-articulos',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule, 
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    BarcodePrintComponent
  ],
  templateUrl: './lista-articulos.component.html',
  styleUrl: './lista-articulos.component.scss'
})
export class ListaArticulosComponent {
  articulos: Articulo[] = []
  displayedColumns: string[] = ['codigo', 'nombre', 'descripcion', 'precio', 'buttons'];
  tiposPago:TipoPago[] = []
  selectedTipoPago?:TipoPago
  @Output() selectedItem = new EventEmitter<Articulo>();
  
  constructor(
    private service:ArticuloService, 
    private serviceTipoPago:TipoPagoService, 
    public dialog: MatDialog,
    private router: Router){
    this.getItems()
    this.serviceTipoPago.list().subscribe(obj=>{
      this.tiposPago = obj
    })
  }

  getItems(){
    this.removeableFilter = (this.filter!='')
    this.service.list(this.page,this.size,this.orderAsc,this.combos,this.productos,this.orderByNombre,
      this.orderByCosto, this.orderByCodigo, this.filter).subscribe(obj=>{
      this.articulos = <Articulo[]>obj.data
      this.count = obj.count
    })
  }

  send(a:Articulo){
    this.router.navigate(['/articulo'], { queryParams: { codigo: a.codigo } });
  }

  openDialog(codigo:string): void {
    const dialogRef = this.dialog.open(BarcodePrintComponent, {
      data: codigo,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('selecciono veces: '+result)
    });
  }

  precio(costo:number, recargo:number){
    return (costo * (1 + (recargo/100))).toFixed(2)
  }

  //PAGINACION Y FILTRO
  filter:string = ''
  combos:boolean = true
  productos:boolean = true
  orderByNombre:boolean = false
  orderByCosto:boolean = false
  orderByCodigo:boolean = false
  orderAsc:boolean = false
  page:number = 0
  size:number = 5

  count:number = 0

  onPageChange(event: PageEvent){
    this.page = event.pageIndex
    this.getItems()
  }

  removeableFilter:boolean = false

  removeFilter(){
    this.filter = ''
    this.removeableFilter = false
    this.getItems()
  }

}
