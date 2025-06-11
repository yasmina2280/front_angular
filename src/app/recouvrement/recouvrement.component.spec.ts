import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecouvrementComponent } from './recouvrement.component';

describe('RecouvrementComponent', () => {
  let component: RecouvrementComponent;
  let fixture: ComponentFixture<RecouvrementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecouvrementComponent]
    });
    fixture = TestBed.createComponent(RecouvrementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
