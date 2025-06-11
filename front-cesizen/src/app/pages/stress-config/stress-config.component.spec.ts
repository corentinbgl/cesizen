import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { StressConfigComponent } from './stress-config.component';
import { AuthService } from '../../services/auth.service';
import { StressService } from '../../services/stress.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('StressConfigComponent', () => {
  let component: StressConfigComponent;
  let fixture: ComponentFixture<StressConfigComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockStressService: jasmine.SpyObj<StressService>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['createStressEvent', 'deleteStressEvent']);
    mockStressService = jasmine.createSpyObj('StressService', ['getEvents']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, StressConfigComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: StressService, useValue: mockStressService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    // Setup default mock behavior BEFORE creating the component
    mockStressService.getEvents.and.returnValue(of([]));

    fixture = TestBed.createComponent(StressConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait charger les événements au démarrage', () => {
    const mockEvents = [{ id: 1, label: 'Test', points: 50 }];
    mockStressService.getEvents.and.returnValue(of(mockEvents));

    component.loadEvents();

    expect(mockStressService.getEvents).toHaveBeenCalled();
    expect(component.events).toEqual(mockEvents);
  });

  it('devrait soumettre un événement et réinitialiser le formulaire', fakeAsync(() => {
    component.form.setValue({ label: 'Test event', points: 20 });
    mockAuthService.createStressEvent.and.returnValue(of({}));
    mockStressService.getEvents.and.returnValue(of([]));

    component.submit();
    tick();

    expect(mockAuthService.createStressEvent).toHaveBeenCalledWith({ label: 'Test event', points: 20 });
    expect(component.message).toBe('Événement ajouté');
    expect(component.form.value).toEqual({ label: '', points: 0 });
  }));

  it('devrait gérer les erreurs lors de la soumission', fakeAsync(() => {
    component.form.setValue({ label: 'Failing event', points: 30 });
    mockAuthService.createStressEvent.and.returnValue(throwError(() => ({ error: { message: 'Erreur API' } })));

    component.submit();
    tick();

    expect(component.error).toBe('Erreur API');
  }));

  it('devrait patcher le formulaire avec l\'événement sélectionné pour édition', () => {
    const event = { label: 'Editer', points: 15 };
    component.edit(event);

    expect(component.editingEvent).toEqual(event);
    expect(component.form.value).toEqual(event);
  });

  it('devrait appeler deleteStressEvent si l\'utilisateur confirme', () => {
    mockAuthService.deleteStressEvent.and.returnValue(of({}));
    spyOn(window, 'confirm').and.returnValue(true);

    component.delete(1);

    expect(mockAuthService.deleteStressEvent).toHaveBeenCalledWith(1);
    expect(mockStressService.getEvents).toHaveBeenCalled();
  });

  it('ne devrait pas supprimer si l\'utilisateur annule', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    component.delete(1);
    expect(mockAuthService.deleteStressEvent).not.toHaveBeenCalled();
  });

  it('devrait réinitialiser le formulaire et retirer l\'événement en édition', () => {
    component.editingEvent = { label: 'ancien', points: 10 };
    component.form.setValue({ label: 'test', points: 5 });

    component.resetForm();

    expect(component.editingEvent).toBeUndefined();
    expect(component.form.value).toEqual({ label: '', points: 0 });
  });
});
