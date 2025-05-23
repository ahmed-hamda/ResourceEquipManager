import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Employe } from 'src/app/Models/Employe/Employe'; 
import { TokenService } from '../token.service'; 

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  url = environment.baseUrl + "/employes";

  constructor(private httpClient: HttpClient,private token: TokenService){ }

  getEmployes(): Observable<Employe[]> {
    return this.httpClient.get<Employe[]>(this.url);
  }

  getEmployesSansAffectation(){
    return this.httpClient.get(this.url + "/employes-sans-affectation");
  }

  getEmployeById(id: number): Observable<Employe> {
    return this.httpClient.get<Employe>(`${this.url}/${id}`);
  }
  
  addEmploye(employe: any): Observable<any> {
    return this.httpClient.post<any>(this.url + '/add', employe);
  }

  deleteEmploye(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.url}/${id}`);
  }

  updateEmploye(id: number, data: any): Observable<any> {
    return this.httpClient.put<any>(`${this.url}/${id}`, data);
  }

  login(data: any) {
    return this.httpClient.post(this.url + '/login', data);
  }

  storeToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  sendPasswordResetLink(data:any) {
    return this.httpClient.post(`${this.url}/sendPasswordResetLink`, data)
  }
  changePassword(data:any) {
    return this.httpClient.post(`${this.url}/resetPassword`, data)
  }
}
