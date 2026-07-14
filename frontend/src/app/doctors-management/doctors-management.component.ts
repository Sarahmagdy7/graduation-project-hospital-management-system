import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctors-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctors-management.component.html',
  styleUrls: ['./doctors-management.component.scss']
})
export class DoctorsManagementComponent implements OnInit {

  doctorsList = [
    { id: 1, name: 'Dr. Sarah Magdy', dept: 'Cardiology', email: 'sarah.magdy@medilab.com', phone: '012801990', status: 'Active', photo: 'assets/img/doctor-placeholder.jpg' },
    { id: 2, name: 'Dr. Mark Michael', dept: 'Pediatrics', email: 'mark.m@medilab.com', phone: '0128888444', status: 'Active', photo: 'assets/img/doctor-placeholder2.jpg' }
  ];

  newDoctor = { name: '', dept: 'Cardiology', email: '', phone: '', status: 'Active' };
  
  // Track editing mode state
  isEditMode: boolean = false;
  editingDoctorId: number | null = null;

  constructor() {}

  ngOnInit(): void {}

  // Open modal for adding a new doctor
  openAddModal(): void {
    this.isEditMode = false;
    this.newDoctor = { name: '', dept: 'Cardiology', email: '', phone: '', status: 'Active' };
  }

  // Open modal and pre-fill data for editing
  openEditModal(doctor: any): void {
    this.isEditMode = true;
    this.editingDoctorId = doctor.id;
    this.newDoctor = { ...doctor }; // Copy doctor data into the form object
  }

  // Handle both saving new profiles and updating existing ones
  saveDoctor(): void {
    if (this.newDoctor.name && this.newDoctor.email) {
      if (this.isEditMode && this.editingDoctorId !== null) {
        // Update existing doctor profile in array
        const index = this.doctorsList.findIndex(doc => doc.id === this.editingDoctorId);
        if (index !== -1) {
          this.doctorsList[index] = {
            ...this.doctorsList[index],
            name: this.newDoctor.name,
            dept: this.newDoctor.dept,
            email: this.newDoctor.email,
            phone: this.newDoctor.phone,
            status: this.newDoctor.status
          };
        }
      } else {
        // Add new doctor profile to array
        this.doctorsList.push({
          id: Date.now(),
          name: this.newDoctor.name,
          dept: this.newDoctor.dept,
          email: this.newDoctor.email,
          phone: this.newDoctor.phone,
          status: this.newDoctor.status,
          photo: 'assets/img/doctor-placeholder.jpg'
        });
      }

      // Reset form view properties
      this.newDoctor = { name: '', dept: 'Cardiology', email: '', phone: '', status: 'Active' };
      this.isEditMode = false;
      this.editingDoctorId = null;
      
      const modalCloseBtn = document.getElementById('closeModalBtn');
      if (modalCloseBtn) modalCloseBtn.click();
    }
  }

  deleteDoctor(id: number): void {
    if (confirm('Are you sure you want to delete this doctor profile?')) {
      this.doctorsList = this.doctorsList.filter(doc => doc.id !== id);
    }
  }
}