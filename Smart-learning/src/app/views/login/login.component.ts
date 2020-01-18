import { element } from "protractor";
import { Component, OnInit, OnDestroy } from "@angular/core";
import * as M from "../../app.models";
import * as E from "../../app.enums";
import { log } from "util";
import { UserService } from "../../services/user.service";
import { Observable, Subscribable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { LocalStorageService } from "src/app/services/localstorage/local-storage.service";
import { FirebaseService } from "../../services/firebase/firebase.service";
import { QuestionService } from "src/app/services/question/question.service";
import { Subject } from "../../app.models";

@Component({
  selector: "login",
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit, OnDestroy {
  loginUser: M.User;
  createUser: M.User;
  subscriber: Subscription;
  constructor(
    private userService: UserService,
    private router: Router,
    private questionService: QuestionService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.initBothUsers();
  }

  ngOnDestroy(): void {
    if (this.subscriber) {
      this.subscriber.unsubscribe();
    }
  }

  login($event: Partial<M.User>) {
    if (
      $event.email === E.AdminDetails.email &&
      $event.password === E.AdminDetails.password
    ) {
      this.localStorageService.setItem(
        E.LocalStorageKey.Admin,
        "6c4e1649-8c81-4f02-ba2c-5da2de0f91a2"
      );
      this.router.navigate(["control-panel"]);
      return;
    }
    this.subscriber = this.userService.login($event).subscribe(user => {
      this.router.navigate(["user"]);
      return;
    });
  }

  createNewUser($event: Partial<M.User>) {
    this.initSubjects($event).subscribe(() => {
      this.userService.createNewUser($event);
      this.initBothUsers();
    });
  }
  initSubjects(user: Partial<M.User>) {
    return new Observable(o => {
      this.questionService.getAllSubjects().subscribe((sub: any) => {
        let subjects: M.UserSubject[] = [];
        for (const item of sub) {
          subjects.push({
            id: item.id,
            name: item.name,
            score: 0
          });
        }
        user.subjects = subjects;
        o.next();
        o.complete();
      });
    });
  }

  initBothUsers() {
    this.loginUser = {
      email: undefined,
      id: undefined,
      password: undefined,
      subjects: [],
      questionsAsekdIds: [],
    hasExtraTime:false,
    };
    this.createUser = {
      email: undefined,
      id: undefined,
      password: undefined,
      subjects: [],
      questionsAsekdIds: [],
      hasExtraTime:false,
    };
  }

  getSubjects() {
    let sub = [
      { id: "232bfdb5-ecf5-4f66-ab9e-3b878da696e6", name: "Math", score: 0 },
      {
        id: "ee654a1d-238c-4715-8dc6-4f1ff2984954",
        name: "Electricity",
        score: 0
      },
      { id: "232bfdb5-ecf5-4f66-ab9e-3b878da696e6", name: "Math", score: 0 },
      { id: "232bfdb5-ecf5-4f66-ab9e-3b878da696e6", name: "Math", score: 0 },
      { id: "232bfdb5-ecf5-4f66-ab9e-3b878da696e6", name: "Math", score: 0 }
    ];
  }
}
