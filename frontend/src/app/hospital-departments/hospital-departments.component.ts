import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hospital-departments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hospital-departments.component.html',
  styleUrls: ['./hospital-departments.component.scss']
})
export class HospitalDepartmentsComponent implements OnInit {

  departmentsList = [
    { id: 1, code: '#DEP-01', name: 'Cardiology', head: 'Dr. Sarah Magdy', status: 'Active' },
    { id: 2, code: '#DEP-02', name: 'Pediatrics', head: 'Dr. Mark Michael', status: 'Active' },
    { id: 3, code: '#DEP-03', name: 'Neurology', head: 'Dr. John Doe', status: 'Inactive' }
  ];

  newDepartment = { code: '', name: '', head: '', status: 'Active' };

  isEditMode: boolean = false;
  editingDeptId: number | null = null;

  constructor() {}

  ngOnInit(): void {}

  openAddModal(): void {
    this.isEditMode = false;
    this.newDepartment = { code: '', name: '', head: '', status: 'Active' };
  }

  openEditModal(dept: any): void {
    this.isEditMode = true;
    this.editingDeptId = dept.id;
    this.newDepartment = { ...dept };
  }

  saveDepartment(): void {
    if (this.newDepartment.code && this.newDepartment.name && this.newDepartment.head) {
      if (this.isEditMode && this.editingDeptId !== null) {
        const index = this.departmentsList.findIndex(d => d.id === this.editingDeptId);
        if (index !== -1) {
          this.departmentsList[index] = {
            ...this.departmentsList[index],
            code: this.newDepartment.code,
            name: this.newDepartment.name,
            head: this.newDepartment.head,
            status: this.newDepartment.status
          };
        }
      } else {
        this.departmentsList.push({
          id: Date.now(),
          code: this.newDepartment.code.startsWith('#') ? this.newDepartment.code : '#' + this.newDepartment.code,
          name: this.newDepartment.name,
          head: this.newDepartment.head,
          status: this.newDepartment.status
        });
      }

      this.newDepartment = { code: '', name: '', head: '', status: 'Active' };
      this.isEditMode = false;
      this.editingDeptId = null;

      const modalCloseBtn = document.getElementById('closeModalBtn');
      if (modalCloseBtn) modalCloseBtn.click();
    }
  }

  deleteDepartment(id: number): void {
    if (confirm('Are you sure you want to delete this department entry?')) {
      this.departmentsList = this.departmentsList.filter(d => d.id !== id);
    }
  }
}