import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  private baseUrl = 'http://localhost:3000'
  constructor(private http: HttpClient) {}

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.baseUrl}/people`);
  }

  getAddressByCEP(cep: string): Observable<any> {
    return this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`);
  }

  addUser(user: Users): Observable<Users> {
    return this.http.post<any>(`${this.baseUrl}/people`, user);
  }

  editUser(userId: string, userData: Users): Observable<Users>  {
    return this.http.put<any>(`${this.baseUrl}/people/${userId}`, userData);
  }

  deleteUser(userId: number): Observable<Users> {
    return this.http.delete<any>(`${this.baseUrl}/people/${userId}`);
  }
}
