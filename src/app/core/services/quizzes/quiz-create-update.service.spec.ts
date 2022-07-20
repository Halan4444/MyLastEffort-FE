import { TestBed } from '@angular/core/testing';

import { QuizCreateUpdateService } from './quiz-create-update.service';

describe('QuizCreateUpdateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuizCreateUpdateService = TestBed.get(QuizCreateUpdateService);
    expect(service).toBeTruthy();
  });
});
