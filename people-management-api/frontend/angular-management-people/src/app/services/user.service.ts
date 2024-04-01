import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: any[] = [];

  constructor() {}

  getUsers(): Observable<any[]> {
    return of(this.users);
  }

  addUser(user: any): void {
    console.log('useruseruser',user)
    this.users.push(user);
  }

  // Implemente métodos para atualizar e excluir usuários conforme necessário
}
