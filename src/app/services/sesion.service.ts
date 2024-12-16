import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  response(text:string,error:boolean){
    if(error){
      this._snackBar.open(text, 'Okay', {
        panelClass: "error-message",
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }else{
      this._snackBar.open(text, 'Okay', {
        panelClass: "success-message",
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

  login(credentials:any){
    const url = 'http://localhost:8080/login'
    let params = new HttpParams()
    .set('noexpiration', credentials.noExpiration);
    this.http.post<any>(`${url}`,credentials, {params}).subscribe(obj=>{
      this.setToken(obj.token)
      this.setUsername(obj.username)
      this.setRole(obj.role)
      this.router.navigateByUrl('/')
    })
  }

  async validateRole(): Promise<string> {
    const url = 'http://localhost:8080/auth'
    return firstValueFrom(this.http.get<string>(url));
  }

  setToken(token:string){
    localStorage.setItem('token',token)
  }
  getToken(){
    return localStorage.getItem('token')
  }
  setUsername(username:string){
    localStorage.setItem('username',username)
  }
  getUser(){
    return localStorage.getItem('token')
  }
  setRole(role:string){
    localStorage.setItem('role',role)
  }
  getRole(){
    return localStorage.getItem('role')
  }
  logout(){
    localStorage.clear()
    this.router.navigateByUrl('/login')
  }

}