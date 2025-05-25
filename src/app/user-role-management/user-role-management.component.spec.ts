import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleManagementComponent } from './user-role-management.component';

describe('UserRoleManagementComponent', () => {
  let component: UserRoleManagementComponent;
  let fixture: ComponentFixture<UserRoleManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserRoleManagementComponent]
    });
    fixture = TestBed.createComponent(UserRoleManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
