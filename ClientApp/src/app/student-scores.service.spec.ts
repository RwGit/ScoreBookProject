import { TestBed } from '@angular/core/testing';

import { StudentScoresService } from './student-scores.service';

describe('StudentScoresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentScoresService = TestBed.get(StudentScoresService);
    expect(service).toBeTruthy();
  });
});
