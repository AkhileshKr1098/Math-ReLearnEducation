import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-days',
  templateUrl: './days.component.html',
  styleUrls: ['./days.component.scss']
})
export class DaysComponent {

  currentWeek: any = 0;
  currentDay: any = 0;
  constructor(
    private _router: Router,
    private shared: SharedService,
  ) {

    this.currentWeek = this.shared.currentWeek.getValue();
    this.currentDay = this.shared.currentDay.getValue();
  }



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


  onTopics(day: any, event: MouseEvent) {
    console.log(day.name);
    sessionStorage.setItem('selectedDay', day.name);
    console.log(day);
    localStorage.setItem('currentday', day)
    event.preventDefault();

    this._router.navigate(['/math/topic']);
  }

  getCurrentWeek() {
    return Number(sessionStorage.getItem('selectedWeek')) || this.shared.currentWeek.getValue();

  }
}
