import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeSelectedStatusComponent } from './change-selected-status.component';

describe('ChangeSelectedStatusComponent', () => {
  let component: ChangeSelectedStatusComponent;
  let fixture: ComponentFixture<ChangeSelectedStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeSelectedStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeSelectedStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
