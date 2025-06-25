import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService, YearsWithMultipleWinnersResponse, StudiosWithWinCountResponse } from '../services/movies.service';
import { DashboardTable } from './dashboard-table/dashboard-table';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, DashboardTable],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  years: { year: number; winnerCount: number }[] = [];
  studios: { name: string; winCount: number }[] = [];
  loading = false;
  error: string | null = null;

  listYersColumns = [
    { key: 'year', label: 'Year' },
    { key: 'winnerCount', label: 'Win Count' }
  ];

  studiosColumns = [
    { key: 'name', label: 'Studio' },
    { key: 'winCount', label: 'Win Count' }
  ];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.fetchYearsWithMultipleWinners();
    this.fetchTopStudiosWithWinCount();
  }

  fetchYearsWithMultipleWinners() {
    this.loading = true;
    this.error = null;
    this.movieService.getYearsWithMultipleWinners().subscribe({
      next: (response: YearsWithMultipleWinnersResponse) => {
        this.years = response.years;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao buscar anos com múltiplos vencedores';
        this.loading = false;
      }
    });
  }

  fetchTopStudiosWithWinCount() {
    this.loading = true;
    this.error = null;
    this.movieService.getTopStudiosWithWinCount().subscribe({
      next: (response: StudiosWithWinCountResponse) => {
        this.studios = response.studios.slice(0, 3);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao buscar estúdios com mais vitórias';
        this.loading = false;
      }
    });
  }
} 