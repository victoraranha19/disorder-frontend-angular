import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteirasComponent } from './carteiras.component';
import { MatDialog } from '@angular/material/dialog';
import { CarteirasService } from '../../services/carteiras.service';
import { of } from 'rxjs';

describe('CarteirasComponent', () => {
  let component: CarteirasComponent;
  let fixture: ComponentFixture<CarteirasComponent>;

  let matDialogSpy: jasmine.SpyObj<MatDialog>;
  let carteirasSSpy: jasmine.SpyObj<CarteirasService>;

  beforeEach(async () => {
    matDialogSpy = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);
    carteirasSSpy = jasmine.createSpyObj<CarteirasService>('CarteirasService', ['criar$', 'listar$']);
    carteirasSSpy.listar$.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [CarteirasComponent],
      providers: [
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: CarteirasService, useValue: carteirasSSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CarteirasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
