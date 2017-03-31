import { Component, OnInit } from '@angular/core';
import { WsCommunicatorService } from '../../ws-communicator.service';
import { ClassModel } from "./class.model";
import { DynamicFormControlModel, DynamicFormService } from "@ng2-dynamic-forms/core";

@Component({
  selector: 'app-class',
  providers: [WsCommunicatorService],
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

    formModel: DynamicFormControlModel[] = ClassModel;
    formGroup: FormGroup;

    constructor() {}

    ngOnInit() {
        this.formGroup = this.formService.createFormGroup(this.formModel);
    }

  constructor(private wsCommunicatorService: WsCommunicatorService, private formService: DynamicFormService) { }

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
