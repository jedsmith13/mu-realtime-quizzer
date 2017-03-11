import { ClassMember } from './class-member';
import { Trainer } from './trainer';

export interface Class {
    className: string;
    signIn: string;
    classMembers: ClassMember[];
    trainers: Trainer[];
}
