import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeleteStatusComponent } from './delete-status.component';

describe('DeleteStatusComponent', () => {
  let component: DeleteStatusComponent;
  let fixture: ComponentFixture<DeleteStatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
