import { TestBed } from '@angular/core/testing';
import { AbstractParser } from './parser';

describe('LightLocalizeParserService', () => {
  let service: AbstractParser;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbstractParser);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
