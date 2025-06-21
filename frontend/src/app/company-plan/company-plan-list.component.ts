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

  constructor(
    private planService: CompanyPlanService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPlans();
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
