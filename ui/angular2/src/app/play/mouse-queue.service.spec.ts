/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MouseQueueService } from './mouse-queue.service';

describe('MouseQueueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MouseQueueService]
    });
  });

  it('should ...', inject([MouseQueueService], (service: MouseQueueService) => {
    expect(service).toBeTruthy();
  }));
});
