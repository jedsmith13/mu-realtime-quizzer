import { Component, OnInit } from '@angular/core';
import { ClassService } from '../class.service';
import { Class } from '../../class';

@Component({
  selector: 'quizzer-trainer-class',
  providers: [ClassService],
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  public currentClass;

  constructor(private classService: ClassService) { }

  ngOnInit() {
    this.currentClass = this.classService.currentClass;
  }

}
