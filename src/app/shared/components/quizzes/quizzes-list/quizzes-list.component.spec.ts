import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuizzesListComponent } from './quizzes-list.component';

describe('QuizzesListComponent', () => {
  let component: QuizzesListComponent;
  let fixture: ComponentFixture<QuizzesListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
