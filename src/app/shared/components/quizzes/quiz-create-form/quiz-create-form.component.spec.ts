import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizCreateFormComponent } from './quiz-create-form.component';

describe('QuizCreateFormComponent', () => {
  let component: QuizCreateFormComponent;
  let fixture: ComponentFixture<QuizCreateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizCreateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
