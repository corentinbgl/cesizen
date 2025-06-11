import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['login']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('ne doit pas soumettre un formulaire invalide', () => {
    component.form.setValue({ email: '', password: '' });
    component.onSubmit();
    expect(mockAuthService.login).not.toHaveBeenCalled();
  });

  it('devrait appeler login et naviguer vers "/" en cas de succès', () => {
    component.form.setValue({ email: 'test@mail.com', password: 'pass123' });
    mockAuthService.login.and.returnValue(of({}));

    component.onSubmit();

    expect(mockAuthService.login).toHaveBeenCalledWith({ email: 'test@mail.com', password: 'pass123' });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('devrait afficher une erreur en cas d\'échec de connexion', () => {
    component.form.setValue({ email: 'fail@mail.com', password: 'wrong' });
    mockAuthService.login.and.returnValue(throwError(() => ({})));

    component.onSubmit();

    expect(component.error).toBe('Identifiants invalides');
  });
});
