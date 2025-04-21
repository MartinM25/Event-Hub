import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CreateEventComponent } from './pages/create-event/create-event.component';
import { EventDetailsComponent } from './pages/event-details/event-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'event/:id', component: EventDetailsComponent },
  { path: 'create-event', component: CreateEventComponent },
  { path: '**', component: NotFoundComponent }
];
