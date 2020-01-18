import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question/question.service';
import * as M from '../../app.models';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {
  subjectId: string;
  questions: M.Question[];
  currentQuestionIndex: number = 0;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService) { }

  ngOnInit() {
    this.subjectId = this.activatedRoute.snapshot.params['subjectId'];
    this.questionService.getAllPracticeQuestionForSubject(this.subjectId).subscribe((questions: M.Question[]) => {
      this.questions = questions;
      if (this.questions) {
        this.shuffle(this.questions);
      }
    });
  }
  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

  }

  finishQuestion($event: M.QuestionComponentResponse) {

    if (this.currentQuestionIndex === this.questions.length - 1) {
      this.shuffle(this.questions);
      this.currentQuestionIndex = 0;
    } else {
      this.currentQuestionIndex++;
    }
  }

  finishPractice(){
    this.router.navigate(['user']);
  }

}
