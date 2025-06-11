import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { StressService } from './stress.service';
import { HttpClient } from '@angular/common/http';

describe('StressService', () => {
  let service: StressService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StressService, HttpClient]
    });
    service = TestBed.inject(StressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
