import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierSearchComponent } from './dossier-search.component';

describe('DossierSearchComponent', () => {
  let component: DossierSearchComponent;
  let fixture: ComponentFixture<DossierSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DossierSearchComponent]
    });
    fixture = TestBed.createComponent(DossierSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
