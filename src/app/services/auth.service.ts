import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../shared/models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class AuthService{

    private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
    private apiKey = 'AIzaSyAk0I3gQ92CAmnzmsvyILz93Bnl5eDLrVg';

    userToken: string;

    // Crear nuevo Usuario
    // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]


    // Loguear usuario
    //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

    constructor( private http: HttpClient) {}

    logOut() {
        localStorage.clear()
    }

    login( user: UserModel ) {

        const authData = {
            ...user,
            returnSecureToken: true
        };

        return this.http.post(
            `${ this.url }signInWithPassword?key=${ this.apiKey }`,
            authData
        ).pipe(
            map( resp => {
                this.saveToken( resp['idToken'] );
                return resp;
            })
        );
    }

    addNewUser( user: UserModel ) {}

    private saveToken( idToken: string) {
        this.userToken = idToken;
        localStorage.setItem('token', idToken);
    }

    readToken() {

        if ( localStorage.getItem('token') ){
            this.userToken = localStorage.getItem('token');
        }else{
            this.userToken = '';
        }
    }

    isAuthenticated(): boolean {
        console.log(localStorage.getItem('token'));
        return this.userToken.length > 2;
    }
}


