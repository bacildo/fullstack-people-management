import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component';
import { DataService } from '../../services/data.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {
  users: any[] = [];
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageSize: number = 5;
  totalItems: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
      this.totalItems = this.users.length;
      this.users.forEach((user) => {
        user.dateOfBirth = this.formatDate(user.dateOfBirth);
      });
    });
  }

  openEditUserModal(user: any): void {
    const dialogRef = this.dialog.open(EditUserModalComponent, {
      width: 'auto',
      data: { userId: user.id, user },
    });

    dialogRef.afterClosed().subscribe((updatedUser) => {
      if (updatedUser) {
        const index = this.users.findIndex((u) => u.id === updatedUser.id);
        this.users[index] = updatedUser;
      }

      this.loadUsers(); // Recarrega a lista de usuários após fechar a modal de edição
    });
  }

  deleteUser(userId: number): void {
    this.dataService.deleteUser(userId).subscribe(() => {
      this.users = this.users.filter((user) => user.id !== userId);
      this.loadUsers();
      alert('Usuário excluído com sucesso!');
    });
  }

  private formatDate(dateString: string): string {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }

  pageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.paginator.pageIndex = event.pageIndex;
    this.loadUsers();
  }

  getCurrentPageUsers(): any[] {
    if (!this.paginator) {
      return [];
    }

    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return this.users.slice(startIndex, startIndex + this.paginator.pageSize);
  }
}
