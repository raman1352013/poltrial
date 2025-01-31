import { TestBed } from '@angular/core/testing';

import { JsService } from './js.service';

describe('JsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JsService = TestBed.get(JsService);
    expect(service).toBeTruthy();
  });
});
