import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule], // 👈 مهم جداً عشان الـ *ngFor والـ routerLink يشتغلوا في الـ HTML
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // مصفوفة تجريبية لو حابة تعرضي دكاترة ببيانات حقيقية بعدين بدل التكرار الثابت
  doctorsList = [
    { name: 'Silver A.D.M.P', degree: 'MBBS, UC, BCH', image: 'assets/img/doctor-placeholder10.jpg' },
    { name: 'sara A.D.M.P', degree: 'MBBS, UC, BCH', image: 'assets/img/doctor-placeholder.jpg' },
    { name: 'mine A.D.M.P', degree: 'MBBS, UC, BCH', image: 'assets/img/doctor-placeholder2.jpg' },
    { name: 'ehab A.D.M.P', degree: 'MBBS, UC, BCH', image: 'assets/img/doctor-placeholder3.jpg' },
    { name: 'rizke A.D.M.P', degree: 'MBBS, UC, BCH', image: 'assets/img/doctor-placeholder10.jpg'},
    { name: 'machal A.D.M.P', degree: 'MBBS, UC, BCH', image: 'assets/img/doctor-placeholder3.jpg' },
    { name: 'nade A.D.M.P', degree: 'MBBS, UC, BCH', image: 'assets/img/doctor-placeholder.jpg' },
    { name: 'rinue A.D.M.P', degree: 'MBBS, UC, BCH', image: 'assets/img/doctor-placeholder2.jpg' },
    { name: 'Silver A.D.M.P', degree: 'MBBS, UC, BCH', image: 'assets/img/doctor-placeholder10.jpg' },
    { name: 'Silver A.D.M.P', degree: 'MBBS, UC, BCH', image: 'assets/img/doctor-placeholder3.jpg' },
    { name: 'Silver A.D.M.P', degree: 'MBBS, UC, BCH', image: 'assets/img/doctor-placeholder3.jpg' },
    { name: 'Silver A.D.M.P', degree: 'MBBS, UC, BCH', image: 'assets/img/doctor-placeholder10.jpg' },
  ];

  constructor() { }

  ngOnInit(): void {
    // أي أكواد هتحتاجي تنفذيها أول ما الصفحة تفتح (زي جلب البيانات من الـ API) هتكون هنا
  }

  // دالة تجريبية لو حابة تعملي تسليم للفورم بتاع الـ Contact Us
  onSendMessage(formData: any): void {
    console.log('Contact Message Sent:', formData);
    alert('Thank you for contacting MediLab Hospital! Your message has been sent.');
  }

}