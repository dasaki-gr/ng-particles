import { TestBed, inject } from '@angular/core/testing';

import { VectorService } from './vector.service';

describe('VectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VectorService]
    });
  });

  it('should ...', inject([VectorService], (service: VectorService) => {
    expect(service).toBeTruthy();
  }));
});
