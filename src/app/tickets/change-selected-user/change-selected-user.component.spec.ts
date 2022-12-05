import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeSelectedUserComponent } from './change-selected-user.component';

describe('ChangeSelectedUserComponent', () => {
  let component: ChangeSelectedUserComponent;
  let fixture: ComponentFixture<ChangeSelectedUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeSelectedUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeSelectedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
