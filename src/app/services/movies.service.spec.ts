import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieService } from './movies.service';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService]
    });
    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve buscar anos com múltiplos vencedores', () => {
    const mockResponse = { years: [{ year: 2000, winnerCount: 2 }] };
    service.getYearsWithMultipleWinners().subscribe(res => {
      expect(res).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(r => r.url.includes('projection=years-with-multiple-winners'));
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('deve buscar top 3 estúdios com win count', () => {
    const mockResponse = { studios: [{ name: 'Studio', winCount: 5 }] };
    service.getTopStudiosWithWinCount().subscribe(res => {
      expect(res).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(r => r.url.includes('projection=studios-with-win-count'));
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('deve buscar intervalo max/min de produtores', () => {
    const mockResponse = { min: [], max: [] };
    service.getProducersMaxMinWinInterval().subscribe(res => {
      expect(res).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(r => r.url.includes('projection=max-min-win-interval-for-producer'));
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('deve buscar filmes vencedores por ano', () => {
    const mockMovies = [
        { 
            id: 106, 
            year: 2000, 
            title: 'Battlefield Earth', 
            studios: ["Franchise Pictures", "Warner Bros."],
            producers: ["Elie Samaha", "John Travolta", "Jonathan D. Krane"],
            winner: true 
        }];
    service.getWinnerMoviesByYear(2000).subscribe(res => {
      expect(res).toEqual(mockMovies);
    });
    const req = httpMock.expectOne(r =>
      r.url === 'https://challenge.outsera.tech/api/movies' &&
      r.params.get('winner') === 'true' &&
      r.params.get('year') === '2000'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });
}); 