import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  user = {
    name: '',
    gender: '',
    dateOfBirth: '',
    maritalStatus: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
  };

  constructor(
    private userService: UserService,
    private dataService: DataService,
  ) {}

  searchCep() {
    this.dataService.getAddressByCEP(this.user.cep).subscribe(data=>{
      this.user.endereco = data.logradouro;
      this.user.cep = data.cep;
      this.user.complemento = data.complemento;
      this.user.bairro = data.bairro;
      this.user.cidade = data.localidade;
      this.user.uf = data.uf;
    });
  }

  onSubmit(): void {
    this.userService.addUser(this.user);
    this.user = {
      name: '',
      gender: '',
      dateOfBirth: '',
      maritalStatus: '',
      cep: '',
      endereco: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      uf: '',
    };
  }
}
