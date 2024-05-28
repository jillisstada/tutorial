import { Component, Input } from '@angular/core';
import {CommonModule} from '@angular/common';
import {Plaatje} from '../plaatje';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-plaatje',
  standalone: true,
  imports: [CommonModule,RouterModule],
  template: `
    <section class="listing">
      <img
        class="listing-photo"
        [src]="plaatje.photo"
        alt="plaatje van datum {{ plaatje.name }}"
        crossorigin
      />
      <h2 class="listing-heading">{{ plaatje.name }}</h2>
      <a [routerLink]="['/details', plaatje.id]">meer  {{ plaatje.id }}</a>
    </section>
  `,
 styleUrls: ['./plaatje.component.css'],
})
export class PlaatjeComponent {
  @Input() plaatje!: Plaatje;
}
