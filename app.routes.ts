import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { PartyComponent } from './party/party.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'user', component: UserComponent },
      { path: 'party', component: PartyComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
