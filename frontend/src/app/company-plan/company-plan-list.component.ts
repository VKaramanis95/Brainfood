import { Component, OnInit } from '@angular/core';
import { CompanyPlanService } from '../company-plan/company-plan.service';
import { CompanyPlan } from '../company-plan/company-plan.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-company-plan-list',
  templateUrl: './company-plan-list.component.html',
  imports:[CommonModule]
})
export class CompanyPlanListComponent implements OnInit {
  plans: CompanyPlan[] = [];
  companyID = 0;

constructor(
  private planService: CompanyPlanService,
  private router: Router 
) {}

  ngOnInit(): void {
  this.planService.getAllPlans().subscribe({
    next: (plans) => {
      console.log('Plans loaded:', plans);
      this.plans = plans;
    },
    error: (err) => {
      console.error('Error loading plans', err);
    }
  });
  
}

goToCompanies() {
  this.router.navigate(['/company']);
}
goToPlans() {
  this.router.navigate(['/plans']);
}


loadPlans() {
  if (this.companyID && this.companyID > 0) {
    this.planService.getPlansByCompany(this.companyID).subscribe((plans: CompanyPlan[]) => {
      this.plans = plans;
    });
  } else {
    this.planService.getAllPlans().subscribe((plans: CompanyPlan[]) => {
      this.plans = plans;
    });
  }
}


}
