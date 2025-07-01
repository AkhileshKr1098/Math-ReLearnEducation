import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopicsComponent } from './topics/topics.component';
import { QuestionsComponent } from './questions/questions.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: '', component: DashboardComponent },
      { path: 'topic', component: TopicsComponent },
      { path: 'question', component: QuestionsComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MathsRoutingModule {

}
