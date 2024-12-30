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
  url:string = environment.apiUrl + '/api/venta'

  new(venta:Venta):Observable<Venta>{
    return this.http.post<Venta>(`${this.url}`,venta)
  }
  list(page:number, size:number, fechaDesde:Date|undefined, fechaHasta:Date|undefined, busqueda:string, 
    tipoPagoId:number|undefined, porPrecio:boolean, porFecha:boolean, asc:boolean):Observable<Page>{
    let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString())
    .set('busqueda', busqueda.toString())
    .set('tipoPagoId', tipoPagoId ? tipoPagoId.toString() : '')
    .set('porPrecio', porPrecio.toString())
    .set('porFecha', porFecha.toString())
    .set('asc', asc.toString());
    if(fechaDesde){
      params.set('fechaDesde', this.parseDate(fechaDesde))
    }
    if(fechaHasta){
      params.set('fechaHasta', this.parseDate(fechaHasta))
    }
    return this.http.get<Page>(`${this.url}`, { params })
  }
  getById(id:number):Observable<Venta>{
    return this.http.get<Venta>(`${this.url}/${id}`)
  }

  parseDate(date:Date):string{
    return `${date.getFullYear()}-${(date.getMonth()+1)}-${date.getDay()}`
  }


  delete(id:number):Observable<any>{
    return this.http.delete<any>(`${this.url}/${id}`)
  }

}
