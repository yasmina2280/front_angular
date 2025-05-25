import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDebiteurComponent } from './gestion-debiteur.component';

describe('GestionDebiteurComponent', () => {
  let component: GestionDebiteurComponent;
  let fixture: ComponentFixture<GestionDebiteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionDebiteurComponent]
    });
    fixture = TestBed.createComponent(GestionDebiteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
