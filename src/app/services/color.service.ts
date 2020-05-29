import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Color } from '../shared/models/color.model';

@Injectable()
export class ColorService {

    private baseUrl = 'http://localhost:51551/api/color';

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    };

    list: Color[];

    constructor( private http: HttpClient ) {}

    getActiveColor() {
        return this.http.get(`${ this.baseUrl }/GetActiveColors`);
    }

    updateColor(color: Color) {
        return this.http.put(`${ this.baseUrl }/UpdateColor`, color);
    }

    deleteColor(id: number) {
        return this.http.delete(`${ this.baseUrl }/DeleteColor?id=${ id }`);
    }

}