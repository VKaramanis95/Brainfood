import { Component, OnInit } from '@angular/core';
import { CompanyService, Company } from '../company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  imports: [CommonModule, FormsModule],
})
export class CompanyFormComponent implements OnInit {
  company: Company = { Name: '', VAT: '', ERPcode: '' };
  isEdit = false;
  errorMessage = '';

  constructor(
    private service: CompanyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.service.getCompany(+id).subscribe(data => this.company = data);
    }
  }

  save(): void {
    const request = this.isEdit
      ? this.service.updateCompany(this.company.ID!, this.company)
      : this.service.createCompany(this.company);

    request.subscribe({
      next: () => this.router.navigate(['/company']),
      error: err => {
        if (err.status === 422 && err.error.errors?.VAT) {
          this.errorMessage = 'Το ΑΦΜ υπάρχει ήδη!';
        } else {
          this.errorMessage = 'Σφάλμα κατα την αποθήκευση.';
        }
      }
    });
  }
  openAddCompanyForm() {
    
    this.router.navigate(['/company/add']);  

  }

}
