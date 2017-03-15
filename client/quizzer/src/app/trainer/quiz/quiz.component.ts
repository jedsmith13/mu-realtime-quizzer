import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WsCommunicatorService } from '../../ws-communicator.service';
import { QuizService } from '../quiz.service';
import { ClassService } from '../class.service';

import { Quiz } from '../../quiz';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

    private currentClassName: string;
    public quizzes: Quiz[];
    public errorMessage: string;

    constructor(
        private quizService: QuizService,
        private classService: ClassService,
        private wsCommunicatorService: WsCommunicatorService,
        private router: Router
    ) { }

    ngOnInit() {
        // If we don't already have a class then go to the class create page.
        if (!this.classService.currentClass) {
            this.router.navigate([`/trainer/class/create`]);
        }

        this.quizService.get().subscribe(
            (quizzes: Quiz[]) => { this.quizzes = quizzes; },
            (error: Error) => { this.errorMessage = error.message; }
        );
    }

    public sendQuiz = (quizId: string) => {
        this.wsCommunicatorService.sendQuiz(quizId, this.classService.currentClass.className).subscribe(
            (msg) => {
                console.log("next", msg.data);
            },
            (msg) => {
                console.log("error", msg);
            },
            () => {
                console.log("complete");
            }
        );
    }

    public closeQuiz = (quizId: string, answer: string) => {
        this.wsCommunicatorService.closeQuiz(quizId, answer).subscribe(
            (msg) => {
                console.log("next", msg.data);
            },
            (msg) => {
                console.log("error", msg);
            },
            () => {
                console.log("complete");
            }
        );
    }

}
