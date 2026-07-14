import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lab-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lab-results.component.html',
  styleUrls: ['./lab-results.component.scss']
})
export class LabResultsComponent {
  // البيانات ديناميكية وجاهزة للربط بالـ API لاحقاً
  labResults = [
    { id: 1, testName: 'Complete Blood Count (CBC)', date: '2026-06-20', status: 'Normal' },
    { id: 2, testName: 'Lipid Profile', date: '2026-05-15', status: 'Pending' }
  ];

  downloadReport(id: number) {
    console.log('Downloading report for test ID:', id);
    // لاحقاً هنا سنكتب كود ربط تحميل الملف من السيرفر
  }
}