import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassCreateComponent } from './class-create/class-create.component';
import { QuizComponent } from './quiz/quiz.component';

const heroesRoutes: Routes = [
  { path: 'trainer/class/create', component: ClassCreateComponent },
  { path: 'trainer/quiz', component: QuizComponent },
  { path: 'trainer', redirectTo: 'trainer/class/create', pathMatch: 'fullPath' }
];

@NgModule({
  imports: [
    RouterModule.forChild(heroesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TrainerRoutingModule { }
