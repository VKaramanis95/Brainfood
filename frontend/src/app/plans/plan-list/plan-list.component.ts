import { Component, OnInit } from '@angular/core';
import { SocialAIPlanService, Plan } from '../services/social-ai-plan.service';
import { Router,RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  imports: [FormsModule,CommonModule,RouterModule]
})
export class PlanListComponent implements OnInit {
  plans: Plan[] = [];
  filters = { Name: '' };
  sortField = '';
  sortAsc = true;
  currentPage = 1;
  totalPages = 1;

  constructor(private planService: SocialAIPlanService, private router: Router) {}
   goToCompanies() {
    this.router.navigate(['/company']);
  }

  ngOnInit(): void {
    this.loadPlans();
  }

  loadPlans(): void {
    const params = {
      Name: this.filters.Name,
      sortBy: this.sortField,
      sortOrder: this.sortAsc ? 'asc' : 'desc',
      page: this.currentPage.toString()
    };

    this.planService.getPlans(params).subscribe({
      next: (res) => {
        this.plans = res.data;
        this.totalPages = res.last_page;
      },
      error: (err) => {
        console.error('Failed to load plans:', err);
      }
    });
  }

  search(): void {
    this.currentPage = 1;
    this.loadPlans();
  }

  sort(field: string): void {
    if (this.sortField === field) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortField = field;
      this.sortAsc = true;
    }
    this.loadPlans();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPlans();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPlans();
    }
  }

  delete(id: number): void {
    if (confirm('Σίγουρα θέλεις να διαγράψεις το πακέτο;')) {
      this.planService.deletePlan(id).subscribe(() => this.loadPlans());
    }
  }

  goToAdd(): void {
    this.router.navigate(['/plans/create']);
  }

  goToEdit(id: number): void {
    this.router.navigate(['/plans/edit', id]);
  }
}
