import { Component, OnInit } from '@angular/core';
import { WsCommunicatorService } from '../../ws-communicator.service';

@Component({
  selector: 'app-class',
  providers: [WsCommunicatorService],
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  constructor(private wsCommunicatorService: WsCommunicatorService) { }

  ngOnInit() {
  }

  public answerQuestion = (quizId: string, answer: string) => {
    this.wsCommunicatorService.answerQuestion(quizId, answer).subscribe(
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
