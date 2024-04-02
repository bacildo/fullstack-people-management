import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private baseUrl = 'http://localhost:3000'
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/people`);
  }

  getAddressByCEP(cep: string): Observable<any> {
    return this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`);
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/people`, user);
  }

  editUser(userId: string, userData: any): Observable<any>  {
    console.log('dataservice', userData)
    return this.http.put<any>(`${this.baseUrl}/people/${userId}`, userData);
  }
}
