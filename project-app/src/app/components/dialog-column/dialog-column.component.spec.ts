import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogColumnComponent } from './dialog-column.component';

describe('DialogColumnComponent', () => {
  let component: DialogColumnComponent;
  let fixture: ComponentFixture<DialogColumnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogColumnComponent]
    });
    fixture = TestBed.createComponent(DialogColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
