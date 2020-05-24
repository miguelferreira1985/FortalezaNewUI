import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Presentation } from '../shared/models/presentation.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class PresentationService {

    private baseUrl = 'http://localhost:51551/';

    list: Presentation[];

    constructor( private http: HttpClient ) {}

    getActivePresentation() {
        return this.http.get(`${ this.baseUrl }api/presentation/GetActivePresentations`);
    }
}
