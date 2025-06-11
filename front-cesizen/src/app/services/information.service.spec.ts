import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InformationService, Information } from './information.service';

describe('InformationService', () => {
  let service: InformationService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/infos';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InformationService]
    });

    service = TestBed.inject(InformationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('devrait récupérer toutes les informations', () => {
    const mockData: Information[] = [
      { id: 1, title: 'Info 1', slug: 'info-1', content: 'Contenu', createdAt: '', updatedAt: '' }
    ];

    service.getAll().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('devrait récupérer une information par slug', () => {
    const mockInfo: Information = { id: 1, title: 'Info 1', slug: 'info-1', content: 'Contenu', createdAt: '', updatedAt: '' };

    service.getBySlug('info-1').subscribe(data => {
      expect(data).toEqual(mockInfo);
    });

    const req = httpMock.expectOne(`${apiUrl}/info-1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockInfo);
  });



  it('devrait créer une information', () => {
    const input = { title: 'Nouvelle info' };
    const created = { ...input, id: 2, slug: 'nouvelle-info', content: '', createdAt: '', updatedAt: '' } as Information;

    service.create(input).subscribe(data => {
      expect(data).toEqual(created);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(created);
  });

  it('devrait mettre à jour une information', () => {
    const update = { title: 'Titre mis à jour' };
    const updated = { id: 1, title: 'Titre mis à jour', slug: 'info-1', content: '', createdAt: '', updatedAt: '' };

    service.update(1, update).subscribe(data => {
      expect(data).toEqual(updated);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PATCH');
    req.flush(updated);
  });

  it('devrait récupérer une information par ID', () => {
    const info: Information = { id: 3, title: 'Info 3', slug: 'info-3', content: 'Contenu', createdAt: '', updatedAt: '' };

    service.getById(3).subscribe(data => {
      expect(data).toEqual(info);
    });

    const req = httpMock.expectOne(`${apiUrl}/3`);
    expect(req.request.method).toBe('GET');
    req.flush(info);
  });
});
