import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as M from '../../app.models';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit {
  @Input() user: M.User
  @Input() hasExtraTime: boolean;
  
  @Output() submitForm: EventEmitter<M.User> = new EventEmitter<M.User>();
  emailError: string;
  passwordError: string;
  constructor() { }

  ngOnInit() {
  }

  private testIfEmailIsValid(email: string): boolean {
    if (!email) {
      this.emailError = 'הכנס כתובת אימייל';
      return false;
    }
    if (this.testIfEmailIsUsed(email)) {
      this.emailError = 'מייל כבר בשימוש';
      return false;
    }
    return true;
  }

  private testIfEmailIsUsed(email): boolean {
    return false;
  }

  submit() {

    if (!this.testIfEmailIsValid(this.user.email)) {
      return;
    }
    this.emailError = null;
    if (!this.user.password) {
      this.passwordError = 'הכנס סיסמא';
      return;
    }  
    this.passwordError = null;
    this.submitForm.emit(this.user);
  }

}
