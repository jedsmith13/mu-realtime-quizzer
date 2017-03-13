import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassCreateComponent } from './class-create/class-create.component';
import { QuizComponent } from './quiz/quiz.component';

const trainerRoutes: Routes = [
  { path: 'trainer/class/create', component: ClassCreateComponent },
  { path: 'trainer/quiz', component: QuizComponent },
  { path: 'trainer', redirectTo: 'trainer/class/create', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forChild(trainerRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TrainerRoutingModule { }
