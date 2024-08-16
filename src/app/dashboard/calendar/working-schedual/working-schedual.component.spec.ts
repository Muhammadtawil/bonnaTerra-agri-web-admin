import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingScheduleComponent } from './working-schedual.component';

describe('WorkingSchedualComponent', () => {
  let component: WorkingScheduleComponent;
  let fixture: ComponentFixture<WorkingScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkingScheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkingScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
