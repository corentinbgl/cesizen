import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminUserManagementComponent } from './admin-user-management.component';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';

describe('AdminUserManagementComponent', () => {
  let component: AdminUserManagementComponent;
  let fixture: ComponentFixture<AdminUserManagementComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getAllUsers', 'updateUserRole', 'deleteUser']);

    await TestBed.configureTestingModule({
      imports: [AdminUserManagementComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminUserManagementComponent);
    component = fixture.componentInstance;
  });

  it('should load users on init', () => {
    const mockUsers = [{ id: 1, email: 'test@test.com', role: 'user' }];
    authServiceSpy.getAllUsers.and.returnValue(of(mockUsers));

    fixture.detectChanges();

    expect(authServiceSpy.getAllUsers).toHaveBeenCalled();
    expect(component.users).toEqual(mockUsers);
  });

  it('should set error if loading users fails', () => {
    authServiceSpy.getAllUsers.and.returnValue(throwError(() => ({ error: { message: 'Erreur' } })));

    fixture.detectChanges();

    expect(component.error).toBe('Erreur');
  });


  it('should handle error on role change', () => {
    const user = { id: 1, email: 'admin@test.com', role: 'admin' };
    authServiceSpy.updateUserRole.and.returnValue(throwError(() => ({ error: { message: 'Erreur' } })));

    component.onChangeRole(user);

    expect(component.error).toBe('Erreur');
  });

  it('should delete user if confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.users = [
      { id: '1', email: 'u1', role: 'user' },
      { id: '2', email: 'u2', role: 'admin' }
    ];
    authServiceSpy.deleteUser.and.returnValue(of({}));

    component.onDelete('1');

    expect(authServiceSpy.deleteUser).toHaveBeenCalledWith('1');
    expect(component.users.length).toBe(1);
    expect(component.message).toBe('Utilisateur supprimé');
  });

  it('should not delete user if cancelled', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.users = [{ id: '1', email: 'test', role: 'user' }];

    component.onDelete('1');

    expect(authServiceSpy.deleteUser).not.toHaveBeenCalled();
  });

  it('should handle error on delete', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.users = [{ id: '1', email: 'test', role: 'user' }];
    authServiceSpy.deleteUser.and.returnValue(throwError(() => ({ error: { message: 'Erreur' } })));

    component.onDelete('1');

    expect(component.error).toBe('Erreur');
  });
});
