import { TestBed } from '@angular/core/testing';

import { SchtroumpfsService } from './schtroumpfs.service';

describe('SchtroumpfsService', () => {
  let service: SchtroumpfsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchtroumpfsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
