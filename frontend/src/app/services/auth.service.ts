import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}


  // Register
  register(userData: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/register`,
      userData
    );
  }


  // Login
  login(loginData:any): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/login`,
      loginData
    );

  }


  // هل عامل Login؟
  isLoggedIn(): boolean {

    return !!this.getToken();

  }


  // تخزين التوكن
  storeSession(token:string, role:string):void {

    localStorage.setItem('token', token);
    localStorage.setItem('role', role);

  }


  getRole():string|null {

    return localStorage.getItem('role');

  }


  getToken():string|null {

    return localStorage.getItem('token');

  }


  clearSession():void {

    localStorage.removeItem('token');
    localStorage.removeItem('role');

  }

}