import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Class } from '../../class';
import { ClassService } from '../class.service';
import { WsCommunicatorService } from '../../ws-communicator.service';

@Component({
  selector: 'app-class-create',
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
        this.wsCommunicatorService.trackClass(className)
        // .subscribe(
        //   (msg) => {
        //     console.log("next", msg.data);
        //   },
        //   (error: Error) => this.errorMessage = error.message,
        //   () => console.log("complete")
        // );
        this.router.navigate([`/trainer/quiz`]);
      },
      (error: Error) => this.errorMessage = error.message
    );
  };
}
