import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // 👈 مهم جداً لعمل الـ HTTP Requests
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // 👈 دي بتخلي الـ Service متاحة في المشروع كله علطول
})
export class SignupService {

  // الـ URL بتاع الـ Backend بتاعك
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // دالة إرسال بيانات المريض الجديد للسيرفر
  registerPatient(patientData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, patientData);
  }
}