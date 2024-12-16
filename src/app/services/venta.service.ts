import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Venta } from '../interfaces/venta';
import { Page } from '../interfaces/page';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(private http:HttpClient) { }
  url:string = environment.apiUrl + '/venta'

  new(venta:Venta):Observable<Venta>{
    return this.http.post<Venta>(`${this.url}`,venta)
  }
  list(page:number, size:number, fechaDesde:Date|undefined, fechaHasta:Date|undefined, busqueda:string, 
    tipoPagoId:number|undefined, porPrecio:boolean, porFecha:boolean, asc:boolean):Observable<Page>{
    let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString())
    .set('fechaDesde', fechaDesde ? fechaDesde.toString() : '')
    .set('fechaHasta', fechaHasta ? fechaHasta.toString() : '')
    .set('busqueda', busqueda.toString())
    .set('tipoPagoId', tipoPagoId ? tipoPagoId.toString() : '')
    .set('porPrecio', porPrecio.toString())
    .set('porFecha', porFecha.toString())
    .set('asc', asc.toString());
    return this.http.get<Page>(`${this.url}`, { params })
  }
  getById(id:number):Observable<Venta>{
    return this.http.get<Venta>(`${this.url}/${id}`)
  }

}
