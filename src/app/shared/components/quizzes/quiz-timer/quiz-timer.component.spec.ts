import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuizTimerComponent } from './quiz-timer.component';

describe('QuizTimerComponent', () => {
  let component: QuizTimerComponent;
  let fixture: ComponentFixture<QuizTimerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizTimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
