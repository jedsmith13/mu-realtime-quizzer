import { TestBed, inject } from '@angular/core/testing';

import { WsCommunicatorService } from './ws-communicator.service';

describe('WsCommunicatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WsCommunicatorService]
    });
  });

  it('should ...', inject([WsCommunicatorService], (service: WsCommunicatorService) => {
    expect(service).toBeTruthy();
  }));
});
