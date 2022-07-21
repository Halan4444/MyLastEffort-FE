import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserQuizzesListComponent } from './user-quizzes-list.component';

describe('UserQuizzesListComponent', () => {
  let component: UserQuizzesListComponent;
  let fixture: ComponentFixture<UserQuizzesListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserQuizzesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserQuizzesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
