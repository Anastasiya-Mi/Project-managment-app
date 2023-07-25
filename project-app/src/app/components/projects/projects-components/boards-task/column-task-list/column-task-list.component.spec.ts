import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnTaskListComponent } from './column-task-list.component';

describe('ColumnTaskListComponent', () => {
  let component: ColumnTaskListComponent;
  let fixture: ComponentFixture<ColumnTaskListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColumnTaskListComponent]
    });
    fixture = TestBed.createComponent(ColumnTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
