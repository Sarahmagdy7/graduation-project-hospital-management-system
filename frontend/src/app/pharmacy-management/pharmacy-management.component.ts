import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pharmacy-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pharmacy-management.component.html',
  styleUrls: ['./pharmacy-management.component.scss']
})
export class PharmacyManagementComponent implements OnInit {

  // Dynamic Array holding medicine stock items
  medicineList = [
    { id: 1, code: '#MED-1002', name: 'Panadol Extra', category: 'Analgesic', qty: 240, price: 50.00, status: 'In Stock' },
    { id: 2, code: '#MED-2045', name: 'Amoxicillin 500mg', category: 'Antibiotic', qty: 15, price: 120.00, status: 'Low Stock' },
    { id: 3, code: '#MED-0981', name: 'Catafast 50mg', category: 'Anti-inflammatory', qty: 0, price: 75.00, status: 'Out of Stock' }
  ];

  // Object structure for capturing medicine input fields
  newMedicine = { code: '', name: '', category: 'Analgesic', qty: 0, price: 0 };

  // Control variables for view modal operations
  isEditMode: boolean = false;
  editingMedicineId: number | null = null;

  constructor() {}

  ngOnInit(): void {}

  // Automatically update inventory statuses based on item quantity counts
  private getStatusFromQty(qty: number): string {
    if (qty === 0) return 'Out of Stock';
    if (qty <= 20) return 'Low Stock';
    return 'In Stock';
  }

  openAddModal(): void {
    this.isEditMode = false;
    this.newMedicine = { code: '', name: '', category: 'Analgesic', qty: 0, price: 0 };
  }

  openEditModal(medicine: any): void {
    this.isEditMode = true;
    this.editingMedicineId = medicine.id;
    this.newMedicine = { ...medicine };
  }

  saveMedicine(): void {
    if (this.newMedicine.code && this.newMedicine.name) {
      const computedStatus = this.getStatusFromQty(this.newMedicine.qty);

      if (this.isEditMode && this.editingMedicineId !== null) {
        // Update item fields in index
        const index = this.medicineList.findIndex(med => med.id === this.editingMedicineId);
        if (index !== -1) {
          this.medicineList[index] = {
            ...this.medicineList[index],
            code: this.newMedicine.code,
            name: this.newMedicine.name,
            category: this.newMedicine.category,
            qty: this.newMedicine.qty,
            price: this.newMedicine.price,
            status: computedStatus
          };
        }
      } else {
        // Insert new array entry
        this.medicineList.push({
          id: Date.now(),
          code: this.newMedicine.code.startsWith('#') ? this.newMedicine.code : '#' + this.newMedicine.code,
          name: this.newMedicine.name,
          category: this.newMedicine.category,
          qty: this.newMedicine.qty,
          price: this.newMedicine.price,
          status: computedStatus
        });
      }

      // Dismiss tracking states
      this.newMedicine = { code: '', name: '', category: 'Analgesic', qty: 0, price: 0 };
      this.isEditMode = false;
      this.editingMedicineId = null;

      const modalCloseBtn = document.getElementById('closeModalBtn');
      if (modalCloseBtn) modalCloseBtn.click();
    }
  }

  deleteMedicine(id: number): void {
    if (confirm('Are you sure you want to remove this medicine item from the stock register?')) {
      this.medicineList = this.medicineList.filter(med => med.id !== id);
    }
  }
}