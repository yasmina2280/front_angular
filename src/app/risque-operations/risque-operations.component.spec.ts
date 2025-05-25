import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RisqueOperationsComponent } from './risque-operations.component';

describe('RisqueOperationsComponent', () => {
  let component: RisqueOperationsComponent;
  let fixture: ComponentFixture<RisqueOperationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RisqueOperationsComponent]
    });
    fixture = TestBed.createComponent(RisqueOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
