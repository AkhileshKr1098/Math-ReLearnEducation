import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'english', loadChildren: () => import('./english/english.module').then(e => e.EnglishModule) },
  { path: 'math', loadChildren: () => import('./maths/maths.module').then(m => m.MathsModule) },
  { path: 'adminEnglish', loadChildren: () => import('./admin-english/admin-english.module').then(en => en.AdminEnglishModule) },
  { path: 'adminMath', loadChildren: () => import('./admin-math/admin-math.module').then(ma => ma.AdminMathModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
