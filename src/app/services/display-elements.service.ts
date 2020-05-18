import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DisplayElementsService {

  public location;

  constructor(private _router: Router) {

      this.location = _router.url;

   }

   getPageDisplayed() {
    return this.location;
  }
}
