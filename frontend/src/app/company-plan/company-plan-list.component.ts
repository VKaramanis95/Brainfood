import { Component, OnInit } from '@angular/core';
import { CompanyPlanService } from '../company-plan/company-plan.service';
import { CompanyPlan } from '../company-plan/company-plan.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-company-plan-list',
  standalone: true,
  templateUrl: './company-plan-list.component.html',
  imports: [CommonModule, NgxPaginationModule],
})
export class CompanyPlanListComponent implements OnInit {
  plans: CompanyPlan[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 5;

  companyID = 0;
  sortField: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(
    private planService: CompanyPlanService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPlans();
  }

  sortBy(field: string) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.sortPlans();
  }
  sortPlans() {
    this.plans = [...this.plans].sort((a, b) => {
      let valA: any;
      let valB: any;

      switch (this.sortField) {
        case 'company':
          valA = a.company?.Name || '';
          valB = b.company?.Name || '';
          break;
        case 'planName':
          valA = a.plan?.Name || '';
          valB = b.plan?.Name || '';
          break;
        case 'start_date':
          valA = new Date(a.start_date || '');
          valB = new Date(b.start_date || '');

          break;
        case 'end_date':
          valA = new Date(a.end_date || '');
          valB = new Date(b.end_date || '');
          break;
        default:
          return 0;
      }

      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  loadPlans() {
    if (this.companyID && this.companyID > 0) {
      this.planService.getPlansByCompany(this.companyID).subscribe({
        next: (plans) => (this.plans = plans),
        error: (err) => console.error('Error loading company plans', err),
      });
    } else {
      this.planService.getAllPlans().subscribe({
        next: (plans) => {
          console.log('Plans loaded:', plans);
          this.plans = plans;
        },
        error: (err) => {
          console.error('Error loading plans', err);
        },
      });
    }
  }

  goToCompanies() {
    this.router.navigate(['/company']);
  }

  goToPlans() {
    this.router.navigate(['/plans']);
  }
}
