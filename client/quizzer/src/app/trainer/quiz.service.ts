import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Question } from '../question';
import { Quiz } from '../quiz';

@Injectable()
export class QuizService {

  private quizzes: Quiz[] = [];

  constructor(private http: Http) { }

  public create(question: Question): Observable<Quiz> {
    return this.http.post(`http://localhost:5353/question`, question)
      .map((res: Response) => {
        const quiz = res.json();
        this.quizzes.push(quiz);
        return quiz;
      })
      .catch(this.handleError);
  }

  public get(): Observable<Quiz[]> {
    return this.http.get(`http://localhost:5353/question`)
      .map((res: Response) => {
        const quizzes: Quiz[] = res.json();
        this.quizzes.length = 0;
        this.quizzes.push.apply(this.quizzes, quizzes);
        return this.quizzes;
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
