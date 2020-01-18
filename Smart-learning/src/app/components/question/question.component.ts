import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as M from '../../app.models';
import * as E from '../../app.enums';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() question: M.Question
  @Input() user: M.User
  @Input() isPractice: boolean
  
  @Output() finishQuestion: EventEmitter<M.QuestionComponentResponse> = new EventEmitter<M.QuestionComponentResponse>();
  @Output() finishPractice: EventEmitter<void> = new EventEmitter<void>();
  showAnswer: boolean = false;
  counter: number = 0
  constructor() { }

  ngOnInit() {
    console.log(this.question.answer.imageUrl);
  }

  done() {
    this.showAnswer = true;
  }
  finish(scoreOption: string) {
    let option;
    switch (Number(scoreOption)) {
      case E.ScoreOption.Good:
        option = E.ScoreOption.Good;
        break;
      case E.ScoreOption.Bad:
        option = E.ScoreOption.Bad;
        break;
      case E.ScoreOption.Medium:
        option = E.ScoreOption.Medium;
        break;
    }

    let score = this.calculateScore(option);
    let questionResponse: M.QuestionComponentResponse = {
      score: score,
      subjectId: this.question.subjectId
    }
    this.finishQuestion.emit(questionResponse);
  }

  calculateScore(scoreOption: E.ScoreOption): number {
    let score = 0;
    switch (scoreOption) {
      case E.ScoreOption.Good:
        score += 30;
        break;
      case E.ScoreOption.Bad:
        score += 0;
        break;
      case E.ScoreOption.Medium:
        score += 15;
        break;
    }
    let timeDecrease = 0;
    if (this.user && this.user.hasExtraTime) {
      this.question.question.time += this.question.question.time *0.33;
    }
    if (this.counter > this.question.question.time) {
      let step = Math.floor(this.question.question.time / 10)
      for (let i = 1; i <= 10; i++) {
        if (this.counter > this.question.question.time + step * i) {
          timeDecrease += 3;
        } else {
          break;
        }
      }
    }
    return score - timeDecrease;
    
  }

  donePractice(){
    this.finishPractice.emit();
  }

}
