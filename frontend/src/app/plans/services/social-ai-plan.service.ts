import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Plan {
  ID?: number;
  Name: string;
  allowsocialaccounts?: number;
  allowpostspermonth?: number;
  allowswitchboardtemplates?: number;
  allowinstcarousels?: number;
  allowcreatomatevideospermonth?: number;
  allowxxx?: number;
  initialpricemonth?: number;
  initialpricediscount?: number;
}

@Injectable({ providedIn: 'root' })
export class SocialAIPlanService {
private apiUrl = '/api/companies/socialaiplans';

  constructor(private http: HttpClient) {}

  getPlans(params?: any): Observable<any> {
  let httpParams = new HttpParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        httpParams = httpParams.set(key, String(value));
      }
    });
  }
  return this.http.get('/api/socialaiplans', { params: httpParams });
}


  getPlan(id: number): Observable<Plan> {
    return this.http.get<Plan>(`${this.apiUrl}/${id}`);
  }

  createPlan(data: Plan): Observable<Plan> {
    return this.http.post<Plan>(this.apiUrl, data);
  }

  updatePlan(id: number, data: Plan): Observable<Plan> {
    return this.http.put<Plan>(`${this.apiUrl}/${id}`, data);
  }

  deletePlan(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
