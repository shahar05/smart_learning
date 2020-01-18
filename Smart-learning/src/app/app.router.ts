import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./views/login/login.component";
import { NgModule } from '@angular/core';
import { UserPageComponent } from './views/user-page/user-page.component';
import { AuthGuard } from './guard/auth.guard';
import { ControlPanelComponent } from './views/control-panel/control-panel.component';
import { AdminGuard } from './guard/admin.guard';
import { TestComponent } from './views/test/test.component';
import { PracticeComponent } from './views/practice/practice.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent  },
  { path: 'control-panel', component: ControlPanelComponent, canActivate: [AdminGuard] },
  { path: 'user', component: UserPageComponent, canActivate: [AuthGuard] },
  { path: 'test', component: TestComponent, canActivate: [AuthGuard] },
  { path: 'practice/:subjectId', component: PracticeComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
