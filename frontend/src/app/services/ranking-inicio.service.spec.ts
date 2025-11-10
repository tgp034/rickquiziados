import { TestBed } from '@angular/core/testing';

import { RankingInicioService } from './ranking-inicio.service';

describe('RankingInicioService', () => {
  let service: RankingInicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RankingInicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
