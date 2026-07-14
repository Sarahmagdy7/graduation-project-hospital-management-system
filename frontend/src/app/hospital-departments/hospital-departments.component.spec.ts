import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalDepartmentsComponent } from './hospital-departments.component';

describe('HospitalDepartmentsComponent', () => {
  let component: HospitalDepartmentsComponent;
  let fixture: ComponentFixture<HospitalDepartmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HospitalDepartmentsComponent]
    });
    fixture = TestBed.createComponent(HospitalDepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
