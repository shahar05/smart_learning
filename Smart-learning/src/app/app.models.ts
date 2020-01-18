import * as E from "./app.enums";

export interface baseEntity {
    id: string;
}

export interface User extends baseEntity {
    email: string;
    password: string;
    subjects: UserSubject[],
    questionsAsekdIds: string[],
    hasExtraTime?:boolean
}

export interface UserSubject {
    id: string;
    name: string
    score: number;
}

export interface SubjectRatingList {
    subjectId?: string;
    name: string;
    rating: number
}

export interface Question extends baseEntity {
    type: E.QuestionType
    subjectId: string;
    question: DisplayQuestion;
    answer: DisplayQuestionOrAnswer;
    isReal:boolean;
}

export interface Subject extends baseEntity {
    name: string;
}

export interface QuestionComponentResponse{
    score:number;
    subjectId:string;
}

export interface DisplayQuestionOrAnswer {
    imageUrl: string
}
export interface DisplayQuestion extends DisplayQuestionOrAnswer {
    time: number
}
