import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Certification } from 'src/app/Models/Certification/Certification';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CertificationService {

  url = environment.baseUrl + "/certifications"
  constructor(private httpClient: HttpClient) { }

  getCertifications() {
    return this.httpClient.get(this.url);
  }

  getCertificationById(id: any) {
    return this.httpClient.get(`${this.url}/${id}`);
  }

  addCertification(data: Certification) {
    return this.httpClient.post(this.url + '/add', data);
  }

  updateCertification(id: any, data: Certification) {
    return this.httpClient.put(`${this.url}/${id}`, data);
  }

  deleteCertification(id: any) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

}
