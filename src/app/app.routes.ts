import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { ListComponent } from './movies-list/movies-list';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'list', component: ListComponent },
];
