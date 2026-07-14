import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  appointmentForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.appointmentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      nic: ['', Validators.required],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      departmentName: ['', Validators.required],
      doctorName: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  // دالة مساعدة للتحقق من صحة الحقول وإظهار حواف حمراء عند الخطأ بعد اللمس
  isInvalid(controlName: string): boolean {
    const control = this.appointmentForm.get(controlName);
    return !!(control && control.touched && control.invalid);
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      console.log('Appointment Form Submitted Successfully:', this.appointmentForm.value);
      alert('Your appointment has been registered successfully!');
      this.appointmentForm.reset({ gender: '', departmentName: '' }); // إعادة تهيئة القيم الافتراضية
    } else {
      this.appointmentForm.markAllAsTouched(); // تفعيل الخطأ على الحقول الفارغة عند الضغط المباشر
    }
  }
}