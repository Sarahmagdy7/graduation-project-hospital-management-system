import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  navItems = [
    { label: 'Dashboard', icon: 'fas fa-th-large', route: '/admin/dashboard' }, // تعديل المسار
    { label: 'Staff', icon: 'fas fa-user-md', route: '/staff' }, 
    { label: 'invoice', icon: 'fas fa-user-injured', route: '/invoice' },
    { label: 'patint', icon: 'fas fa-calendar-check', route: '/patint' },
    { label: 'pharmacy', icon: 'fas fa-users', route: '/pharmacy' },
    { label: 'ward', icon: 'fas fa-flask', route: '/ward' },
    { label: 'medicing', icon: 'fas fa-pills', route: '/medicing' },
    // { label: 'Pharmacy', icon: 'fas fa-hotel', route: '/admin/pharmacy' }
  ];

  // دالة تسجيل الخروج لتعود بـ المستخدم لصفحة الـ Login
  logout() {
    this.router.navigate(['/login']);
  }
}