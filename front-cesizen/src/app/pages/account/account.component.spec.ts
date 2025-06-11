import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountComponent } from './account.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['updatePassword', 'deleteAccount', 'logout']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AccountComponent],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not submit if form is invalid', () => {
    component.form.setValue({ newPassword: '' });
    component.onUpdatePassword();
    expect(authServiceSpy.updatePassword).not.toHaveBeenCalled();
  });

  it('should call updatePassword and set success message', () => {
    authServiceSpy.updatePassword.and.returnValue(of({}));
    component.form.setValue({ newPassword: '123456' });

    component.onUpdatePassword();

    expect(authServiceSpy.updatePassword).toHaveBeenCalledWith('123456');
    expect(component.message).toBe('Mot de passe mis à jour');
  });

  it('should set error message if updatePassword fails', () => {
    authServiceSpy.updatePassword.and.returnValue(throwError(() => ({ error: { message: 'Erreur serveur' } })));
    component.form.setValue({ newPassword: '123456' });

    component.onUpdatePassword();

    expect(component.error).toBe('Erreur serveur');
  });

  it('should call deleteAccount and logout and navigate on confirm', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    authServiceSpy.deleteAccount.and.returnValue(of({}));

    component.onDeleteAccount();

    expect(authServiceSpy.deleteAccount).toHaveBeenCalled();
    expect(authServiceSpy.logout).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should not call deleteAccount if confirm is cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false);

    component.onDeleteAccount();

    expect(authServiceSpy.deleteAccount).not.toHaveBeenCalled();
  });
});
