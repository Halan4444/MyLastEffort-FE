import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzesListCategoryComponent } from './quizzes-list-category.component';

describe('QuizzesListCategoryComponent', () => {
  let component: QuizzesListCategoryComponent;
  let fixture: ComponentFixture<QuizzesListCategoryComponent>;

  beforeEach(async(() => {
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
