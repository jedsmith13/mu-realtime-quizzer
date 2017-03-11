import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClassService } from '../class.service';

@Component({
  selector: 'app-class-create',
  providers: [classService],
  templateUrl: './class-create.component.html',
  styleUrls: ['./class-create.component.css']
})
export class ClassCreateComponent {

  constructor(private classService: ClassService, private router: Router) { }

  public createClass = (className: string) => {
    classService.create(className)
    this.router.navigate([`/trainer/class/${className}`]);
  };
}
