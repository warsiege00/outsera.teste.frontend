import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DashboardComponent } from './dashboard';
import { MovieService } from '../services/movies.service';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { DashboardTable } from './dashboard-table/dashboard-table';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('MovieService', [
      'getYearsWithMultipleWinners',
      'getTopStudiosWithWinCount',
      'getProducersMaxMinWinInterval',
      'getWinnerMoviesByYear'
    ]);

    await TestBed.configureTestingModule({
      imports: [CommonModule, DashboardComponent, DashboardTable],
      providers: [
        { provide: MovieService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    movieServiceSpy = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve buscar dados ao inicializar', () => {
    movieServiceSpy.getYearsWithMultipleWinners.and.returnValue(of({ years: [] }));
    movieServiceSpy.getTopStudiosWithWinCount.and.returnValue(of({ studios: [] }));
    movieServiceSpy.getProducersMaxMinWinInterval.and.returnValue(of({ min: [], max: [] }));
    fixture.detectChanges();
    expect(movieServiceSpy.getYearsWithMultipleWinners).toHaveBeenCalled();
    expect(movieServiceSpy.getTopStudiosWithWinCount).toHaveBeenCalled();
    expect(movieServiceSpy.getProducersMaxMinWinInterval).toHaveBeenCalled();
  });

  it('deve buscar filmes vencedores ao mudar o ano', fakeAsync(() => {
    movieServiceSpy.getYearsWithMultipleWinners.and.returnValue(of({ years: [] }));
    movieServiceSpy.getTopStudiosWithWinCount.and.returnValue(of({ studios: [] }));
    movieServiceSpy.getProducersMaxMinWinInterval.and.returnValue(of({ min: [], max: [] }));
    movieServiceSpy.getWinnerMoviesByYear.and.returnValue(of([]));
    fixture.detectChanges();
    component.onYearChange('2000');
    tick(500); // debounce
    expect(movieServiceSpy.getWinnerMoviesByYear).toHaveBeenCalledWith(2000);
  }));

  it('deve lidar com erro ao buscar filmes vencedores', fakeAsync(() => {
    movieServiceSpy.getYearsWithMultipleWinners.and.returnValue(of({ years: [] }));
    movieServiceSpy.getTopStudiosWithWinCount.and.returnValue(of({ studios: [] }));
    movieServiceSpy.getProducersMaxMinWinInterval.and.returnValue(of({ min: [], max: [] }));
    movieServiceSpy.getWinnerMoviesByYear.and.returnValue(throwError(() => new Error('Erro API')));
    fixture.detectChanges();
    component.onYearChange('2001');
    tick(500);
    expect(component.errorWinnerMovies).toBe('Erro ao buscar filmes vencedores do ano');
  }));
}); 