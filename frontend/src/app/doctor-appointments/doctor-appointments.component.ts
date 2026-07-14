import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-appointments.component.html',
  styleUrls: ['./doctor-appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  // Dynamic Array holding appointment entries
  appointmentsList = [
    { id: 1, patientName: 'John Doe', age: 34, gender: 'Male', timeSlot: '10:30 AM', status: 'Confirmed', prescription: '' },
    { id: 2, patientName: 'Ali Rizk', age: 12, gender: 'Male', timeSlot: '11:15 AM', status: 'Pending', prescription: '' },
    { id: 3, patientName: 'Mary Smith', age: 28, gender: 'Female', timeSlot: '12:00 PM', status: 'Canceled', prescription: '' }
  ];

  // Temporary container state objects for the selected context
  selectedPatient: any = null;
  prescriptionText: string = '';

  constructor() {}

  ngOnInit(): void {}

  // Open modal and load existing context record metadata if present
  openPrescriptionModal(appointment: any): void {
    this.selectedPatient = appointment;
    this.prescriptionText = appointment.prescription || '';
  }

  // Commit form updates back to the targeted dynamic list item
  savePrescription(): void {
    if (this.selectedPatient) {
      const index = this.appointmentsList.findIndex(a => a.id === this.selectedPatient.id);
      if (index !== -1) {
        this.appointmentsList[index].prescription = this.prescriptionText;
        // Optionally update status to Confirmed or Checked if required upon action
        if (this.appointmentsList[index].status === 'Pending') {
          this.appointmentsList[index].status = 'Confirmed';
        }
      }

      alert(`Prescription successfully saved for ${this.selectedPatient.patientName}!`);
      
      // Reset layout configurations and dismiss modal view
      this.selectedPatient = null;
      this.prescriptionText = '';
      
      const modalCloseBtn = document.getElementById('closeModalBtn');
      if (modalCloseBtn) modalCloseBtn.click();
    }
  }
}