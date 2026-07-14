import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-patient-panel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './patient-panel.component.html',
  styleUrls: ['./patient-panel.component.scss']
})
export class PatientPanelComponent {
  // هنا نقدر نضيف logic خاص ببيانات المريض لو حبينا مستقبلاً
  constructor() {}
}