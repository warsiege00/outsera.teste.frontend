import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService, YearsWithMultipleWinnersResponse } from '../services/movies.service';
import { DashboardTable } from './dashboard-table/dashboard-table';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, DashboardTable],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  years: { year: number; winnerCount: number }[] = [];
  loading = false;
  error: string | null = null;

  listYersColumns = [
    { key: 'year', label: 'Year' },
    { key: 'winnerCount', label: 'Win Count' }
  ];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.fetchYearsWithMultipleWinners();
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
} 