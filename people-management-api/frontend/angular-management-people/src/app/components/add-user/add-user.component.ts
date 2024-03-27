import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  user = {
    name: '',
    gender: ''
    // Adicione os outros campos do usuário aqui
  };

  constructor(private userService: UserService) {}

  onSubmit(): void {
    this.userService.addUser(this.user);
    this.user = {
      name: '',
      gender: ''
      // Reinicialize os outros campos do usuário aqui
    };
  }
}
