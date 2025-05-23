import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Tache } from '../../Models/Tache/Tache';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  url = environment.baseUrl + "/taches";

  constructor(private httpClient: HttpClient) { }

  getTaches(): Observable<Tache[]> {
    return this.httpClient.get<Tache[]>(this.url);
  }
  getTacheById(id: any) {
    return this.httpClient.get(`${this.url}/${id}`);
  }

  addTache(data: Tache) {
    return this.httpClient.post(this.url +"/add", data);
  }

  updateTache(id: any, data: Tache) {
    return this.httpClient.put(`${this.url}/${id}`, data);
  }

  deleteTache(id: any) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
