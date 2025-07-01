import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationComponent } from './registration/registration.component';
import { MathsModule } from './maths/maths.module';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'english', loadChildren: () => import('./english/english.module').then(e => e.EnglishModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(a => a.AdminModule) },
  { path: 'math', loadChildren: () => import('./maths/maths.module').then(m => m.MathsModule) },
  { path: 'registration', component: RegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
