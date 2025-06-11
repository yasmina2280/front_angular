import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierRisqueComponent } from './modifier-risque.component';

describe('ModifierRisqueComponent', () => {
  let component: ModifierRisqueComponent;
  let fixture: ComponentFixture<ModifierRisqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifierRisqueComponent]
    });
    fixture = TestBed.createComponent(ModifierRisqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
