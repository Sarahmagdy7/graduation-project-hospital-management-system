import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './make-appointment.component.html',
  styleUrls: ['./make-appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  appointmentForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // بناء الفورم مع التحقق من صحة البيانات (Validation)
    this.appointmentForm = this.fb.group({
      department: ['', Validators.required],
      date: ['', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      console.log('Form Data:', this.appointmentForm.value);
      alert('Appointment request sent successfully!');
      this.appointmentForm.reset();
    }
  }
}