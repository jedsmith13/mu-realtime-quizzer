import { Question } from './question';
import { ClassMember } from './class-member';

export interface Quiz {
    question: Question;
    classMembers?: ClassMember[];
    className?: string;
    quizId: string;
    answer: string;
}
