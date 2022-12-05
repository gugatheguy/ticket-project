import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSelectedComponent } from './delete-selected.component';

describe('DeleteSelectedComponent', () => {
  let component: DeleteSelectedComponent;
  let fixture: ComponentFixture<DeleteSelectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteSelectedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
