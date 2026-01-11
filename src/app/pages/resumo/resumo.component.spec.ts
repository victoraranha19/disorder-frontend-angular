import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumoComponent } from './resumo.component';

describe('ResumoComponent', () => {
  let component: ResumoComponent;
  let fixture: ComponentFixture<ResumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
