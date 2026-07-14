import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-prescriptions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-prescriptions.component.html',
  styleUrls: ['./my-prescriptions.component.scss']
})
export class MyPrescriptionsComponent {
  
  // دالة الطباعة البسيطة
  printPrescription() {
    window.print(); 
  }
}