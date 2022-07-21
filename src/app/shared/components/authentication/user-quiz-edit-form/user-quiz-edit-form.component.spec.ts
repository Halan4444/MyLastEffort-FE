import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserQuizEditFormComponent } from './user-quiz-edit-form.component';

describe('UserQuizEditFormComponent', () => {
  let component: UserQuizEditFormComponent;
  let fixture: ComponentFixture<UserQuizEditFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserQuizEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserQuizEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
