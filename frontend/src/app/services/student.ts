import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenStorageService } from './token-storage';

export interface Student {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  student_id: string;
  major: string;
  year: string;
  gpa?: number;
  created_at?: string;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = `${environment.apiUrl}/students/`;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.tokenStorage.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}${id}/`, { headers: this.getAuthHeaders() });
  }

  createStudent(student: Omit<Student, 'id' | 'created_at' | 'updated_at'>): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student, { headers: this.getAuthHeaders() });
  }

  updateStudent(id: number, student: Partial<Student>): Observable<Student> {
    return this.http.patch<Student>(`${this.apiUrl}${id}/`, student, { headers: this.getAuthHeaders() });
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`, { headers: this.getAuthHeaders() });
  }
}
