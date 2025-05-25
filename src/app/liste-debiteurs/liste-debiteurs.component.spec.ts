import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDebiteursComponent } from './liste-debiteurs.component';

describe('ListeDebiteursComponent', () => {
  let component: ListeDebiteursComponent;
  let fixture: ComponentFixture<ListeDebiteursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeDebiteursComponent]
    });
    fixture = TestBed.createComponent(ListeDebiteursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
