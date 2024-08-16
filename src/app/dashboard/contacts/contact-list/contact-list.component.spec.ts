import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContactListComponent } from './contact-list.component';

describe('ContactListComponent', () => {
  let component: AdminContactListComponent;
  let fixture: ComponentFixture<AdminContactListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminContactListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
