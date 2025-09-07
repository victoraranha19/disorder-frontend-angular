import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { ThemeService } from '../../services/theme.service';
import { ActivatedRoute } from '@angular/router';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  let themeSSpy: jasmine.SpyObj<ThemeService>;
  let activatedRoute: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    themeSSpy = jasmine.createSpyObj('ThemeService', ['toggleTheme']);
    activatedRoute = jasmine.createSpyObj('ActivatedRoute', ['snapshot']);

    await TestBed.configureTestingModule({
      imports: [MenuComponent],
      providers: [
        { provide: ThemeService, useValue: themeSSpy },
        { provide: ActivatedRoute, useValue: activatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
