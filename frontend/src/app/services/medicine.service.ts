import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const toDate = (d: any) => (d ? String(d).substring(0, 10) : '');

@Injectable({ providedIn: 'root' })
export class MedicineService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/medicines`).pipe(
      map(rows => rows.map(r => ({
        ...r,
        expire: toDate(r.expire),
        mfg: toDate(r.mfg),
      })))
    );
  }

  add(medicine: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/medicines`, medicine);
  }

  update(id: number, medicine: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/medicines/${id}`, medicine);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/medicines/${id}`);
  }
}
