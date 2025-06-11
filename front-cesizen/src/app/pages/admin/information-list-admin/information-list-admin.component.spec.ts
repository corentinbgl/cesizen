import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformationListAdminComponent } from './information-list-admin.component';
import { ActivatedRoute } from '@angular/router';
import { InformationService } from '../../../services/information.service';
import { of } from 'rxjs';

describe('InformationListAdminComponent', () => {
  let component: InformationListAdminComponent;
  let fixture: ComponentFixture<InformationListAdminComponent>;
  let mockInfoService: jasmine.SpyObj<InformationService>;

  beforeEach(async () => {
    mockInfoService = jasmine.createSpyObj('InformationService', ['getAll', 'delete']);
    mockInfoService.getAll.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [InformationListAdminComponent, HttpClientTestingModule],
      providers: [
        { provide: InformationService, useValue: mockInfoService },
        { provide: ActivatedRoute, useValue: {} } // ✅ ajout requis pour RouterModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InformationListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
