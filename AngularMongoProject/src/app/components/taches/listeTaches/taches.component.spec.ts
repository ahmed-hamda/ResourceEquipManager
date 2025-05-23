import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TachesComponent } from './taches.component';

describe('VilleComponent', () => {
  let component: TachesComponent;
  let fixture: ComponentFixture<TachesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TachesComponent]
    });
    fixture = TestBed.createComponent(TachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
