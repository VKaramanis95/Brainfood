import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './company-list.component.html',
})
export class CompanyListComponent implements OnInit {
  companies: any[] = [];

  filters = {
    Name: '',
    VAT: ''
  };

  sortField: string = '';
  sortAsc: boolean = true;

  currentPage = 1;
  totalPages = 1;

  constructor(private companyService: CompanyService, private router: Router) {}

  ngOnInit(): void {
    this.loadCompanies();
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
        this.totalPages = res.last_page; 
      },
      error: (err) => {
        console.error('Failed to load companies:', err);
      }
    });
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

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadCompanies();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCompanies();
    }
  }

  delete(id: number): void {
    if (confirm('Σίγουρα θέλεις να διαγράψεις την εταιρεία;')) {
      this.companyService.deleteCompany(id).subscribe(() => this.loadCompanies());
    }
  }
}
