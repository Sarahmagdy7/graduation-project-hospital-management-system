import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // ✅ التعديل هنا: غيرناها لـ @angular/router

// المكونات العامة للموقع
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component'; 
import { SignupComponent } from './signup/signup.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { DepartmentsComponent } from './departments/departments.component';

// لوحة تحكم الأدمن والصفحات الفرعية
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { DoctorsManagementComponent } from './doctors-management/doctors-management.component';
import { PharmacyManagementComponent } from './pharmacy-management/pharmacy-management.component';
import { LabManagementComponent } from './lab-management/lab-management.component';

// لوحة تحكم الطبيب والصفحات الفرعية
import { DoctorPanelComponent } from './doctor-panel/doctor-panel.component';
import { AppointmentsComponent } from './doctor-appointments/doctor-appointments.component';
import { PatientsRecordsComponent } from './patients-records/patients-records.component';
import { HospitalDepartmentsComponent } from './hospital-departments/hospital-departments.component';

import { PatientPanelComponent } from './patient-panel/patient-panel.component'; // حسب اسمه عندك


import { MyPrescriptionsComponent } from './patient-panel/my-prescriptions/my-prescriptions.component';
import { LabResultsComponent } from './patient-panel/lab-results/lab-results.component';
import { MedicalHistoryComponent } from './patient-panel/medical-history/medical-history.component';
// ضيفيها تحت الـ admin-panel أو المكان المناسب
const routes: Routes = [
  // 1️⃣ المسارات العامة
{ path: '', redirectTo: 'home', pathMatch: 'full' },
{ path: 'home', component: HomeComponent },
{ path: 'signup', component: SignupComponent },
{ path: 'appointment', component: AppointmentComponent },
{ path: 'about-us', component: AboutUsComponent },
{ path: 'contact-us', component: ContactUsComponent },
{ path: 'departments', component: DepartmentsComponent },
{ path: 'login', component: LoginComponent },


  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'doctors', component: DoctorsManagementComponent },
      { path: 'pharmacy', component: PharmacyManagementComponent },
      { path: 'lab', component: LabManagementComponent },
      { path: 'departments', component: HospitalDepartmentsComponent },
    ]
  },

  // 3️⃣ لوحة تحكم الدكتور الفرعية
  {
    path: 'doctor-panel',
    component: DoctorPanelComponent,
    children: [
      { path: '', redirectTo: 'appointments', pathMatch: 'full' },
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'patients-records', component: PatientsRecordsComponent },
    ]
  },

  

  {
  path: 'patient-panel',
  component: PatientPanelComponent,
  children: [
    { path: '', redirectTo: 'make-appointment', pathMatch: 'full' },
    { path: 'make-appointment', component: AppointmentComponent },
    { path: 'profile', component: PatientsRecordsComponent },
    { path: 'prescriptions', component: MyPrescriptionsComponent },
    { path: 'lab-results', component: LabResultsComponent },
    { path: 'medical-history', component: MedicalHistoryComponent },
  ]
},
  






  { path: '**', redirectTo: 'login' },
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }