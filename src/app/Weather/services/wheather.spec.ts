import { TestBed } from '@angular/core/testing';

import { Wheather } from './wheather.service';

describe('Wheather', () => {
  let service: Wheather;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Wheather);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
