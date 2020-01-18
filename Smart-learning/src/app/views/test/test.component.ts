import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TestService } from 'src/app/services/test/test.service';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question/question.service';
import * as M from '../../app.models';
import { formGroupNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';


// Hola hola hola
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  currentTest: M.Question[];

  beforeStartingTest: boolean = true;
  currentQuestionIndex = 0;
  user: M.User;
  scores: Map<string, number> = new Map()
  subjects: M.Subject[];
  constructor(private userService: UserService,
    private testService: TestService,
    private router: Router,
    private questionService: QuestionService) { }

  ngOnInit() {
    this.questionService.getAllSubjects().subscribe((subjects: M.Subject[]) => {
      
      this.currentTest = this.testService.getCurrentTest();
      this.user = this.userService.getCurrentUser();
      this.subjects = subjects;
    })
  }

  finishQuestion($event: M.QuestionComponentResponse) {
    this.scores.set($event.subjectId, $event.score);
    if (this.currentQuestionIndex === this.currentTest.length - 1) {
      this.finishTest()
      this.userService.updateUser(this.user).then(() => {
        this.router.navigate(['user']);
      })
    } else {

      this.currentQuestionIndex++;
    }
  }
  finishTest() {

    for (const question of this.currentTest) {
      this.user.questionsAsekdIds.push(question.id);

    }
    this.scores.forEach((value: number, key: string) => {
      for (const subject of this.user.subjects) {
        if (subject.id === key) {
          subject.score += value;
          return;
        }
      }

      let subjectItem = this.subjects.find((item) => {
        return item.id === key
      });

      this.user.subjects.push({
        id: key,
        name: subjectItem.name,
        score: value
      })
    });

  }
  startTest() {
    this.beforeStartingTest = false;
  }
}
