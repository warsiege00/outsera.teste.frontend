import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MovieService, 
  YearsWithMultipleWinnersResponse,
  StudiosWithWinCountResponse, 
  MaxMinWinIntervalResponse, 
  ProducerWinInterval } from '../services/movies.service';
import { DashboardTable } from './dashboard-table/dashboard-table';
import { Movie } from '../services/movies.service';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, DashboardTable],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  years: { year: number; winnerCount: number }[] = [];
  studios: { name: string; winCount: number }[] = [];
  minIntervals: ProducerWinInterval[] = [];
  maxIntervals: ProducerWinInterval[] = [];
  winnerMovies: Movie[] = [];
  loadingWinnerMovies = false;
  errorWinnerMovies: string | null = null;
  winnerMoviesColumns = [
    { key: 'id', label: 'ID' },
    { key: 'year', label: 'Year' },
    { key: 'title', label: 'Title' },
    { key: 'studios', label: 'Studios' },
    { key: 'producers', label: 'Producers' },
    { key: 'winner', label: 'Winner' }
  ];
  selectedYear: number | null = null;

  loadingYears = false;
  errorYears: string | null = null;
  loadingStudios = false;
  errorStudios: string | null = null;
  loadingIntervals = false;
  errorIntervals: string | null = null;

  listYersColumns = [
    { key: 'year', label: 'Year' },
    { key: 'winnerCount', label: 'Win Count' }
  ];

  studiosColumns = [
    { key: 'name', label: 'Studio' },
    { key: 'winCount', label: 'Win Count' }
  ];

  producerIntervalColumns = [
    { key: 'producer', label: 'Producer' },
    { key: 'interval', label: 'Interval' },
    { key: 'previousWin', label: 'Previous Year' },
    { key: 'followingWin', label: 'Following Win' }
  ];

  private yearInput$ = new Subject<number>();

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.fetchYearsWithMultipleWinners();
    this.fetchTopStudiosWithWinCount();
    this.fetchProducersMaxMinWinInterval();
    this.yearInput$.pipe(debounceTime(500)).subscribe((year) => {
      this.fetchWinnerMoviesByYear(year);
    });
    this.selectedYear = null;
  }

  fetchYearsWithMultipleWinners() {
    this.loadingYears = true;
    this.errorYears = null;
    this.movieService.getYearsWithMultipleWinners().subscribe({
      next: (response: YearsWithMultipleWinnersResponse) => {
        this.years = response.years;
        this.loadingYears = false;
      },
      error: (err) => {
        this.errorYears = 'Erro ao buscar anos com múltiplos vencedores';
        this.loadingYears = false;
      }
    });
  }

  fetchTopStudiosWithWinCount() {
    this.loadingStudios = true;
    this.errorStudios = null;
    this.movieService.getTopStudiosWithWinCount().subscribe({
      next: (response: StudiosWithWinCountResponse) => {
        this.studios = response.studios.slice(0, 3);
        this.loadingStudios = false;
      },
      error: (err) => {
        this.errorStudios = 'Erro ao buscar estúdios com mais vitórias';
        this.loadingStudios = false;
      }
    });
  }

  fetchProducersMaxMinWinInterval() {
    this.loadingIntervals = true;
    this.errorIntervals = null;
    this.movieService.getProducersMaxMinWinInterval().subscribe({
      next: (response: MaxMinWinIntervalResponse) => {
        this.minIntervals = response.min;
        this.maxIntervals = response.max;
        this.loadingIntervals = false;
      },
      error: (err) => {
        this.errorIntervals = 'Erro ao buscar intervalo de vitórias dos produtores';
        this.loadingIntervals = false;
      }
    });
  }

  fetchWinnerMoviesByYear(year: number) {
    this.loadingWinnerMovies = true;
    this.errorWinnerMovies = null;
    this.movieService.getWinnerMoviesByYear(year).subscribe({
      next: (movies) => {
        this.winnerMovies = movies;
        this.loadingWinnerMovies = false;
      },
      error: (err) => {
        this.errorWinnerMovies = 'Erro ao buscar filmes vencedores do ano';
        this.loadingWinnerMovies = false;
      }
    });
  }

  onYearChange(year: string) {
    const parsed = parseInt(year, 10);
    if (!isNaN(parsed)) {
      this.selectedYear = parsed;
      this.yearInput$.next(parsed);
    }
  }
} 