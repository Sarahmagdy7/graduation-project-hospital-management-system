// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router, RouterModule } from '@angular/router';
// import { AuthService } from '../services/auth.service'; 

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, RouterModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent implements OnInit {
//   loginForm!: FormGroup;
//   selectedRole: 'patient' | 'doctor' | 'admin' = 'patient';
//   showPassword = false;

//   constructor(
//     private fb: FormBuilder, 
//     private router: Router,
//     private authService: AuthService 
//   ) {}

//   // 🚨 مهم جداً: تهيئة الفورم أول ما الصفحة تفتح
//   ngOnInit(): void {
//     this.initForm();
//   }

//   initForm(): void {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//       rememberMe: [false]
//     });
//   }

//   // 🚨 مهم جداً: التبديل بين الـ Tabs (Patient, Doctor, Admin) عند الضغط
//   selectRole(role: 'patient' | 'doctor' | 'admin'): void {
//     this.selectedRole = role;
//   }

//   // 🚨 مهم جداً: إظهار وإخفاء الباسورد
//   togglePasswordVisibility(): void {
//     this.showPassword = !this.showPassword;
//   }

//   // دالة الإرسال والتوجيه الذكي للمسارات الحقيقية عندك
//   onSubmit(): void {
//     if (this.loginForm.valid) {
//       const loginData = {
//         email: this.loginForm.value.email,
//         password: this.loginForm.value.password,
//         role: this.selectedRole
//       };

//       console.log('Sending login data to API:', loginData);

//       this.authService.login(loginData).subscribe({
//         next: (response: any) => {
//           console.log('Login successful, response:', response);

//           this.authService.storeSession(response.token, response.role || this.selectedRole);

//           const userRole = response.role || this.selectedRole;
          
//           if (userRole === 'admin') {
//   // ✅ التوجيه الصحيح للمسار اللي برمجناه للأدمن
//   this.router.navigate(['/admin-panel/dashboard']);
// } 
// else if (userRole === 'doctor') {
//   // ده هنوجهه للوحة الدكتور أول ما نعملها
//   this.router.navigate(['/doctor-panel']);
// } 
// else if (userRole === 'patient') {
//   // ده هنوجهه للوحة المريض أول ما نعملها
//   this.router.navigate(['/patient-panel']);
// }
//         },
//         error: (err: any) => {
//           console.error('Login failed:', err);
//           alert(err.error?.message || 'Login failed! Please check your credentials.');
//         }
//       });

//     } else {
//       // this.loginForm.markAllAsTouched();
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  selectedRole: 'patient' | 'doctor' | 'admin' = 'patient';
  showPassword = false;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private authService: AuthService 
  ) {}

  // 🚨 تهيئة الفورم أول ما الصفحة تفتح
  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  // 🚨 التبديل بين الـ Tabs (Patient, Doctor, Admin) عند الضغط
  selectRole(role: 'patient' | 'doctor' | 'admin'): void {
    this.selectedRole = role;
  }

  // 🚨 إظهار وإخفاء الباسورد
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // دالة الإرسال والتوجيه المحلي التجريبي (Local Bypass) لغاية ربط الباك إند
  onSubmit(): void {
    // 1️⃣ لو المستخدم اختار يدخل كـ Patient (يتخطى كل الشروط ويوجه للوحة المريض فوراً)
    if (this.selectedRole === 'patient') {
      console.log('Patient local login bypass success!');
      this.authService.storeSession('fake-patient-token', 'patient'); // تخزين جلسة وهمية
      this.router.navigate(['/patient-panel']); // التوجيه الفوري للوحة المريض والطفل الفرعي بتاعها
      return; // إيقاف الدالة تماماً هنا
    }

    // 2️⃣ لو المستخدم أدمن أو دكتور (يطبق الشروط العادية والـ Validation)
    if (this.loginForm.valid) {
      const enteredEmail = this.loginForm.value.email;
      const enteredPassword = this.loginForm.value.password;

      console.log('Testing local login for role:', this.selectedRole);

      // الـ Admin
      if (this.selectedRole === 'admin') {
        if (enteredEmail === 'admin@medilab.com' && enteredPassword === 'admin1234') {
          console.log('Admin local login success!');
          this.authService.storeSession('fake-admin-token', 'admin');
          this.router.navigate(['/admin-panel/dashboard']);
        } else {
          alert('بيانات الأدمن غير صحيحة! جربي admin@medilab.com وباسورد admin1234');
        }
      }
      
      // الـ Doctor
      else if (this.selectedRole === 'doctor') {
        if (enteredEmail === 'doctor@medilab.com' && enteredPassword === 'doctor1234') {
          console.log('Doctor local login success!');
          this.authService.storeSession('fake-doctor-token', 'doctor');
          this.router.navigate(['/doctor-panel/appointments']);
        } else {
          alert('بيانات الدكتور غير صحيحة! جربي doctor@medilab.com وباسورد doctor1234');
        }
      }

    } else {
      // لو الفورم غير صالحة للأدمن أو الدكتور
      this.loginForm.markAllAsTouched();
    }
  }
}