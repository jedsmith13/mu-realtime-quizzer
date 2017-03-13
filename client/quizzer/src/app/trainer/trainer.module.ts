import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { TrainerRoutingModule } from './trainer.routing.module';
import { ClassComponent } from './class/class.component';
import { ClassCreateComponent } from './class-create/class-create.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizCreateComponent } from './quiz-create/quiz-create.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TrainerRoutingModule
  ],
  declarations: [ClassCreateComponent, ClassComponent, QuizComponent, QuizCreateComponent]
})
export class TrainerModule { }
