import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopicsComponent } from './topics/topics.component';
import { QuestionsComponent } from './questions/questions.component';
import { ReportPageComponent } from './Report/report-page/report-page.component';
import { ReportPageDeatilsComponent } from './Report/report-page-deatils/report-page-deatils.component';
import { AnsPriviewComponent } from './Report/ans-priview/ans-priview.component';
import { DaysComponent } from './days/days.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'topic', component: TopicsComponent },
      { path: 'days', component: DaysComponent },
      { path: 'question', component: QuestionsComponent },
      { path: 'report', component: ReportPageComponent },
      { path: 'reportdeatils', component: ReportPageDeatilsComponent },
      { path: 'anspreview', component: AnsPriviewComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MathsRoutingModule {

}
