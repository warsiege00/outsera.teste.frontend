import { Component, OnInit } from '@angular/core';
import { MovieService, Movie, MovieApiResponse } from '../services/movies.service';
import { CommonModule } from '@angular/common';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-movies-list',
  imports: [CommonModule],
  templateUrl: './movies-list.html',
  styleUrl: './movies-list.css'
})
export class ListComponent implements OnInit {
  movies: Movie[] = [];
  loading = false;
  error: string | null = null;
  page = 0;
  size = 15;
  totalPages = 1;
  totalElements = 0;

  yearFilter: string = '';
  private yearChange$ = new Subject<string>();
  winnerFilter: string = '';

  constructor(private movieService: MovieService) {
    this.yearChange$.pipe(debounceTime(400)).subscribe((yearStr) => {
      this.page = 0;
      const year = yearStr ? parseInt(yearStr, 10) : undefined;
      const winner = this.winnerFilter === '' ? undefined : this.winnerFilter === 'true';
      this.fetchMovies(this.page, this.size, winner, year);
    });
  }

  ngOnInit() {
    const year = this.yearFilter ? parseInt(this.yearFilter, 10) : undefined;
    this.fetchMovies(this.page, this.size, undefined, year);
  }

  fetchMovies(page: number = this.page, size: number = this.size, winner?: boolean, year?: number) {
    this.loading = true;
    this.error = null;
    this.movieService.getMovies({ page, size, winner, year }).subscribe({
      next: (response: MovieApiResponse) => {
        this.movies = response.content;
        this.page = response.number;
        this.size = response.size;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao buscar filmes';
        this.loading = false;
      }
    });
  }

  get visiblePages(): number[] {
    const totalPages = this.totalPages;
    const currentPage = this.page;
    const maxPagesToShow = 5;
    const halfWindow = Math.floor(maxPagesToShow / 2);
    let firstPageInBlock = Math.max(0, currentPage - halfWindow);
    let lastPageInBlock = firstPageInBlock + maxPagesToShow;
    if (lastPageInBlock > totalPages) {
      lastPageInBlock = totalPages;
      firstPageInBlock = Math.max(0, lastPageInBlock - maxPagesToShow);
    }
    const pages: number[] = [];
    for (let pageIndex = firstPageInBlock; pageIndex < lastPageInBlock; pageIndex++) {
      pages.push(pageIndex);
    }
    return pages;
  }

  goToPage(targetPage: number) {
    const isPageValid = targetPage >= 0 && targetPage < this.totalPages;
    const isDifferentFromCurrent = targetPage !== this.page;
    if (isPageValid && isDifferentFromCurrent) {
      const yearAsNumber = this.yearFilter ? parseInt(this.yearFilter, 10) : undefined;
      const winnerAsBoolean = this.winnerFilter === '' ? undefined : this.winnerFilter === 'true';
      this.fetchMovies(targetPage, this.size, winnerAsBoolean, yearAsNumber);
    }
  }

  previousPage() {
    const previousPage = this.page - 1;
    this.goToPage(previousPage);
  }

  nextPage() {
    const nextPage = this.page + 1;
    this.goToPage(nextPage);
  }

  goToPrevPageBlock() {
    const previousPage = this.page - 1;
    const isFirstPage = this.page === 0;
    if (!isFirstPage) {
      this.goToPage(previousPage);
    }
  }

  goToNextPageBlock() {
    const nextPage = this.page + 1;
    const isLastPage = this.page === this.totalPages - 1;
    if (!isLastPage) {
      this.goToPage(nextPage);
    }
  }

  onYearChange(value: string) {
    this.yearFilter = value;
    this.yearChange$.next(value);
  }

  onWinnerChange(value: string) {
    this.winnerFilter = value;
    const winner = value === '' ? undefined : value === 'true';
    const year = this.yearFilter ? parseInt(this.yearFilter, 10) : undefined;
    this.page = 0;
    this.fetchMovies(this.page, this.size, winner, year);
  }
} 