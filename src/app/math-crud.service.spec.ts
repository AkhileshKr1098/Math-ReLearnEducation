import { TestBed } from '@angular/core/testing';

import { MathCrudService } from './math-crud.service';

describe('MathCrudService', () => {
  let service: MathCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MathCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
