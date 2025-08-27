import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { SectionsFilter, SectionsFilterRes, Topics, Week } from 'src/app/interface/Question.interface';
import { MathCrudService } from 'src/app/math-crud.service';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  weeksList: Week[] = []
  TopicsList: Topics[] = []
  SectionsList: SectionsFilter[] = []
  SectionsListFilter: SectionsFilter[] = []
  allTopics: string = ''
  userData: any = {};
  currentWeek: any = 0;
  currentDay: any = 0;
  days1 = [
    { name: '1', url: '../../../assets/icon/day1.png' },
    { name: '2', url: '../../../assets/icon/day2.png' },
    { name: '3', url: '../../../assets/icon/day3.png' }

  ];

  days2 = [
    { name: '4', url: '../../../assets/icon/day4.png' },
    { name: '5', url: '../../../assets/icon/day5.png' },
    { name: '6', url: '../../../assets/icon/day6.png' },

  ];



  constructor(
    private _crud: MathCrudService,
    private shared: SharedService,
    private _router: Router
  ) {
    this.userData = JSON.parse(sessionStorage.getItem('rluser') || '{}');
    this.currentWeek = this.shared.currentWeek.getValue();
    this.currentDay = this.shared.currentDay.getValue();
  }


  ngOnInit() {
    this.getWeeks()
    this.getSections()
  }

  getWeeks() {
    this._crud.getWeek().subscribe(
      (res) => {
        console.log(res, 'getweek');
        if (Array.isArray(res.data)) {
          this.weeksList = res.data
        }
      }
    )
  }

  getTopics() {
    this._crud.getTopics().subscribe(
      (res) => {
        this.allTopics = ''
        console.log(res)
        if (Array.isArray(res.data)) {
          this.TopicsList = res.data
          for (let index = 0; index < res.data.length; index++) {
            if (index == 0) {
              this.allTopics += res.data[index].topics
            } else {
              this.allTopics += ', ' + res.data[index].topics
            }
          }

          console.log(this.allTopics)

        }
      }
    )
  }


  getSections() {
    const cls = this.userData.Class
    this._crud.getsectionsFilter(cls).subscribe(
      (res: SectionsFilterRes) => {
        console.log(res, 'SectionsFilterRes');

        if (Array.isArray(res.data)) {
          this.SectionsList = res.data
          this.SectionsListFilter = res.data
        }
      }
    )

    this.getTopics()
  }

  onTopics(day: any, event: MouseEvent) {
    console.log(day.name);
    sessionStorage.setItem('selectedDay', day.name);
    console.log(day);
    localStorage.setItem('currentday', day)
    event.preventDefault();

    this._router.navigate(['/math/topic']);
  }


  onGetSections(week: any) {
    console.log(week);
    this.SectionsList = this.SectionsListFilter.filter((item: any) => item.week == week)
    console.log(this.SectionsList);


  }

  getWeekStatus(weekNum: number): string {
    if (weekNum === this.currentWeek) {
      return "Current week";
    } else if (weekNum < this.currentWeek && weekNum >= this.currentWeek - 2) {
      return "Access week";
    } else if (weekNum < this.currentWeek - 2) {
      return "Completed";
    } else {
      return "Upcoming";
    }
  }

  getWeekClass(weekNum: number): string {
    if (weekNum === this.currentWeek) {
      return "current";
    }

    if (weekNum < this.currentWeek) {
      if (weekNum >= this.currentWeek - 2) {
        return "access";
      } else {
        return "completed";
      }
    }

    return "upcoming";
  }

  onDays(week: any) {
    console.log(week);
    sessionStorage.setItem('selectedWeek', week)
    this._router.navigate(['math/days'])
  }

  setDefaultImage(event: any) {
    event.target.src = '../../../assets/icon/profile.jpeg';
  }

}
