import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuizzesListCategoryComponent } from './quizzes-list-category.component';

describe('QuizzesListCategoryComponent', () => {
  let component: QuizzesListCategoryComponent;
  let fixture: ComponentFixture<QuizzesListCategoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzesListCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzesListCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
