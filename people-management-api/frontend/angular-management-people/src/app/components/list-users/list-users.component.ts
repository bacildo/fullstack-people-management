import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {
  users: any[] = [];

  constructor(
    private dataService: DataService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.dataService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  openEditUserModal(user: any): void {
    const dialogRef = this.dialog.open(EditUserModalComponent, {
      width: '250px',
      data: { userId: user.id, user },
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The edit user dialog was closed');
    });
  }

  deleteUser(userId: number): void {
    this.dataService.deleteUser(userId).subscribe((data) => {
      this.users = this.users.filter((user) => user.id !== userId);
      this.loadUsers();
      alert('Usuário excluído com sucesso!');
    });
  }
}
