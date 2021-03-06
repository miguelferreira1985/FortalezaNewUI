import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, NgForm} from '@angular/forms';
import { UserModel } from '../shared/models/user.model';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = false;
  user: UserModel = new UserModel();

  constructor( private auth: AuthService,
                private router: Router) { }

  login( form: NgForm ) {

    if ( form.invalid ){ return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere un momento...'
    });
    Swal.showLoading();

    this.auth.login( this.user )
      .subscribe( resp => {

        console.log(resp);
        Swal.close();
        this.router.navigateByUrl('/home');

      }, (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: err.error.error.message
        });
      });

  }

  ngOnInit(): void {

    console.log(localStorage.getItem('token'));

  }

}
