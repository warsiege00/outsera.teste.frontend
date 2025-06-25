import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sidebar } from './sidebar';
import { RouterTestingModule } from '@angular/router/testing';

describe('Sidebar', () => {
  let component: Sidebar;
  let fixture: ComponentFixture<Sidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sidebar, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });
});
