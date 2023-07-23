import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardsTaskComponent } from './boards-task.component';

describe('BoardsTaskComponent', () => {
  let component: BoardsTaskComponent;
  let fixture: ComponentFixture<BoardsTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoardsTaskComponent]
    });
    fixture = TestBed.createComponent(BoardsTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
