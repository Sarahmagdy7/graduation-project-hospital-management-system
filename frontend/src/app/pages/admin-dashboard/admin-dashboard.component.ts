import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // ✅ الـ Router مستورد بشكل صحيح

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  
  // المتغيرات اللي الـ HTML هيقراها
  totalDoctors: number = 42; 
  totalPatients: number = 1240;
  pharmacyInvoices: number = 156;
  labTests: number = 89;

  // مصفوفة الحجوزات اللي بتتعرض في الجدول
  recentAppointments = [
    { name: 'John Doe', doctor: 'Dr. Sarah Magdy', dept: 'Cardiology', time: '28 June 2026 - 10:30 AM', status: 'Confirmed' },
    { name: 'Ali Rizk', doctor: 'Dr. Mark Michael', dept: 'Pediatrics', time: '28 June 2026 - 11:15 AM', status: 'Pending' }
  ];

  // ✅ الـ constructor مكانه الصحيح بيكون جوه الكلاس هنا
  constructor(private router: Router) {}

  ngOnInit(): void {}

  // ✅ الدالة مكانها الصحيح جوه الكلاس عشان الـ HTML يشوفها
  goToAppointments(): void {
    // التوجيه لصفحة المواعيد الكاملة (تأكدي أن المسار ده موجود في الـ Routing)
    this.router.navigate(['/admin-panel/patient']); 
  }
}