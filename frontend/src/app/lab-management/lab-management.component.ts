import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lab-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lab-management.component.html',
  styleUrls: ['./lab-management.component.scss']
})
export class LabManagementComponent implements OnInit {

  labTestsList = [
    { id: 1, code: '#LAB-8821', patientName: 'John Doe', testType: 'Complete Blood Count (CBC)', requestedBy: 'Dr. Sarah Ahmed', date: '2026-06-27', status: 'Completed' },
    { id: 2, code: '#LAB-4402', patientName: 'Ali Rizk', testType: 'Liver Function Test (LFT)', requestedBy: 'Dr. Mark Michael', date: '2026-06-28', status: 'Pending Sample' },
    { id: 3, code: '#LAB-1094', patientName: 'Sarah Magdy', testType: 'PCR Test', requestedBy: 'Dr. Sarah Ahmed', date: '2026-06-28', status: 'In Progress' }
  ];

  newTest = { code: '', patientName: '', testType: 'Complete Blood Count (CBC)', requestedBy: '', date: '', status: 'Pending Sample' };

  isEditMode: boolean = false;
  editingTestId: number | null = null;

  constructor() {}

  ngOnInit(): void {}

  openAddModal(): void {
    this.isEditMode = false;
    this.newTest = { code: '', patientName: '', testType: 'Complete Blood Count (CBC)', requestedBy: '', date: new Date().toISOString().split('T')[0], status: 'Pending Sample' };
  }

  openEditModal(test: any): void {
    this.isEditMode = true;
    this.editingTestId = test.id;
    this.newTest = { ...test };
  }

  saveLabTest(): void {
    if (this.newTest.code && this.newTest.patientName && this.newTest.requestedBy) {
      if (this.isEditMode && this.editingTestId !== null) {
        const index = this.labTestsList.findIndex(t => t.id === this.editingTestId);
        if (index !== -1) {
          this.labTestsList[index] = {
            ...this.labTestsList[index],
            code: this.newTest.code,
            patientName: this.newTest.patientName,
            testType: this.newTest.testType,
            requestedBy: this.newTest.requestedBy,
            date: this.newTest.date,
            status: this.newTest.status
          };
        }
      } else {
        this.labTestsList.push({
          id: Date.now(),
          code: this.newTest.code.startsWith('#') ? this.newTest.code : '#' + this.newTest.code,
          patientName: this.newTest.patientName,
          testType: this.newTest.testType,
          requestedBy: this.newTest.requestedBy,
          date: this.newTest.date,
          status: this.newTest.status
        });
      }

      this.newTest = { code: '', patientName: '', testType: 'Complete Blood Count (CBC)', requestedBy: '', date: '', status: 'Pending Sample' };
      this.isEditMode = false;
      this.editingTestId = null;

      const modalCloseBtn = document.getElementById('closeModalBtn');
      if (modalCloseBtn) modalCloseBtn.click();
    }
  }

  deleteLabTest(id: number): void {
    if (confirm('Are you sure you want to delete this lab test record?')) {
      this.labTestsList = this.labTestsList.filter(t => t.id !== id);
    }
  }
}