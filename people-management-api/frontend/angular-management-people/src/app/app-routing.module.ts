import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ListUsersComponent } from './components/list-users/list-users.component';

const routes: Routes = [
  { path: 'add-user', component: AddUserComponent },
  { path: 'list-users', component: ListUsersComponent },
  { path: '', redirectTo: '/list-users', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
