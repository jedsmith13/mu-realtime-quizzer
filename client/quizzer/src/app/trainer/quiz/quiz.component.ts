import { Component, OnInit } from '@angular/core';
import { WsCommunicatorService } from '../../ws-communicator-service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private wsCommunicatorService: WsCommunicatorService) { }

  ngOnInit() {
  }

  public sendQuiz = (quizId: string, className: string) => {
    wsCommunicatorService.sendQuiz.subscribe(
        (msg)=> {
            console.log("next", msg.data);
        },
        (msg)=> {
            console.log("error", msg);
        },
        ()=> {
            console.log("complete");
        }
    );
  }

  public closeQuiz = (quizId: string, answer: string) => {
    wsCommunicatorService.closeQuiz.subscribe(
        (msg)=> {
            console.log("next", msg.data);
        },
        (msg)=> {
            console.log("error", msg);
        },
        ()=> {
            console.log("complete");
        }
    );
  }
  
  public answerQuestion = (quizId: string, answer: string) => {
    wsCommunicatorService.closeQuiz.subscribe(
        (msg)=> {
            console.log("next", msg.data);
        },
        (msg)=> {
            console.log("error", msg);
        },
        ()=> {
            console.log("complete");
        }
    );
  }
  

}
