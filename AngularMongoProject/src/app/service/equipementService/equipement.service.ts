import { HttpClient } from '@angular/common/http';
import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Equipement } from '../../Models/Equipement/Equipement';

@Injectable({
  providedIn: 'root'
})
export class EquipementService {

  url = environment.baseUrl + "/equipements";

  constructor(private httpClient: HttpClient) { }

  getEquipements(): Observable<Equipement[]> {
    return this.httpClient.get<Equipement[]>(this.url);
  }
  getEquipementById(id: any) {
    return this.httpClient.get(`${this.url}/${id}`);
  }

  addEquipement(data: any) {
    return this.httpClient.post(this.url+"/add", data);
  }

  updateEquipement(id: any, data: Equipement) {
    return this.httpClient.put(`${this.url}/${id}`, data);
  }

  deleteEquipement(id: any) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}


