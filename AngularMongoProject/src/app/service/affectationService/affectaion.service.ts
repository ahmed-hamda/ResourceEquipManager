import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Affectation } from '../../Models/Affectation/Affectation';

@Injectable({
  providedIn: 'root'
})
export class AffectationService {

  url = environment.baseUrl + "/affectations"
  constructor(private httpClient: HttpClient) { }

  getAffectations() {
    return this.httpClient.get<Affectation[]>(this.url);
  }


  getAffectationById(id: any) {
    return this.httpClient.get(`${this.url}/${id}`);
  }

  addAffectation(data: Affectation) {
    return this.httpClient.post(this.url + '/add', data);
  }

  updateAffectation(id: any, data: Affectation) {
    return this.httpClient.put(`${this.url}/${id}`, data);
  }

  deleteAffectation(id: any) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getEmployesCompatibles(id:any){
    return this.httpClient.get(`${this.url}/employes-compatibles/${id}`);
  }

  getEquipementsCompatibles(id:any){
    return this.httpClient.get(`${this.url}/equipements-compatibles/${id}`);

  }

  getAffectationByEmployeId(id: any) {
    return this.httpClient.get(`${this.url}/affectationById/${id}`);
  }
}