import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/invoices`);
  }

  add(invoice: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/invoices`, invoice);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/invoices/${id}`);
  }
}
