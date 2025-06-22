import { of } from 'rxjs';
import { MovieApiResponse } from './movies.service';


export const mockMoviesResponse: MovieApiResponse = {
  content: [
    { 
        id: 1, 
        year: 2020, 
        title: 'Filme 1', 
        studios: ['Studio 1'], 
        producers: ['Produtor 1'], 
        winner: true
    }
  ],
  pageable: {},
  totalElements: 1,
  last: true,
  totalPages: 1,
  first: true,
  sort: {},
  number: 0,
  numberOfElements: 1,
  size: 15
};

export class MovieServiceMock {
  getMovies() {
    return of(mockMoviesResponse);
  }
}