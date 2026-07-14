import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-doctor-panel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './doctor-panel.component.html',
  styleUrls: ['./doctor-panel.component.scss']
})
export class DoctorPanelComponent {}