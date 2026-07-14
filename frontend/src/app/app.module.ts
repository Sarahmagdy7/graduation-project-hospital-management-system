import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';  // ضيفي ده
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DepartmentsComponent } from './departments/departments.component';

import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { DoctorsManagementComponent } from './doctors-management/doctors-management.component';
import { PharmacyManagementComponent } from './pharmacy-management/pharmacy-management.component';
import { LabManagementComponent } from './lab-management/lab-management.component';

import { DoctorPanelComponent } from './doctor-panel/doctor-panel.component';
import { AppointmentsComponent } from './doctor-appointments/doctor-appointments.component';
import { PatientsRecordsComponent } from './patients-records/patients-records.component';
import { HospitalDepartmentsComponent } from './hospital-departments/hospital-departments.component';

import { PatientPanelComponent } from './patient-panel/patient-panel.component';
import { MyPrescriptionsComponent } from './patient-panel/my-prescriptions/my-prescriptions.component';
import { LabResultsComponent } from './patient-panel/lab-results/lab-results.component';
import { MedicalHistoryComponent } from './patient-panel/medical-history/medical-history.component';


@NgModule({

declarations: [
 AppComponent,



],

imports: [
 BrowserModule,
 AppRoutingModule,
  AdminPanelComponent,
HomeComponent,
 SignupComponent,
 AppointmentComponent,
 AboutUsComponent,
 ContactUsComponent,
 DepartmentsComponent,
 LoginComponent,
  RouterModule,
 MedicalHistoryComponent,
RouterModule,
 AdminDashboardComponent,
 DoctorsManagementComponent,
 PharmacyManagementComponent,
 LabManagementComponent,
 MyPrescriptionsComponent,
    HttpClientModule,

 DoctorPanelComponent,
 AppointmentsComponent,
 PatientsRecordsComponent,
 HospitalDepartmentsComponent,

 PatientPanelComponent,
],

providers: [],

bootstrap: [
 AppComponent
]

})
export class AppModule {}