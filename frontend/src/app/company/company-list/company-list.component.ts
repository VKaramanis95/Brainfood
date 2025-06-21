import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { CompanyPlanService } from '../../company-plan/company-plan.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyPlan } from '../../company-plan/company-plan.model';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule,NgxPaginationModule],
  templateUrl: './company-list.component.html',
})
export class CompanyListComponent implements OnInit {
  companies: any[] = [];
  companyPlanStatuses: { [companyID: number]: string } = {};

currentPage: number = 1;
  itemsPerPage: number = 5;
  
  filters = {
    Name: '',
    VAT: ''
  };

  sortField: string = '';
  sortAsc: boolean = true;

 

  constructor(
    private companyService: CompanyService,
    private planService: CompanyPlanService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCompanies();
    this.loadPlanStatuses();
  }

  loadCompanies(): void {
    const params = {
      Name: this.filters.Name,
      VAT: this.filters.VAT,
      sortBy: this.sortField,
      sortOrder: this.sortAsc ? 'asc' : 'desc',
      page: this.currentPage.toString()
    };

    this.companyService.getCompanies(params).subscribe({
      next: (res) => {
        this.companies = res.data;       
      },
      error: (err) => {
        console.error('Failed to load companies:', err);
      }
    });
  }

  loadPlanStatuses(): void {
    this.planService.getAllPlans().subscribe((plans: CompanyPlan[]) => {
      const today = new Date();
      const statusMap: { [companyID: number]: string } = {};

      plans.forEach(plan => {
        const endDate = plan.end_date ? new Date(plan.end_date) : null;
        const companyID = plan.companyID;

        if (!statusMap[companyID]) {
          statusMap[companyID] = 'Έληξε';
        }

        if (endDate && endDate > today) {
          statusMap[companyID] = 'Ενεργό';
        }
      });

      this.companyPlanStatuses = statusMap;
    });
  }

  getPlanStatus(companyID: number): string {
    return this.companyPlanStatuses[companyID] || '—';
  }

  openAddCompanyForm(): void {
    this.router.navigate(['/company/create']);  
  }

  search(): void {
    this.currentPage = 1;
    this.loadCompanies();
  }

  sort(field: string): void {
    if (this.sortField === field) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortField = field;
      this.sortAsc = true;
    }
    this.loadCompanies();
  }


  delete(id: number): void {
    if (confirm('Σίγουρα θέλεις να διαγράψεις την εταιρεία;')) {
      this.companyService.deleteCompany(id).subscribe(() => this.loadCompanies());
    }
  }
}
