import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const toDate = (d: any) => (d ? String(d).substring(0, 10) : '');

@Injectable({ providedIn: 'root' })
export class LabService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/lab`).pipe(
      map(rows => rows.map(r => ({
        ...r,
        patientName: r.patient_name,
        doctorName: r.doctor_name,
        testName: r.test_name,
        date: toDate(r.date),
      })))
    );
  }

  add(entry: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/lab`, {
      patientName: entry.patientName,
      doctorName: entry.doctorName,
      testName: entry.testName,
      date: entry.date || null,
      observations: entry.observations,
    });
  }

  update(id: string, entry: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/lab/${id}`, {
      patientName: entry.patientName,
      doctorName: entry.doctorName,
      testName: entry.testName,
      date: entry.date || null,
      observations: entry.observations,
      status: entry.status,
    });
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/lab/${id}`);
  }
}
