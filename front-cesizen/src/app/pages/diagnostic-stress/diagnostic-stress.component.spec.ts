import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticStressComponent } from './diagnostic-stress.component';

describe('DiagnosticStressComponent', () => {
  let component: DiagnosticStressComponent;
  let fixture: ComponentFixture<DiagnosticStressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagnosticStressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagnosticStressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
