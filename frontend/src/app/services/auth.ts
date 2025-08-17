import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { TokenStorageService } from './token-storage';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.isAuthenticatedSubject.next(this.tokenStorage.isLoggedIn());
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login/`, credentials, httpOptions)
      .pipe(
        tap(response => {
          this.tokenStorage.saveToken(response.access);
          this.tokenStorage.saveUser(response.user);
          this.isAuthenticatedSubject.next(true);
        })
      );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register/`, userData, httpOptions)
      .pipe(
        tap(response => {
          this.tokenStorage.saveToken(response.access);
          this.tokenStorage.saveUser(response.user);
          this.isAuthenticatedSubject.next(true);
        })
      );
  }

  logout(): void {
    this.tokenStorage.signOut();
    this.isAuthenticatedSubject.next(false);
  }

  getCurrentUser(): User | null {
    return this.tokenStorage.getUser();
  }

  isLoggedIn(): boolean {
    return this.tokenStorage.isLoggedIn();
  }
}
