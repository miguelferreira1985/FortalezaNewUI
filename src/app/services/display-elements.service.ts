import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DisplayElementsService {

  public location;

  constructor( private route: Router) {

      this.location = route.url;

   }

   getPageDisplayed() {
    return this.location;
  }

}
