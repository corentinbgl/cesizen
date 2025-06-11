import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminCreateUserComponent } from './admin-create-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';

describe('AdminCreateUserComponent', () => {
  let component: AdminCreateUserComponent;
  let fixture: ComponentFixture<AdminCreateUserComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['createUserByAdmin']);

    await TestBed.configureTestingModule({
      imports: [AdminCreateUserComponent, ReactiveFormsModule],
      providers: [{ provide: AuthService, useValue: mockAuthService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('ne doit pas soumettre un formulaire invalide', () => {
    component.form.setValue({ email: '', password: '', role: '' });
    component.onSubmit();
    expect(mockAuthService.createUserByAdmin).not.toHaveBeenCalled();
  });

  it('devrait appeler createUserByAdmin et afficher un message en cas de succès', () => {
    const formData = { email: 'admin@mail.com', password: 'admin123', role: 'admin' };
    component.form.setValue(formData);
    mockAuthService.createUserByAdmin.and.returnValue(of({}));

    component.onSubmit();

    expect(mockAuthService.createUserByAdmin).toHaveBeenCalledWith(formData);
    expect(component.message).toBe('Utilisateur créé !');
  });

  it('devrait afficher une erreur personnalisée si le backend retourne une erreur', () => {
    const formData = { email: 'admin@mail.com', password: 'admin123', role: 'admin' };
    component.form.setValue(formData);
    mockAuthService.createUserByAdmin.and.returnValue(throwError(() => ({ error: { message: 'Erreur API' } })));

    component.onSubmit();

    expect(component.error).toBe('Erreur API');
  });

  it('devrait afficher une erreur générique si aucune erreur précise n\'est retournée', () => {
    const formData = { email: 'admin@mail.com', password: 'admin123', role: 'admin' };
    component.form.setValue(formData);
    mockAuthService.createUserByAdmin.and.returnValue(throwError(() => ({})));

    component.onSubmit();

    expect(component.error).toBe('Erreur inconnue');
  });
});
