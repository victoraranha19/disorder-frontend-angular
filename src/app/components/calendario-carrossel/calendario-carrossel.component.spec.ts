import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioCarrosselComponent } from './calendario-carrossel.component';

describe('CalendarioCarrosselComponent', () => {
  let component: CalendarioCarrosselComponent;
  let fixture: ComponentFixture<CalendarioCarrosselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarioCarrosselComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarioCarrosselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
