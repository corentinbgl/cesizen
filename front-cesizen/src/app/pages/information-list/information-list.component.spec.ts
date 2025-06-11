import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformationListComponent } from './information-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InformationListComponent', () => {
  let component: InformationListComponent;
  let fixture: ComponentFixture<InformationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        InformationListComponent,         // ✅ composant standalone
        HttpClientTestingModule           // ✅ remplace HttpClient
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InformationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
