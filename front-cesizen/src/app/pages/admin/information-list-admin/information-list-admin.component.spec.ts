import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationListAdminComponent } from './information-list-admin.component';

describe('InformationListAdminComponent', () => {
  let component: InformationListAdminComponent;
  let fixture: ComponentFixture<InformationListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationListAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
