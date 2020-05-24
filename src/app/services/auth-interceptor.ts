import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AuthInterceptorService implements HttpInterceptor {

    token: string = localStorage.getItem('token');

    constructor( private router: Router) {}

    intercept( req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let request = req;

        if (this.token) {
            request = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${ this.token }`
                }
            });
         }
        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse) => {
                if (err.status === 401) {
                    this.router.navigateByUrl('/login');
                    localStorage.clear();
                }
                return throwError( err );
            })
        );
    }
}
