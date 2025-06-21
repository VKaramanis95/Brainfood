import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CompanyPlan } from './company-plan.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyPlanService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

 getPlansByCompany(companyID: number): Observable<CompanyPlan[]> {
  return this.http.get<CompanyPlan[]>(`${this.apiUrl}/companyplans?companyID=${companyID}`);
}

getAllPlans(): Observable<CompanyPlan[]> {
  return this.http.get<CompanyPlan[]>(`${this.apiUrl}/companyplans`);
}

}
