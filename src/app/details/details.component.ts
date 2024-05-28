import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {HomeService} from '../home';
import {Plaatje} from '../plaatje';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img
        class="listing-photo"
        [src]="plaatje?.photo"
        alt="plaatje van {{ plaatje?.name }}"
        crossorigin
      />
      <section class="listing-description">
        <h2 class="listing-heading">{{ plaatje?.name }}</h2>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">{{ plaatje?.id }}</h2>
        <ul>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">mailinglist</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">naam</label>
          <input id="first-name" type="text" formControlName="firstName" />
          <label for="last-name">achternaam</label>
          <input id="last-name" type="text" formControlName="lastName" />
          <label for="email">email</label>
          <input id="email" type="email" formControlName="email" />
          <button type="submit" class="primary">aanvragen</button>
        </form>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  homeService = inject(HomeService);
  plaatje: Plaatje | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });
  constructor() {
    const plaatjeId = parseInt(this.route.snapshot.params['id'], 10);
    this.plaatje = this.homeService.getPlaatjeById(plaatjeId);
  }
  submitApplication() {
    this.homeService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    );
  }
}