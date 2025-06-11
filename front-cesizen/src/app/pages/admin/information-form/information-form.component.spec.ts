import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformationFormComponent } from './information-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Information, InformationService } from '../../../services/information.service';

describe('InformationFormComponent without id', () => {
  let component: InformationFormComponent;
  let fixture: ComponentFixture<InformationFormComponent>;
  let infoServiceSpy: jasmine.SpyObj<InformationService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    infoServiceSpy = jasmine.createSpyObj('InformationService', ['getById', 'create', 'update']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    infoServiceSpy.getById.and.returnValue(of({
  id: 1,
  title: 'Init',
  slug: 'init',
  content: 'Texte',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
}));

    await TestBed.configureTestingModule({
      imports: [InformationFormComponent, ReactiveFormsModule],
      providers: [
        { provide: InformationService, useValue: infoServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => null
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InformationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not submit if form is invalid', () => {
    component.form.setValue({ title: '', slug: '', content: '' });
    component.onSubmit();
    expect(infoServiceSpy.create).not.toHaveBeenCalled();
    expect(infoServiceSpy.update).not.toHaveBeenCalled();
  });

  it('should call create if form is valid and not edit mode', () => {
    const mockInformation: Information = {
      id: 1,
      title: 'Test',
      slug: 'test',
      content: 'Contenu',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    component.form.setValue({ title: 'Test', slug: 'test', content: 'Contenu' });
    infoServiceSpy.create.and.returnValue(of(mockInformation));

    component.onSubmit();

    expect(infoServiceSpy.create).toHaveBeenCalledWith(component.form.value as { title: string; slug: string; content: string });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/admin/informations']);
  });
});

describe('InformationFormComponent with id', () => {
  let component: InformationFormComponent;
  let fixture: ComponentFixture<InformationFormComponent>;
  let infoServiceSpy: jasmine.SpyObj<InformationService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    infoServiceSpy = jasmine.createSpyObj('InformationService', ['getById', 'create', 'update']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [InformationFormComponent, ReactiveFormsModule],
      providers: [
        { provide: InformationService, useValue: infoServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InformationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should patch value from getById if in edit mode on init', () => {
    const mockData: Information = {
      id: 1,
      title: 'Init',
      slug: 'init',
      content: 'Texte',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    infoServiceSpy.getById.and.returnValue(of(mockData));
    component.ngOnInit();

    expect(infoServiceSpy.getById).toHaveBeenCalledWith(1);
    expect(component.form.value).toEqual({
      title: 'Init',
      slug: 'init',
      content: 'Texte'
    });
  });

  it('should call update if edit mode is true', () => {
    component.isEdit = true;
    component.infoId = 1;
    component.form.setValue({ title: 'Edit', slug: 'edit', content: 'Texte modifié' });

    const mockUpdated: Information = {
      id: 1,
      title: 'Edit',
      slug: 'edit',
      content: 'Texte modifié',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    infoServiceSpy.update.and.returnValue(of(mockUpdated));

    component.onSubmit();

    expect(infoServiceSpy.update).toHaveBeenCalledWith(1, component.form.value as { title: string; slug: string; content: string });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/admin/informations']);
  });
});
