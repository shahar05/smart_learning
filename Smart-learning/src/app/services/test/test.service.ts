import { Injectable } from '@angular/core';
import * as M from '../../app.models';
import { FirebaseService } from '../firebase/firebase.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private currentTest:M.Question[];
  constructor(private firebaseService: FirebaseService) { }

  getCurrentTest(){
    return this.currentTest;
  }

  setCurrentTest(test:M.Question[]){
    this.currentTest = test;
  }

  buildTest(ratingList: M.SubjectRatingList[], user: M.User) {
    return new Observable((o) => {
      let questionSubjectIds = this.getQuestionSubjectIds(ratingList);
      
      this.getTestQuestions(questionSubjectIds , user).subscribe((questionList: M.Question[])=>{

        o.next(questionList);
        o.complete();
      })
    });    
  }

  private getTestQuestions(subjectList: string[], user: M.User) {
    return new Observable((o) => {
      let questionList: M.Question[] = []
      let promises = [];
      subjectList.forEach(subjectId => {
        promises.push(this.getQuestionForSubject(subjectId, user, questionList));
      });
      Promise.all(promises).then((val) => {
        o.next(questionList);
        o.complete();
      })
    })

  }
  private getQuestionForSubject(subjectId: string, user: M.User, questionList: M.Question[]): Promise<any> {
    return new Promise<any>((done: any) => {
      this.firebaseService.getAllQuestionForSubject(subjectId).subscribe((questions: M.Question[]) => {
        for (let j = 0; j < questions.length; j++) {
          if (!user.questionsAsekdIds.includes(questions[j].id)) {
            questionList.push(questions[j]);
            done();
            return;
          }
        }
        let index = Math.random() * questions.length;
        questionList.push(questions[index]);
        done();
      
      });
    });
  }

  private getQuestionSubjectIds(ratingList: M.SubjectRatingList[]): string[] {
    let questionSubjectIds = [];
    let subjectRatingListForSort = [...ratingList];
    subjectRatingListForSort = subjectRatingListForSort.sort((item1, item2) => item1.rating - item2.rating);
    for (let i = 0; i < subjectRatingListForSort.length; i++) {
      if (subjectRatingListForSort[i].rating == 5 && i > 4) {
        questionSubjectIds.push(subjectRatingListForSort[0].subjectId);
      } else {
        questionSubjectIds.push(subjectRatingListForSort[i].subjectId);
      }
    }
    return questionSubjectIds;
  }


}
