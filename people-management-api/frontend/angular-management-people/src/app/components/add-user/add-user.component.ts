import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

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
    private dataService: DataService,
    private router: Router,
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

      console.log(data.dateOfBirth);
      const birth = new Date(data.dateOfBirth);
      const now = new Date();
      const nextBirthday = new Date(
        now.getFullYear(),
        birth.getMonth(),
        birth.getDate(),
      );
      const ageMonth = now.getMonth() - birth.getMonth();
      let age = now.getFullYear() - birth.getFullYear();

      if (ageMonth < 0 || (ageMonth === 0 && now.getDate() < birth.getDate())) {
        age--;
      }

      if (nextBirthday.getTime() < now.getTime()) {
        nextBirthday.setFullYear(now.getFullYear() + 1);
      }

      const daysToBirthday =
        Math.ceil(
          (nextBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
        ) + 1;

      console.log('Idade:', age);
      console.log('Dias até o próximo aniversário:', daysToBirthday);

      if (daysToBirthday === 365) {
        alert('Parabéns pelo seu aniversário!');
      }

      alert('Usuário adicionado com sucesso!');
      alert(`idade: ${age}`);
      alert(`Dias até o próximo aniversário:${daysToBirthday}`);

      this.router.navigate(['/list-users']);
    });
  }
}
