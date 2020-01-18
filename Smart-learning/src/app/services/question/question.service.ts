import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase/firebase.service';
import * as guid from 'uuid/v1';
import * as M from '../../app.models';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private firebaseService: FirebaseService) { }

  public getAllSubjects(){
    return this.firebaseService.getAllSubjects();
  }

  public uploadImage(file , fileExt:string){
    let id  = guid();
    return this.firebaseService.uploadFile(file, id, fileExt);
  }
  public addQuestion(question: M.Question){
    question.id = guid();
    return this.firebaseService.addQuestion(question);

  }
  public getAllQuestionForSubject(id: string) {
    return this.firebaseService.getAllQuestionForSubject(id);
  }
  public getAllPracticeQuestionForSubject(id: string) {
    return this.firebaseService.getAllPracticeQuestionForSubject(id);
  }

}
