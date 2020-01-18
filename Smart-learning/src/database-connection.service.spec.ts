import { TestBed, inject } from '@angular/core/testing';

import { DatabaseConnectionService } from './database-connection.service';

describe('DatabaseConnectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatabaseConnectionService]
    });
  });

  it('should be created', inject([DatabaseConnectionService], (service: DatabaseConnectionService) => {
    expect(service).toBeTruthy();
  }));
});
