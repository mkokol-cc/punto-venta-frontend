import { Injectable } from '@angular/core';
import { Cliente } from '../interfaces/cliente';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http:HttpClient) { }
  url:string = environment.apiUrl + '/cliente'

  new(Cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(`${this.url}`,Cliente)
  }
  update(Cliente:Cliente,id:number):Observable<Cliente>{
    return this.http.put<Cliente>(`${this.url}/${id}`,Cliente)
  }
  getByDNI(id:number):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.url}/${id}`)
  }
}
