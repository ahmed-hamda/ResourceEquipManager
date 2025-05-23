import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  handle(token:any){
    this.set(token);
  }

  set(token:any){
    return localStorage.setItem('token',token);
  }

  get(){
    return localStorage.getItem('token');
  }

  remove(){
    return localStorage.removeItem('token');
  }

  isValid(){
    const token = this.get();
    if(token){
      const payload = this.payload(token);
      if(payload){
        return (payload.iss==="http://127.0.0.1:8000/api/login")?true:false;
      }
    }
    return false;
  }
  getRole() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return payload.admin;
      }
    }
    return null;
  }

  payload(token:any){
    const payload = token.split('.')[1];
    return payload;
  }


  loggedIn(){
    return this.isValid();
  }
}
