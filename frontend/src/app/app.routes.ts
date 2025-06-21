import { Routes } from '@angular/router';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyFormComponent } from './company/company-form/company-form.component';
import { PlanListComponent } from './plans/plan-list/plan-list.component';
import { PlanFormComponent } from './plans/plan-form/plan-form.component';
import { CompanyPlanListComponent } from './company-plan/company-plan-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'company', pathMatch: 'full' },
  { path: 'company', component: CompanyListComponent },
  { path: 'company/create', component: CompanyFormComponent },
  { path: 'company/edit/:id', component: CompanyFormComponent },


  { path: '', redirectTo: 'plans', pathMatch: 'full' },
  { path: 'plans', component: PlanListComponent },
  { path: 'plans/create', component: PlanFormComponent },
  { path: 'plans/edit/:id', component: PlanFormComponent },

  

  {
    path: 'companyplans',
    component: CompanyPlanListComponent
  },
  {
    path: 'company/:id/plans',  // For history
    component: CompanyPlanListComponent
  },
  {
    path: '',
    redirectTo: 'companyplans',
    pathMatch: 'full'
  }
];

