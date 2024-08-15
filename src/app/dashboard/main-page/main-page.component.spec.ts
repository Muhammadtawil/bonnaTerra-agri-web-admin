import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashMainComponent } from './main-page.component';

describe('MainPageComponent', () => {
  let component: DashMainComponent;
  let fixture: ComponentFixture<DashMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
