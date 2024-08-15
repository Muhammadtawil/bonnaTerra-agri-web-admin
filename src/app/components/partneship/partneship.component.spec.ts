import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartneshipComponent } from './partneship.component';

describe('PartneshipComponent', () => {
  let component: PartneshipComponent;
  let fixture: ComponentFixture<PartneshipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartneshipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartneshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
