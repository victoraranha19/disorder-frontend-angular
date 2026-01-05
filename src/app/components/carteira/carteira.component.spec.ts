import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteiraComponent } from './carteira.component';

describe('CarteiraComponent', () => {
  let component: CarteiraComponent;
  let fixture: ComponentFixture<CarteiraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarteiraComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarteiraComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('carteira', {
      titulo: 'Carteira Teste',
      contaCorrente: 1000,
      limiteCreditoTotal: 5000,
      ativo: true,
      contaInvestimento: 2000,
      contaPoupanca: 1500,
      idUsuario: 1,
      id: 1,
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
