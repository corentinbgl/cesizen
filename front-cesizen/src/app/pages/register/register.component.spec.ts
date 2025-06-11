import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['registerAndLogin']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [RegisterComponent, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });


  it('devrait appeler le service et rediriger après enregistrement réussi', fakeAsync(() => {
    component.form.setValue({ email: 'test@mail.com', password: '123456' });
    mockAuthService.registerAndLogin.and.returnValue(of({}));

    component.onSubmit();
    tick(1500);

    expect(mockAuthService.registerAndLogin).toHaveBeenCalledWith({ email: 'test@mail.com', password: '123456' });
    expect(component.message).toBe('Compte créé avec succès !');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  }));

  it('devrait afficher un message d\'erreur si l\'API échoue', () => {
    component.form.setValue({ email: 'fail@mail.com', password: '123456' });
    mockAuthService.registerAndLogin.and.returnValue(throwError(() => ({ error: { message: 'Erreur API' } })));

    component.onSubmit();

    expect(component.error).toBe('Erreur API');
  });

  it('devrait afficher "Erreur inconnue" si aucune erreur précise n\'est retournée', () => {
    component.form.setValue({ email: 'fail@mail.com', password: '123456' });
    mockAuthService.registerAndLogin.and.returnValue(throwError(() => ({})));

    component.onSubmit();

    expect(component.error).toBe('Erreur inconnue');
  });
});
