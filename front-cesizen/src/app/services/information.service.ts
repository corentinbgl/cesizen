import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Information {
  id: number;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class InformationService {
  private apiUrl = 'http://localhost:3000/infos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Information[]> {
    return this.http.get<Information[]>(this.apiUrl);
  }

  getBySlug(slug: string): Observable<Information> {
    return this.http.get<Information>(`${this.apiUrl}/${slug}`);
  }
}
