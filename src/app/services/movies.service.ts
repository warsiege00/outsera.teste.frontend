import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Movie {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

export interface MovieApiResponse {
  content: Movie[];
  pageable: any;
  totalElements: number;
  last: boolean;
  totalPages: number;
  first: boolean;
  sort: any;
  number: number;
  numberOfElements: number;
  size: number;
}

export interface YearsWithMultipleWinnersResponse {
  years: {
    year: number;
    winnerCount: number;
  }[];
}

export interface StudiosWithWinCountResponse {
  studios: {
    name: string;
    winCount: number;
  }[];
}

export interface ProducerWinInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export interface MaxMinWinIntervalResponse {
  min: ProducerWinInterval[];
  max: ProducerWinInterval[];
}

@Injectable({ providedIn: 'root' })
export class MovieService {
  private readonly apiUrl = 'https://challenge.outsera.tech/api/movies';

  constructor(private http: HttpClient) {}

  getMovies(params: { page?: number; size?: number; winner?: boolean; year?: number }): Observable<MovieApiResponse> {
    let httpParams = new HttpParams();
    if (params.page !== undefined) httpParams = httpParams.set('page', params.page);
    if (params.size !== undefined) httpParams = httpParams.set('size', params.size);
    if (params.winner !== undefined) httpParams = httpParams.set('winner', params.winner);
    if (params.year !== undefined) httpParams = httpParams.set('year', params.year);
    return this.http.get<MovieApiResponse>(this.apiUrl, { params: httpParams });
  }

  getYearsWithMultipleWinners(): Observable<YearsWithMultipleWinnersResponse> {
    const url = `${this.apiUrl}?projection=years-with-multiple-winners`;
    return this.http.get<YearsWithMultipleWinnersResponse>(url);
  }

  getTopStudiosWithWinCount(): Observable<StudiosWithWinCountResponse> {
    const url = `${this.apiUrl}?projection=studios-with-win-count`;
    return this.http.get<StudiosWithWinCountResponse>(url);
  }

  getProducersMaxMinWinInterval(): Observable<MaxMinWinIntervalResponse> {
    const url = `${this.apiUrl}?projection=max-min-win-interval-for-producers`;
    return this.http.get<MaxMinWinIntervalResponse>(url);
  }

  getWinnerMoviesByYear(year: number): Observable<Movie[]> {
    const params = new HttpParams()
      .set('winner', 'true')
      .set('year', year);
    return this.http.get<Movie[]>(this.apiUrl, { params });
  }
} 