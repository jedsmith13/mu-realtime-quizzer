import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClassService } from '../class.service';
import { WsCommunicatorService } from '../../ws-communicator.service';

import { Class } from '../../class';

@Component({
  selector: 'app-class-create',
  providers: [ClassService, WsCommunicatorService],
  templateUrl: './class-create.component.html',
  styleUrls: ['./class-create.component.css']
})
export class ClassCreateComponent implements OnInit {
  public errorMessage;

  constructor(private classService: ClassService, private wsCommunicatorService: WsCommunicatorService, private router: Router) { }

  ngOnInit() {
    // If we already have a class then go to the quiz page.
    if (this.classService.currentClass) {
      this.router.navigate([`/trainer/quiz`]);
    }
  };

  public createClass = (className: string) => {
    this.classService.create(className).subscribe(
      (currentClass: any) => {
        this.wsCommunicatorService.trackClass(className).subscribe(
          (msg) => {
            console.log("next", msg.data);
            this.router.navigate([`/trainer/quiz`]);
          },
          (error: Error) => this.errorMessage = error.message,
          () => console.log("complete")
        );
      },
      (error: Error) => this.errorMessage = error.message
    );
  };
}
