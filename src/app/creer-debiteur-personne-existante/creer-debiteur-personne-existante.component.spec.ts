import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerDebiteurPersonneExistanteComponent } from './creer-debiteur-personne-existante.component';

describe('CreerDebiteurPersonneExistanteComponent', () => {
  let component: CreerDebiteurPersonneExistanteComponent;
  let fixture: ComponentFixture<CreerDebiteurPersonneExistanteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreerDebiteurPersonneExistanteComponent]
    });
    fixture = TestBed.createComponent(CreerDebiteurPersonneExistanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
