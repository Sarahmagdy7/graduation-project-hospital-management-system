import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const toDate = (d: any) => (d ? String(d).substring(0, 10) : '');

@Injectable({ providedIn: 'root' })
export class StaffService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/staff`).pipe(
      map(rows => rows.map(r => ({
        ...r,
        firstName: r.first_name,
        lastName: r.last_name,
        dob: toDate(r.dob),
      })))
    );
  }

  add(staff: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/staff`, {
      firstName: staff.firstName,
      lastName: staff.lastName,
      role: staff.role,
      gender: staff.gender,
      email: staff.email,
      mobile: staff.mobile,
      address: staff.address,
      nic: staff.nic,
      dob: staff.dob || null,
      password: staff.password,
    });
  }

  update(id: number, staff: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/staff/${id}`, {
      firstName: staff.firstName,
      lastName: staff.lastName,
      role: staff.role,
      gender: staff.gender,
      email: staff.email,
      mobile: staff.mobile,
      address: staff.address,
      nic: staff.nic,
      dob: staff.dob || null,
      password: staff.password,
    });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/staff/${id}`);
  }
}
