import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShowStatusComponent } from './show-status.component';

describe('ShowStatusComponent', () => {
  let component: ShowStatusComponent;
  let fixture: ComponentFixture<ShowStatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
