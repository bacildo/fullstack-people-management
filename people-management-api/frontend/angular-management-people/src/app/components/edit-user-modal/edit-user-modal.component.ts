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
    this.updateUser(this.user)
    this.dataService.editUser(this.data.userId, this.user).subscribe(() => {
      this.dialogRef.close();
    });
    alert('Usuário atualizado com sucesso!');
  }
}
