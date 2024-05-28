import { Component , inject} from '@angular/core';
import {CommonModule} from '@angular/common'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {PlaatjeComponent} from '../plaatje/plaatje.component';
import {Plaatje} from '../plaatje';
import {HomeService} from '../home';
import {Onderwerp} from '../onderwerp';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PlaatjeComponent, MatFormFieldModule, MatInputModule, MatSelectModule],
  template: `
  <section>
      <label>onderwerp</label>
      <select class= "button"  #filter (change)="filterResults(filter.value)">
        <option value='keuze' selected>onderwerp</option>
        <option value='corona'>corona</option>
        <option value='dieren'>dieren</option>
        <option value='godsdienst'>godsdienst</option>
        <option value='klimaat'>klimaat</option>
        <option value='koningshuis'>koningshuis</option>
        <option value='kunst'>kunst</option>
        <option value='metoo'>me too</option>
        <option value='migratie'>migratie</option>
        <option value='misdaad'>misdaad</option>
        <option value='nieuwslezer'>nieuwslezers</option>
        <option value='oekraine'>oekraine</option>
        <option value='ongeluk'>ongeluk</option>
        <option value='palestina'>palestina</option>
        <option value='politiek'>politiek</option>
        <option value='sex'>sex</option>
        <option value='speelgoed'>speelgoed</option>
        <option value='sport'>sport</option>
        <option value=''></option>
      </select>
  </section>
    <section class="results">
      <app-plaatje
        *ngFor="let plaatje of filteredplaatjeList"
        [plaatje]="plaatje"
      ></app-plaatje>
    </section>
`,
styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  plaatjeList: Plaatje[] =[]
  homeService: HomeService = inject(HomeService);
  filteredplaatjeList: Plaatje[] =[];
  onderwerpList: Onderwerp[]=[];


  constructor() {
    this.plaatjeList = this.homeService.getAllPlaatjes();
    this.filteredplaatjeList = this.plaatjeList;
    this.onderwerpList = this.onderwerpList;
  }
  filterResults(text: string) {
    console.log(`filterResults ${text}`);
    this.filteredplaatjeList = [];
    if (!text) {
      this.filteredplaatjeList = this.plaatjeList;
      return;
    }
    let onderwerpen= this.homeService.getAllOnderwerpen();

    let nrs: number[]=[];
    let list: Plaatje[] = this.plaatjeList;
    let result = this.filteredplaatjeList;
    onderwerpen.forEach(function (onderwerp){
       if (onderwerp['onderwerp']==text){
          nrs = onderwerp['z_nrs'];
      }});

    list.forEach(function(plaatje){
        if (nrs.includes(plaatje['id'])){
          console.log(plaatje['id']);
          result.push(plaatje);
          
        }
    })
    console.log(result);
    this.filteredplaatjeList = result;
  }
  }
 
