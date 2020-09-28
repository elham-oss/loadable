import { TestBed } from '@angular/core/testing';
import { HttpLoader } from './http.loader';

describe('LightLocalizeRouterHttpLoaderService', () => {
  let service: HttpLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpLoader);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
