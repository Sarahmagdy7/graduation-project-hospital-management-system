import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const toDate = (d: any) => (d ? String(d).substring(0, 10) : '');

@Injectable({ providedIn: 'root' })
export class PatientService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/patients`).pipe(
      map(rows => rows.map(r => ({
        ...r,
        firstName: r.first_name,
        lastName: r.last_name,
        dob: toDate(r.dob),
      })))
    );
  }

  add(patient: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/patients`, {
      firstName: patient.firstName,
      lastName: patient.lastName,
      nic: patient.nic,
      email: patient.email,
      mobile: patient.mobile,
      dob: patient.dob || null,
      gender: patient.gender,
      address: patient.address,
    });
  }

  update(id: number, patient: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/patients/${id}`, {
      firstName: patient.firstName,
      lastName: patient.lastName,
      nic: patient.nic,
      email: patient.email,
      mobile: patient.mobile,
      dob: patient.dob || null,
      gender: patient.gender,
      address: patient.address,
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/patients/${id}`);
  }
}
