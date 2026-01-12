import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessoriaComponent } from './assessoria.component';

describe('AssessoriaComponent', () => {
  let component: AssessoriaComponent;
  let fixture: ComponentFixture<AssessoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
