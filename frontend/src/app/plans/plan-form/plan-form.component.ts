import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,RouterModule } from '@angular/router';
import { SocialAIPlanService, Plan } from '../services/social-ai-plan.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  imports: [FormsModule,CommonModule,RouterModule]
})
export class PlanFormComponent implements OnInit {
  plan: Plan = {
    Name: '',
    allowsocialaccounts: 0,
    allowpostspermonth: 0,
    allowswitchboardtemplates: 0,
    allowinstcarousels: 0,
    allowcreatomatevideospermonth: 0,
    allowxxx: 0,
    initialpricemonth: 0,
    initialpricediscount: undefined
    };

  isEditMode = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private planService: SocialAIPlanService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.planService.getPlan(+id).subscribe(plan => {
        this.plan = plan;
      });
    }
  }

  save(): void {
    if (this.isEditMode) {
      this.planService.updatePlan(this.plan.ID!, this.plan).subscribe({
        next: () => this.router.navigate(['/plans']),
        error: err => {
          this.errorMessage = 'Αποτυχία ενημέρωσης πακέτου.';
          console.error(err);
        }
      });
    } else {
      this.planService.createPlan(this.plan).subscribe({
        next: () => this.router.navigate(['/plans']),
        error: err => {
          if (err.status === 422 && err.error?.message) {
            this.errorMessage = err.error.message;
          } else {
            this.errorMessage = 'Αποτυχία δημιουργίας πακέτου.';
          }
          console.error(err);
        }
      });
    }
  }
}
