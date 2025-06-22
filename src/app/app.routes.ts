import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard';
import { ListComponent } from './movies-list/movies-list';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'list', component: ListComponent },
];
