import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './views/login/login.component';
import { AppRoutingModule } from './app.router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FormsModule } from '@angular/forms';
import { BarRatingModule } from "ngx-bar-rating";
import { UserPageComponent } from './views/user-page/user-page.component';
import { RatingBarComponent } from './components/rating-bar/rating-bar.component';
import { ControlPanelComponent } from './views/control-panel/control-panel.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Ng5SliderModule } from 'ng5-slider';
import { TestComponent } from './views/test/test.component';
import { QuestionComponent } from './components/question/question.component';
import { CounterModule } from 'ngx-counter';
import { PracticeComponent } from './views/practice/practice.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginFormComponent,
    UserPageComponent,
    RatingBarComponent,
    ControlPanelComponent,
    NavbarComponent,
    TestComponent,
    QuestionComponent,
    PracticeComponent
  ],
  imports: [
    BrowserModule,
    CounterModule.forRoot(),
    Ng5SliderModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AppRoutingModule,
    FormsModule,
    BarRatingModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
