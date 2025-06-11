import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { deleteAccount } from '../../../../back-cesizen/src/controllers/auth.controller';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

 registerAndLogin(credentials: { email: string; password: string }): Observable<any> {
  return this.http.post<{ token: string }>(`${this.apiUrl}/register`, credentials).pipe(
    tap(res => {
      if (res.token) {
        localStorage.setItem(this.tokenKey, res.token);
      }
    })
  );
}



  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials).pipe(
      tap(res => localStorage.setItem(this.tokenKey, res.token))
    );
  }

  isLoggedIn(): boolean {
  return !!this.getToken();
}


  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUser(): { email: string; role: string } | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return { email: payload.email, role: payload.role };
  }

  isAdmin(): boolean {
    return this.getUser()?.role === 'admin';
  }

  updatePassword(newPassword: string): Observable<any>{
    return this.http.put(`${this.apiUrl}/update-password`, { newPassword }, {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    })
  }

  deleteAccount(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-account`, {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    })
  }

  createUserByAdmin(data: { email: string; password: string; role: string }): Observable<any> {
  return this.http.post(`${this.apiUrl}/admin/create-user`, data, {
    headers: { Authorization: `Bearer ${this.getToken()}` }
  });
  }

  getAllUsers(): Observable<any> {
  return this.http.get(`${this.apiUrl}/admin/users`, {
    headers: { Authorization: `Bearer ${this.getToken()}` }
  });
}

updateUserRole(userId: string, role: string): Observable<any> {
  return this.http.put(`${this.apiUrl}/admin/users/role`, { userId, role }, {
    headers: { Authorization: `Bearer ${this.getToken()}` }
  });
}

deleteUser(userId: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/admin/users/${userId}`, {
    headers: { Authorization: `Bearer ${this.getToken()}` }
  });
}

createStressEvent(event: { label: string; points: number }): Observable<any> {
  return this.http.post(`${this.apiUrl}/admin/stress`, event, {
    headers: { Authorization: `Bearer ${this.getToken()}` }
  });
}

deleteStressEvent(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/admin/stress/${id}`, {
    headers: { Authorization: `Bearer ${this.getToken()}` }
  });
}


}
