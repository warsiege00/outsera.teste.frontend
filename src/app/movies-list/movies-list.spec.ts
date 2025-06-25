import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ListComponent } from './movies-list';
import { MovieService } from '../services/movies.service';
import { CommonModule } from '@angular/common';
import { mockMoviesResponse, MovieServiceMock } from '../services/movies.service.mock';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let movieService: MovieServiceMock;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ListComponent, HttpClientTestingModule],
      declarations: [],
      providers: [
        { provide: MovieService, useClass: MovieServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService) as any;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve buscar filmes ao inicializar', () => {
    expect(component.movies.length).toBe(1);
    expect(component.movies[0].title).toBe('Filme 1');
  });

  it('deve atualizar os filmes e paginação ao buscar', () => {
    const mockResponse = {
      ...mockMoviesResponse,
      content: [
        { id: 2, year: 2021, title: 'Filme 2', studios: ['Studio 2'], producers: ['Produtor 2'], winner: false }
      ],
      number: 2,
      size: 15,
      totalPages: 3,
      totalElements: 45
    };

    spyOn(movieService, 'getMovies').and.returnValue(of(mockResponse));

    component.fetchMovies(2, 15);

    expect(component.movies.length).toBe(1);
    expect(component.movies[0].title).toBe('Filme 2');
    expect(component.page).toBe(2);
    expect(component.size).toBe(15);
    expect(component.totalPages).toBe(3);
    expect(component.totalElements).toBe(45);
  });

  it('deve mostrar erro ao falhar a busca', () => {
    spyOn(movieService, 'getMovies').and.returnValue(throwError(() => new Error('Erro de API')));
  
    component.fetchMovies();
  
    expect(component.error).toBe('Erro ao buscar filmes');
    expect(component.loading).toBeFalse();
  });


  it('deve navegar para próxima página', () => {
    spyOn(component, 'fetchMovies');
    component.page = 1;
    component.totalPages = 3;
  
    component.nextPage();
  
    expect(component.fetchMovies).toHaveBeenCalledWith(2, component.size, undefined, undefined);
  });
});