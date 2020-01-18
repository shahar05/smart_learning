import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase/firebase.service';
import { Observable } from 'rxjs';
import * as M from '../app.models';
import * as E from '../app.enums';

import * as guid from 'uuid/v1';
import { take } from 'rxjs/operators'
import { LocalStorageService } from './localstorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUser: M.User
  constructor(private firebaseService: FirebaseService,
    private localStorageService: LocalStorageService) { }

  getCurrentUser() {
    if (!this.currentUser) {
      this.currentUser = this.localStorageService.getItem(E.LocalStorageKey.user);
    }
    return this.currentUser;
  }
  testIfEmailIsUsed(email) {
    return this.firebaseService.testForEmail(email);
  }

  login(user: Partial<M.User>): Observable<M.User> {
    return new Observable((o) => {
      this.firebaseService.login(user).pipe(take(1)).subscribe((user: M.User[]) => {
        const currentUser = user[0];
        this.localStorageService.setItem(E.LocalStorageKey.user, currentUser)
        this.currentUser = currentUser;
        o.next(currentUser);
        o.complete();
      });
    })
  }
  createNewUser(user: Partial<M.User>) {
    user.id = guid();
    this.firebaseService.setUser(<M.User>user);
  }

  getUser(id: string) {
    return this.firebaseService.getUser(id);
  }
  updateUser(user:M.User){
    this.localStorageService.setItem(E.LocalStorageKey.user , user);
    return this.firebaseService.setUser(user);
  }
}
