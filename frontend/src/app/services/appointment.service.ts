import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const toDate = (d: any) => (d ? String(d).substring(0, 10) : '');

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/appointments`).pipe(
      map(rows => rows.map(r => ({
        ...r,
        firstName: r.first_name,
        lastName: r.last_name,
        dob: toDate(r.dob),
        date: toDate(r.date),
      })))
    );
  }

  add(appt: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/appointments`, appt);
  }

  update(id: number, appt: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/appointments/${id}`, appt);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/appointments/${id}`);
  }
}
