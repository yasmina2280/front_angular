import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierOperationsComponent } from './dossier-operations.component';

describe('DossierOperationsComponent', () => {
  let component: DossierOperationsComponent;
  let fixture: ComponentFixture<DossierOperationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DossierOperationsComponent]
    });
    fixture = TestBed.createComponent(DossierOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
