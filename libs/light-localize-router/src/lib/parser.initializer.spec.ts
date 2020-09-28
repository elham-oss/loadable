import { TestBed } from '@angular/core/testing';

import { ParserInitializerService } from './light-localize-parser-initializer.service';

describe('LightLocalizeParserInitializerService', () => {
  let service: ParserInitializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParserInitializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
