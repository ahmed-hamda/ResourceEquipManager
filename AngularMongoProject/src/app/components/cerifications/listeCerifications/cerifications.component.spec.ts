import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CerificationsComponent } from './cerifications.component';

describe('CerificationsComponent', () => {
  let component: CerificationsComponent;
  let fixture: ComponentFixture<CerificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CerificationsComponent]
    });
    fixture = TestBed.createComponent(CerificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
