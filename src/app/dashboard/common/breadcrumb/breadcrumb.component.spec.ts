import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBreadcrumbComponent } from './breadcrumb.component';

describe('BreadcrumbComponent', () => {
  let component: AdminBreadcrumbComponent;
  let fixture: ComponentFixture<AdminBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBreadcrumbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
