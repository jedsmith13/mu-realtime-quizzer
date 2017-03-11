import { Component, OnInit } from '@angular/core';

import { QuizService } from '../quiz.service';

@Component({
  selector: 'quizzer-trainer-quiz-create',
  providers: [QuizService],
  templateUrl: './quiz-create.component.html',
  styleUrls: ['./quiz-create.component.css']
})
export class QuizCreateComponent implements OnInit {

  public question: string;
  public type: string;
  public answer: string[] = [];
  public errorMessage: string;

  constructor(private quizService: QuizService) { }

  ngOnInit() {
  }

  public create = (question: string, type: string, answers: string[]) => {
    let newQuestion = {
      question: question,
      type: type,
      answers: answers
    };

    this.quizService.create(newQuestion).subscribe(
        () => { this.question = ''; this.type = ''; this.answer.length = 0; },
        (error: Error) => { this.errorMessage = error.message; }
    );
  }

}
