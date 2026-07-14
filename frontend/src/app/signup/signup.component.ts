import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  selectedRole: string = 'patient'; // القيمة الافتراضية للتابات
  showPassword = false;
  showConfirmPassword = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      nic: ['', Validators.required],
      dob: ['', Validators.required],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  // مخصص لمقارنة كلمة المرور وتأكيدها لضمان التطابق
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'mismatch': true };
    }
    return null;
  }

  selectRole(role: string): void {
    this.selectedRole = role;
    console.log('Role switched to:', this.selectedRole);
  }

  togglePassword(): void { this.showPassword = !this.showPassword; }

  isInvalid(controlName: string): boolean {
    const control = this.signupForm.get(controlName);
    return !!(control && control.touched && control.invalid);
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const formData = {
        ...this.signupForm.value,
        role: this.selectedRole
      };
      console.log('Registration Data:', formData);
      alert('Registration Completed Successfully!');
      this.signupForm.reset({ gender: '' });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}