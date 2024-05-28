import { Injectable } from '@angular/core';
import {Plaatje} from './plaatje';
import {Onderwerp} from './onderwerp';
import {datums} from '../assets/datums';
import {nrs} from '../assets/nrs';
import {onderwerpen} from '../assets/onderwerpen';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private baseUrl = './assets/images';
  public plaatjeList: Array<Plaatje>=[];
  public ondewerpList: Array<Onderwerp>=onderwerpen;

  constructor() {
    let baseUrl = this.baseUrl;
    let list= this.plaatjeList;
    nrs.forEach(function (nr: number) {
      list.push({id: nr,
        name: datums[nr],
        photo: `${baseUrl}/plaatje-${nr}.jpg`
        }
      )
    });
  }

  getAllPlaatjes(): Plaatje[] {
    return this.plaatjeList;
  }
  getAllOnderwerpen(): Onderwerp[]{
    return this.ondewerpList;
  }

  getPlaatjeById(id: number): Plaatje | undefined {
    return this.plaatjeList.find((plaatje) => plaatje.id === id);
  }
  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`,
    );
  }
}
