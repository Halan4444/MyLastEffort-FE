import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuizDetailsComponent } from './quiz-details.component';

describe('QuizDetailsComponent', () => {
  let component: QuizDetailsComponent;
  let fixture: ComponentFixture<QuizDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
