import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Competence } from '../../Models/Competence/Competence';

@Injectable({
  providedIn: 'root'
})
export class CompetenceService {


  url = environment.baseUrl + "/competences";

  constructor(private httpClient: HttpClient) { }

  getCompetences(): Observable<Competence[]> {
    return this.httpClient.get<Competence[]>(this.url);
  }
  getCompetenceById(id: any) {
    return this.httpClient.get(`${this.url}/${id}`);
  }

  addCompetence(data: Competence) {
    return this.httpClient.post(this.url + '/add', data);
  }

  updateCompetence(id: any, data: Competence) {
    return this.httpClient.put(`${this.url}/${id}`, data);
  }

  deleteCompetence(id: any) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
