import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-medical-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.scss']
})
export class MedicalHistoryComponent {
  // هذه البيانات هي ما سيتم استبداله بـ API Call لاحقاً
  medicalRecords = [
    { date: '2026-05-10', diagnosis: 'Flu', doctor: 'Dr. Ahmed', notes: 'Need 3 days rest' },
    { date: '2026-03-15', diagnosis: 'Routine Checkup', doctor: 'Dr. Sara', notes: 'All good' }
  ];
}