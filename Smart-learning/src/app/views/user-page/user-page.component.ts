import { Component, OnInit } from '@angular/core';
import * as M from '../../app.models';
import { UserService } from '../../services/user.service';
import { QuestionService } from '../../services/question/question.service';
import { TestService } from '../../services/test/test.service';
import { Router } from '@angular/router';

@Component({
  selector: 'user-page',
  templateUrl: './user-page.component.html',
  
})
export class UserPageComponent implements OnInit {
  user: M.User
  subjectRatingList: M.SubjectRatingList[] = [];
  subjects: M.Subject[];
  constructor(private userService: UserService,
    private testService: TestService,
    private router: Router,
    private questionService: QuestionService) { }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.getAllSubjects();
  }

  navigateToPracticePage(subjectId){
    console.log(subjectId);
    
    this.router.navigate(['practice' , subjectId]);

  }

  getAllSubjects() {
    this.questionService.getAllSubjects().subscribe((subjects: M.Subject[]) => {
      this.subjects = subjects;
      this.createSubjectList();
    })
  }

  private getHighestScore(): number {
    let score = 150;
    for (const subject of this.user.subjects) {
      if (score < subject.score) {
        score = subject.score;
      }
    }
    return score;
  }

  private createSubjectList() {
    let highestScore: number = this.getHighestScore();
    let ratingCubeValue = Math.floor(highestScore / 5);

    for (const subject of this.subjects) {
      const userSubject = this.user.subjects.find(item => item.id === subject.id);
      let rating = 0;
      if (userSubject) {
        rating = Math.floor(userSubject.score / ratingCubeValue);
      }
      let item: M.SubjectRatingList = {
        name: subject.name,
        rating: rating,
        subjectId: subject.id
      }
      this.subjectRatingList.push(item);
    }
  }
  takeTest() {
    let subjectRatingListForSort = [...this.subjectRatingList];
    this.testService.buildTest(subjectRatingListForSort, this.user).subscribe((test: M.Question[]) => {
      this.testService.setCurrentTest(test);
      this.router.navigate(['test']);
    })
  }
}
