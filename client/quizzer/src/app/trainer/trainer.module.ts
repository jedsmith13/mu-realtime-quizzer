import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainerRoutingModule } from './trainer.routing.moduel';
import { ClassComponent } from './class/class.component';
import { ClassCreateComponent } from './class-create/class-create.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizCreateComponent } from './quiz-create/quiz-create.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ClassCreateComponent, ClassComponent, QuizComponent, QuizCreateComponent]
})
export class TrainerModule { }
