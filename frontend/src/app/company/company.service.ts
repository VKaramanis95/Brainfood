import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Company {
  ID?: number;
  Name: string;
  VAT?: string;
  ERPcode?: string;
  BillingDOY?: string;
  BillingCompanyName?: string;
  BillingAddress1?: string;
  BillingAddress2?: string;
  BillingCity?: string;
  BillingCountry?: number;
  BillingPhone?: string;
  BillingBankAccount?: string;
  MotherCompanyID?: number;
}

@Injectable({ providedIn: 'root' })
export class CompanyService {
  private apiUrl = '/api/companies';

  constructor(private http: HttpClient) {}

  getCompanies(filters?: any): Observable<any> {
    let params = new HttpParams();

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          // Convert to string for HttpParams
          params = params.set(key, String(value));
        }
      });
    }

    return this.http.get(this.apiUrl, { params });
  }

  getCompany(id: number): Observable<Company> {
    return this.http.get<Company>(`${this.apiUrl}/${id}`);
  }

  createCompany(data: Company): Observable<Company> {
    return this.http.post<Company>(this.apiUrl, data);
  }

  updateCompany(id: number, data: Company): Observable<Company> {
    return this.http.put<Company>(`${this.apiUrl}/${id}`, data);
  }

  deleteCompany(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
