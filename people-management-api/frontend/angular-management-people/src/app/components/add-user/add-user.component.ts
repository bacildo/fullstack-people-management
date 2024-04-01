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
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    uf: '',
  };

  constructor(
    private userService: UserService,
    private dataService: DataService,
  ) {}

  searchCep() {
    this.dataService.getAddressByCEP(this.user.cep).subscribe((data) => {
      this.user.address = data.logradouro;
      this.user.cep = data.cep;
      this.user.complement = data.complemento;
      this.user.neighborhood = data.bairro;
      this.user.city = data.localidade;
      this.user.uf = data.uf;
    });
  }

  onSubmit(): void {
    this.dataService.addUser(this.user).subscribe((data) => {
      this.user.name = data.name;
      this.user.gender = data.gender;
      this.user.dateOfBirth = data.dateOfBirth;
      this.user.maritalStatus = data.maritalStatus;
      this.user.cep = data.cep;
      this.user.address = data.endereco;
      this.user.number = data.numero;
      this.user.complement = data.complemento;
      this.user.neighborhood = data.bairro;
      this.user.city = data.cidade;
      this.user.uf = data.uf;
      alert('Usuário adicionado com sucesso!');
    });

    // console.log('user', this.user);
    // this.user = {
    //   name: '',
    //   gender: '',
    //   dateOfBirth: '',
    //   maritalStatus: '',
    //   cep: '',
    //   endereco: '',
    //   numero: '',
    //   complemento: '',
    //   bairro: '',
    //   cidade: '',
    //   uf: '',
  }
}
