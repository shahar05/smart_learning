import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question/question.service';
import * as M from '../../app.models';
import { log } from 'util';
import { QuestionType } from '../../app.enums';
import { Options } from 'ng5-slider/options';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {
  question: M.Question;
  subjects: M.Subject[];
  selectedSubject
  subjectQuestionList = [];
  questionType = QuestionType
  isQuestionBusy:boolean = false;
  isAnswerBusy:boolean = false;
  value: number = 100;
  options: Options = {
    floor: 0,
    ceil: 90
  };
  constructor(private questionService: QuestionService,
    private firebaseService:FirebaseService) { }

  ngOnInit() {
    
    this.getAllSubjects();    
    this.initQuestion();
  }

  createSubjectQuestionList(){
    for (const subject of this.subjects) {
      this.subjectQuestionList.push({
        subjectName : subject.name,
        listObserver : this.questionService.getAllQuestionForSubject(subject.id)
      })
    }
  }
  
  selectedSubjectChange(value) {
    this.question.subjectId = value
}
  submit(){
    this.question.type = parseInt(<any>this.question.type);
    this.questionService.addQuestion(this.question).subscribe(()=>{
      this.initQuestion()    
    });
    
  }

  initQuestion() {

    this.question = {
      isReal:true,
      id: undefined,
      subjectId: undefined,
      type:QuestionType.Test,
      answer: {
        imageUrl: undefined,

      },
      question: {
        imageUrl: undefined,
        time:this.options.floor,
      }
    }
  }

  onFileChange($event, target: string) {
    if (target == 'q') {
      this.isQuestionBusy = true;
    } else {
      this.isAnswerBusy = true;
    }
    
  const name = $event.target.files[0].name;
  const lastDot = name.lastIndexOf('.');
  const ext = name.substring(lastDot + 1);
    this.questionService.uploadImage($event.target.files[0] , ext).subscribe((url: string) => {
      if (target == 'q') {
        this.question.question.imageUrl = url;
      } else {
        this.question.answer.imageUrl = url;
      }
      this.isQuestionBusy = false;
      this.isAnswerBusy = false;

    })
  }

  getAllSubjects() {
    this.questionService.getAllSubjects().subscribe((subjects: M.Subject[]) => {
      this.subjects = subjects;
      this.createSubjectQuestionList()
    })
  }

  updateSubject(item:M.Subject){
    this.firebaseService.updateSubject(item);
   
  }
}
