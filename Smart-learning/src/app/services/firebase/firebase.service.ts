import { Subject } from './../../app.models';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,

} from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import * as M from '../../app.models';
import * as E from '../../app.enums';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private afs: AngularFirestore,
    private afStorage: AngularFireStorage) { }



  public addQuestion(question: M.Question) {
    return new Observable((o) => {
      this.afs.collection(E.Collections.Questions).add(question).then(() => {
        o.next();
        o.complete();
      });
    })
  }
  public getAllQuestionForSubject(id: string) {
    return this.afs.collection(E.Collections.Questions, ref => ref.where('subjectId', '==', id).where('type', '==', 0)).valueChanges();
  }
  public getAllPracticeQuestionForSubject(id: string) {
    return this.afs.collection(E.Collections.Questions, ref => ref.where('subjectId', '==', id).where('type', '==', 1)).valueChanges();
  }

  public getAllSubjects() {
    return this.afs.collection(E.Collections.Subjects).valueChanges().pipe(take(1));
  }
  updateSubject(subject:Subject){
    return this.afs.doc(`${E.Collections.Subjects}/${subject.id}`).set(subject);
  }

  public uploadFile(image, key, fileExt: string) {
    return new Observable((o) => {
      this.afStorage.storage.ref(`q/${key}.${fileExt}`).put(image)
        .then(() => {
          this.afStorage.storage.ref(`q/${key}.${fileExt}`).getDownloadURL().then((url) => {
            o.next(url);
            o.complete();
          });
        });
    });
  }
  getImageUrl(id) {
    return this.afStorage.ref(id).getDownloadURL()
  }

  public setUser(user: M.User) {
    return this.afs.doc(`${E.Collections.Users}/${user.id}`).set(user);
  }

  public login(user: Partial<M.User>) {
    return this.afs.collection('users', ref => ref.where('email', '==', user.email).where('password', '==', user.password)).valueChanges();
  }

  public getUser(id: string): Observable<any> {
    return this.afs.collection(E.Collections.Users).get();
  }

  public testForEmail(email: string) {
    return this.afs.collection('users', ref => ref.where('email', '==', email)).snapshotChanges();
  }

}
