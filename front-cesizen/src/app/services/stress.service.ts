import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StressEvent {
  id: number;
  label: string;
  points: number;
}

@Injectable({
  providedIn: 'root'
})
export class StressService {
  private apiUrl = 'http://localhost:3000/stress';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<StressEvent[]> {
    return this.http.get<StressEvent[]>(this.apiUrl);
  }

  calculateScore(selectedIds: number[]): Observable<{ score: number; level: string }> {
    return this.http.post<{ score: number; level: string }>(`${this.apiUrl}/calculate`, {
      selectedIds
    });
  }

  
}
