import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DiagnosticStressComponent } from './diagnostic-stress.component';
import { StressService, StressEvent } from '../../services/stress.service';
import { of } from 'rxjs';

describe('DiagnosticStressComponent', () => {
  let component: DiagnosticStressComponent;
  let fixture: ComponentFixture<DiagnosticStressComponent>;
  let mockStressService: jasmine.SpyObj<StressService>;

  beforeEach(async () => {
    mockStressService = jasmine.createSpyObj('StressService', ['getEvents', 'calculateScore']);

    await TestBed.configureTestingModule({
      imports: [DiagnosticStressComponent],
      providers: [{ provide: StressService, useValue: mockStressService }]
    }).compileComponents();
  });

  beforeEach(() => {
    mockStressService.getEvents.and.returnValue(of([]));
    fixture = TestBed.createComponent(DiagnosticStressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('devrait charger les événements au démarrage', () => {
    const mockEvents: StressEvent[] = [
      { id: 1, label: 'Event 1', points: 10 },
      { id: 2, label: 'Event 2', points: 20 }
    ];
    mockStressService.getEvents.and.returnValue(of(mockEvents));

    component.ngOnInit();

    expect(mockStressService.getEvents).toHaveBeenCalled();
    expect(component.events).toEqual(mockEvents);
  });

  it('devrait ajouter un id sélectionné avec toggle()', () => {
    component.selectedIds = [];
    component.toggle(1);
    expect(component.selectedIds).toContain(1);
  });

  it('devrait retirer un id déjà sélectionné avec toggle()', () => {
    component.selectedIds = [1];
    component.toggle(1);
    expect(component.selectedIds).not.toContain(1);
  });

  it('devrait appeler calculateScore et stocker le résultat', () => {
    const selected = [1, 2];
    const result = { score: 30, level: 'Modéré' };

    component.selectedIds = selected;
    mockStressService.calculateScore.and.returnValue(of(result));

    component.submit();

    expect(mockStressService.calculateScore).toHaveBeenCalledWith(selected);
    expect(component.result).toEqual(result);
  });
});
