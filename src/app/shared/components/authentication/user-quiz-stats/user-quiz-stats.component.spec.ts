import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQuizStatsComponent } from './user-quiz-stats.component';

describe('UserQuizStatsComponent', () => {
  let component: UserQuizStatsComponent;
  let fixture: ComponentFixture<UserQuizStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserQuizStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserQuizStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
