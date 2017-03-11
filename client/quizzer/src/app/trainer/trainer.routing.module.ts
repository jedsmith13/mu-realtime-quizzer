import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectComponent } from './connect/connect.component';
import { ClassComponent }  from './class/class.component';
import { ClassCreateComponent } from './class-create/class-create.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizCreateComponent } from './quiz-create/quiz-create.component';

const heroesRoutes: Routes = [
  { path: 'trainer/class/create',  component: CreateClassComponent },
  { path: 'trainer/class/:id', component: ClassComponent },
  { path: 'trainer/quiz/create',  component: CreateQuizComponent },
  { path: 'trainer/quiz', component: QuizComponent },
  { path: 'trainer', redirectTo: 'trainer/quiz/create', pathMatch: 'fullPath' }
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
