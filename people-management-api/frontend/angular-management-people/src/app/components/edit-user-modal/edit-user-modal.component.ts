import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
})
export class EditUserModalComponent implements OnInit {
  user: any;

  constructor(
    public dialogRef: MatDialogRef<EditUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Recebe os dados do modal
    private dataService: DataService,
  ) {
    this.user = data.user; // Define o usuário recebido
  }

  ngOnInit(): void {
    // Verifica se o objeto `user` está definido, se não, inicializa com um objeto vazio
    this.user = this.user || {};
  }

  updateUser(userData: any): void {
    this.user = { ...userData }; // Copia os dados do usuário para o objeto `user`
  }

  saveChanges(): void {
    // Use o ID do usuário recebido para enviar a solicitação de edição
    this.updateUser(this.user);
    this.dataService.editUser(this.data.userId, this.user).subscribe(() => {
      this.dialogRef.close();
    });
    const birth = new Date(this.user.dateOfBirth);
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

    alert('Usuário editado com sucesso!');
    alert(`Idade: ${age}`);
    alert(`Dias até o próximo aniversário: ${daysToBirthday}`);
    alert('Usuário atualizado com sucesso!');
  }
}
