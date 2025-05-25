import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebiteurDetailsComponent } from './debiteur-details.component';

describe('DebiteurDetailsComponent', () => {
  let component: DebiteurDetailsComponent;
  let fixture: ComponentFixture<DebiteurDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DebiteurDetailsComponent]
    });
    fixture = TestBed.createComponent(DebiteurDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
