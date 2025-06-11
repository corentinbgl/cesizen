import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StressConfigComponent } from './stress-config.component';

describe('StressConfigComponent', () => {
  let component: StressConfigComponent;
  let fixture: ComponentFixture<StressConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StressConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StressConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
