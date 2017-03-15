import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Class } from '../class';

@Injectable()
export class ClassService {

  public currentClass: Class;

  constructor(private http: Http) { }

  public create(className: string): Observable<string[]> {
    return this.http.post(`http://localhost:5353/classes`, {className: className})
      .map((res: Response) => {
        const newClass: Class = res.json().result.class;
        this.currentClass = newClass;
        return newClass;
      })
      .catch(this.handleError);
  }
  
  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
