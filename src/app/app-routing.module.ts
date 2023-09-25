import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateUserComponent } from './create-user/create-user.component';

import { UsersComponent } from './users/users.component';
import { GroupsComponent } from './groups/groups.component';
import { ChannelsComponent } from './channels/channels.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'account', component: AccountComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'create-user', component: CreateUserComponent },
  { path: 'users', component: UsersComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'channels', component: ChannelsComponent },
  { path: 'chat', component: ChatComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }