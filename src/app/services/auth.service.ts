import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../shared/models/user.model';
import { map } from 'rxjs/operators';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Injectable({
    providedIn: 'root'
})

export class AuthService{

    private url = 'http://localhost:51551';

    private reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded','No-Auth':'True' });

    userToken: string;
    tokenExpires: string;

    userData: string;

    expirationDate: Date;
    currentDate: Date;

    constructor( private http: HttpClient) {}

    logOut() {
        localStorage.clear();
    }

    login( user: UserModel ) {

        this.userData = `username=${ user.email}&password=${ user.password }&grant_type=password`;

        return this.http.post(
            `${ this.url }/token`, this.userData, { headers: this.reqHeader}
        ).pipe(
            map( resp => {
                this.saveTokenInfo( resp[ 'access_token' ], resp['.expires'] );
                return resp;
            })
        );
    }

    private saveTokenInfo( idToken: string, tokenExpires: string) {
        this.userToken = idToken;
        this.tokenExpires = tokenExpires;
        localStorage.setItem('token', idToken);
        localStorage.setItem('tokenExpiration', tokenExpires);
    }

    readToken() {

        if ( localStorage.getItem('token') ){
            this.userToken = localStorage.getItem('token');
        }else{
            this.userToken = '';
        }
    }

    isAuthenticated(): boolean {
        if ( localStorage.getItem('token') != null ){
            this.currentDate = new Date();
            this.expirationDate = new Date(localStorage.getItem('tokenExpiration'));
            if ( this.expirationDate
                > this.currentDate ){
                console.log('Entre en la fecha');
                return true;
            }
        }else{
            return false;
        }
    }
}


