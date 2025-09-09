import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CRUDService } from 'src/app/crud.service';
import { ConfirmDialogComponent } from '../QuestionType/confirm-dialog/confirm-dialog.component';
import { CorrectBoxComponent } from '../correct-box/correct-box.component';
import { OppsBoxComponent } from '../opps-box/opps-box.component';
import { AnsReportRes, QuestionData, QuestionDataRes } from 'src/app/interface/Question.interface';
import { SharedService } from 'src/app/shared.service';
import { CurrentReportRes } from 'src/app/interface/report.interafce';
import { PaintCloneComponent } from 'src/app/maths/questions/paint-clone/paint-clone.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, AfterViewInit {

IsMaxMize: boolean = false
  isSaveVisible = false;
  QuestionType: string = '';
  SelectedTopics: string = '';
  AllQuestion: QuestionData[] = [];
  CurrentQuestion: QuestionData = this.getEmptyQuestion();
  base_url: string = '';
  CurrentReport: CurrentReportRes = this.getEmptyReport();
  userData: any = {};
  currentWeek: any = 0;
  currentDay: any = 0;
  i = 0;

  @ViewChild('paintRef') paintComponent!: PaintCloneComponent;


  constructor(
    private _crud: CRUDService,
    private dialog: MatDialog,
    public shared: SharedService
  ) {
    this._crud.img_base_url.subscribe(res => {
      this.base_url = res;
    });

    this.userData = JSON.parse(sessionStorage.getItem('rluser') || '{}');
    this.SelectedTopics = sessionStorage.getItem('SelectedTopics') || '';
    this.currentWeek = this.shared.currentWeek.getValue();
    this.currentDay = this.shared.currentDay.getValue();
  }

  ngOnInit(): void {
    this.getQuestion()
    this.getCurrentReport();
  }

  getQuestion() {
    if (this.userData?.Class && this.userData?.ID) {
      const curDay = Number(sessionStorage.getItem('selectedDay')) || this.shared.currentDay.getValue();

      this._crud.getQuestionFilter(this.userData.Class, this.getCurrentWeek(), curDay, this.userData.ID, this.SelectedTopics, this.userData?.MaxQToDo)
        .subscribe((res: QuestionDataRes) => {
          if (Array.isArray(res.data)) {
            this.AllQuestion = res.data;
            console.log(this.AllQuestion, 'all question');
            this.shared.AllQuestionList.next(res.data);

            if (this.AllQuestion.length) {
              this.i = 0;
              this.CurrentQuestion = this.AllQuestion[this.i];
              this.QuestionType = this.CurrentQuestion.question_type;
            }

            // this.NextQuestion();
          }
        });
    }

    this.shared.CurrentQuestionStatus.subscribe(res => {
      if (res === true) {
        this.NextQuestion();
      }
    });
  }

  ngAfterViewInit(): void {
    console.log('AfterViewInit called');
  }

  getCurrentReport(): void {
    if (this.userData?.ID && this.userData?.Class) {
      this._crud.get_current_report({
        std_id: this.userData.ID,
        class: this.userData.Class,
        week: this.getCurrentWeek() || this.currentWeek,
        day: this.getCurrentDay() || this.shared.currentDay.getValue(),
        topics: this.SelectedTopics
      }).subscribe((res: CurrentReportRes) => {
        if (res.success) {
          this.CurrentReport = res;
          console.log('Today Report:', res.today_report_all_topics);
          console.log('Topic Wise Report:', res.today_report_topics_wise);
        }
      });
    }
  }

  // NextQuestion(): void {
  //   if (this.AllQuestion.length === 0) return;

  //   this.i = (this.i + 1) % this.AllQuestion.length;
  //   this.CurrentQuestion = this.AllQuestion[this.i];
  //   this.QuestionType = this.CurrentQuestion?.question_type || '';

  //   console.log('Current Question:', this.CurrentQuestion);
  //   this.getCurrentReport()
  // }

  NextQuestion(): void {
    if (this.AllQuestion.length === 0) return;

    // if not at last question → go next
    if (this.i < this.AllQuestion.length - 1) {
      this.i++;
      this.CurrentQuestion = this.AllQuestion[this.i];
      this.QuestionType = this.CurrentQuestion?.question_type || '';

      console.log('Current Question:', this.CurrentQuestion);
      this.getCurrentReport();
      this.getQuestion();

    }
    else {
      // this.getQuestion(); 
    }
  }



  private getEmptyQuestion(): QuestionData {
    return {
      Answer: '',
      OptionA: '',
      OptionB: '',
      OptionC: '',
      OptionD: '',
      Question: '',
      instruction: '',
      class: '',
      day: '',
      id: 0,
      incomplete_word: '',
      listen_rec: '',
      listen_word: '',
      question_Img: '',
      question_type: '',
      sections: '',
      sub_topics: '',
      topics: '',
      unit: '',
      week: '',
      video_url_youtube: '',
      video_url_local: ''
    };
  }

private getEmptyReport(): CurrentReportRes {
  return {
    success: 0,
    today_report_topics_wise: {
      total_questions: 0,
      solved: 0,
      unsolved: 0,
      correct: 0,
      incorrect: 0,
      correct_percent: 0,
      incorrect_percent: 0
    },
    today_report_all_topics: {
      total_questions: 0,
      solved: 0,
      unsolved: 0,
      correct: 0,
      incorrect: 0,
      correct_percent: 0,
      incorrect_percent: 0
    }
  };
}


  setDefaultImage(event: any) {
    event.target.src = '../../../assets/icon/profile.jpeg';
  }


  getCurrentWeek() {
    return Number(sessionStorage.getItem('selectedWeek')) || this.shared.currentWeek.getValue();

  }

  getCurrentDay() {
    return Number(sessionStorage.getItem('selectedDay')) || this.shared.currentDay.getValue();

  }
  toggleMax() {
    this.IsMaxMize = !this.IsMaxMize;
    setTimeout(() => {
      this.paintComponent.resizeCanvas();
    }, 0);
  }



}
