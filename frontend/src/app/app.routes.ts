import { Routes } from '@angular/router';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyFormComponent } from './company/company-form/company-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'company', pathMatch: 'full' },
  { path: 'company', component: CompanyListComponent },
  { path: 'company/create', component: CompanyFormComponent },
  { path: 'company/edit/:id', component: CompanyFormComponent },
];
