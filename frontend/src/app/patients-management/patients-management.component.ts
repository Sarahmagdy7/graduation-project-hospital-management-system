import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patients-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patients-management.component.html',
  styleUrls: ['./patients-management.component.scss']
})
export class PatientsManagementComponent implements OnInit {

  // Dynamic Array holding active patient master records
  patientsList = [
    { id: 1, code: '#PT-4412', name: 'John Doe', age: 34, gender: 'Male', phone: '0102345678', bloodGroup: 'A+', address: 'Cairo, Egypt' },
    { id: 2, code: '#PT-0922', name: 'Ali Rizk', age: 12, gender: 'Male', phone: '0119876543', bloodGroup: 'O+', address: 'Assiut, Egypt' },
    { id: 3, code: '#PT-7710', name: 'Mary Smith', age: 28, gender: 'Female', phone: '0125554433', bloodGroup: 'B-', address: 'Alexandria, Egypt' }
  ];

  // Object structure for capturing patient registration form parameters
  newPatient = { code: '', name: '', age: null as number | null, gender: 'Male', phone: '', bloodGroup: 'A+', address: '' };

  isEditMode: boolean = false;
  editingPatientId: number | null = null;

  constructor() {}

  ngOnInit(): void {}

  openAddModal(): void {
    this.isEditMode = false;
    this.newPatient = { code: '', name: '', age: null, gender: 'Male', phone: '', bloodGroup: 'A+', address: '' };
  }

  openEditModal(patient: any): void {
    this.isEditMode = true;
    this.editingPatientId = patient.id;
    this.newPatient = { ...patient };
  }

  savePatient(): void {
    if (this.newPatient.code && this.newPatient.name && this.newPatient.phone) {
      if (this.isEditMode && this.editingPatientId !== null) {
        // Update database node values matching active target tracker indices
        const index = this.patientsList.findIndex(p => p.id === this.editingPatientId);
        if (index !== -1) {
          this.patientsList[index] = {
            ...this.patientsList[index],
            code: this.newPatient.code,
            name: this.newPatient.name,
            age: this.newPatient.age || 0,
            gender: this.newPatient.gender,
            phone: this.newPatient.phone,
            bloodGroup: this.newPatient.bloodGroup,
            address: this.newPatient.address
          };
        }
      } else {
        // Build new structured patient row entry instance
        this.patientsList.push({
          id: Date.now(),
          code: this.newPatient.code.startsWith('#') ? this.newPatient.code : '#' + this.newPatient.code,
          name: this.newPatient.name,
          age: this.newPatient.age || 0,
          gender: this.newPatient.gender,
          phone: this.newPatient.phone,
          bloodGroup: this.newPatient.bloodGroup,
          address: this.newPatient.address
        });
      }

      // Reset configurations and clear modal constraints
      this.newPatient = { code: '', name: '', age: null, gender: 'Male', phone: '', bloodGroup: 'A+', address: '' };
      this.isEditMode = false;
      this.editingPatientId = null;

      const modalCloseBtn = document.getElementById('closeModalBtn');
      if (modalCloseBtn) modalCloseBtn.click();
    }
  }

  deletePatient(id: number): void {
    if (confirm('Are you sure you want to permanently remove this patient profile record?')) {
      this.patientsList = this.patientsList.filter(p => p.id !== id);
    }
  }
}