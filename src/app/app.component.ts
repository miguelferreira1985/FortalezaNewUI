import { Component } from '@angular/core';
import { DisplayElementsService } from './services/display-elements.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'La Fortaleza';


  constructor( private displayElement: DisplayElementsService,
                private auth: AuthService,
                private router: Router){


  }

  location = this.displayElement.getPageDisplayed();

  isDisplayed(){
    if( location.pathname == '/login' ){
      return false;
    }else{
      return true;
    }
  }

  logOut() {
    this.auth.logOut();
    this.router.navigateByUrl('/login');
  }

}
