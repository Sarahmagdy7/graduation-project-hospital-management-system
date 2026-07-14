import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patients-records',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patients-records.component.html',
  styleUrls: ['./patients-records.component.scss']
})
export class PatientsRecordsComponent implements OnInit {

  // Search input query string binder
  searchQuery: string = '';

  // Source master collection database
  patientsList = [
    { id: '#PT-4412', name: 'John Doe', lastVisit: '15 June 2026', diagnosis: 'Chronic Hypertension', bloodGroup: 'A+', details: 'Patient requires regular blood pressure monitoring. Prescribed ACE inhibitors. Recommended low-sodium diet and lifestyle modifications.' },
    { id: '#PT-0922', name: 'Ali Rizk', lastVisit: '22 June 2026', diagnosis: 'Seasonal Influenza', bloodGroup: 'O+', details: 'Presented with high fever, body aches, and cough. Advised bed rest, hydration, and prescribed antiviral medications with antipyretics.' },
    { id: '#PT-7710', name: 'Mary Smith', lastVisit: '10 May 2026', diagnosis: 'Type 2 Diabetes', bloodGroup: 'B-', details: 'HbA1c levels checked. Continuing Metformin treatment plan. Referred to nutritionist for custom diabetic dietary roadmap tracking.' }
  ];

  // Target object structural reference for modal view rendering
  selectedPatient: any = null;

  constructor() {}

  ngOnInit(): void {}

  // Getter computing real-time array filtration matches against active query patterns
  get filteredPatients() {
    return this.patientsList.filter(patient => 
      patient.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Pre-load target row content properties to modal interface layout container
  viewPatientFolder(patient: any): void {
    this.selectedPatient = patient;
  }
}