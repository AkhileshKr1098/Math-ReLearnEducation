import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { WeekComponent } from './Questions/week/week.component';
import { DayListComponent } from './Questions/day-list/day-list.component';
import { ClassesComponent } from './Questions/classes/classes.component';
import { SectionsListComponent } from './Questions/sections-list/sections-list.component';
import { UnitListComponent } from './Questions/unit-list/unit-list.component';
import { TopicsListComponent } from './Questions/topics-list/topics-list.component';
import { SubTopicsListComponent } from './Questions/sub-topics-list/sub-topics-list.component';
import { QuestionListComponent } from './Questions/question-list/question-list.component';

const routes: Routes = [
  {
    path: '', component: AdminHomeComponent, children: [
      { path: '', component: QuestionListComponent },
      { path: 'math-question', component: QuestionListComponent },
      { path: 'math-week', component: WeekComponent },
      { path: 'math-day', component: DayListComponent },
      { path: 'math-classes', component: ClassesComponent },
      { path: 'math-Sections', component: SectionsListComponent },
      { path: 'math-units', component: UnitListComponent },
      { path: 'math-topics', component: TopicsListComponent },
      { path: 'math-subtopics', component: SubTopicsListComponent },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminMathRoutingModule { }
