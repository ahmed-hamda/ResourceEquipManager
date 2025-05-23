import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationsComponent } from './affectations.component';

describe('JourFerieComponent', () => {
  let component: AffectationsComponent;
  let fixture: ComponentFixture<AffectationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AffectationsComponent]
    });
    fixture = TestBed.createComponent(AffectationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
