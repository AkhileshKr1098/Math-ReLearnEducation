import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MathCrudService } from 'src/app/math-crud.service';
import { AddQuestionComponent } from '../add-question/add-question.component';
import { ConfirmBoxComponentComponent } from '../../confirm-box-component/confirm-box-component.component';
import { Class, ClassRes, Day, Sections, SubTopic, Topics, TopicsRes, Week } from 'src/app/interface/Question.interface';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements AfterViewInit {
  sections: Sections[] = [];
  Classes: Class[] = [];
  weeks: Week[] = [];
  days: Day[] = [];
  topics: Topics[] = [];
  subTopics: SubTopic[] = [];
  units: any[] = [];

  Question: any[] = [];
  FilterQuestion: any[] = [];
  pagedQuestions: any[] = [];

  filters: any = {
    class: '',
    week: '',
    day: '',
    sections: '',
    topics: '',
    sub_topics: '',
    unit: '',
    question_type: ''
  };

  deletevalue: any = 1;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private _crud: MathCrudService
  ) { }

  ngOnInit() {
    this.getClass();
    this.getWeeks();
    this.getDayS();
    this.getTopics();
    this.getSubTopics();
    this.getSection();
    this.getUnit();
    this.getData();
  }

  ngAfterViewInit() {
    this.loadPage(0, 10); // default first page
  }

  onPageChange(event: PageEvent) {
    this.loadPage(event.pageIndex, event.pageSize);
  }

  loadPage(pageIndex: number, pageSize: number) {
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    this.pagedQuestions = this.FilterQuestion.slice(startIndex, endIndex);
  }

  getData() {
    this.getQuestions();
  }

  getQuestions() {
    this._crud.getQuestions(this.filters).subscribe((res: any[]) => {
      this.FilterQuestion = Array.isArray(res) ? res : [];
      if (this.paginator) {
        this.paginator.firstPage(); // reset paginator
      }
      this.loadPage(0, this.paginator?.pageSize || 10);
    });
  }

  // ------------------ CRUD ------------------
  addNew() {
    const opn = this.dialog.open(AddQuestionComponent, { disableClose: true });
    opn.afterClosed().subscribe(() => this.getData());
  }

  onEdit(edit: any) {
    const dialogRef = this.dialog.open(AddQuestionComponent, {
      disableClose: true,
      data: edit
    });
    dialogRef.afterClosed().subscribe(result => {
      if (this.deletevalue === result) {
        this.getData();
      }
    });
  }

  delete_application(item: any) {
    const dialogRef = this.dialog.open(ConfirmBoxComponentComponent, {
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.deletevalue === result) {
        this._crud.QuestionDeleted(item.id).subscribe((res: any) => {
          this.getData();
          alert(res.message);
        });
      }
    });
  }

  // ------------------ Filters & Dropdown Data ------------------
  getClass() {
    this._crud.getClass().subscribe((res: ClassRes) => {
      if (Array.isArray(res.data)) this.Classes = res.data;
    });
  }

  getWeeks() {
    this._crud.getWeek().subscribe((res) => {
      if (Array.isArray(res.data)) this.weeks = res.data;
    });
  }

  getDayS() {
    this._crud.getDays().subscribe((res) => {
      if (Array.isArray(res.data)) this.days = res.data;
    });
  }

  getSection() {
    this._crud.getsections().subscribe((res) => {
      if (Array.isArray(res.data)) this.sections = res.data;
    });
  }

  getTopics() {
    this._crud.getTopics().subscribe((res: TopicsRes) => {
      if (Array.isArray(res.data)) this.topics = res.data;
    });
  }

  getSubTopics() {
    this._crud.getSubTopics().subscribe((res) => {
      if (Array.isArray(res.data)) this.subTopics = res.data;
    });
  }

  getUnit() {
    this._crud.getUnit().subscribe((res) => {
      this.units = Array.isArray(res.data) ? res.data : [];
    });
  }

drop(event: CdkDragDrop<any[]>) {
  const prevIndex = event.previousIndex + this.paginator.pageIndex * this.paginator.pageSize;
  const currIndex = event.currentIndex + this.paginator.pageIndex * this.paginator.pageSize;

  moveItemInArray(this.FilterQuestion, prevIndex, currIndex);

  // refresh current page view
  this.loadPage(this.paginator.pageIndex, this.paginator.pageSize);



}

updateOrder() {
  const payload = this.FilterQuestion.map((q, index) => ({
    id: q.id,
    order: index + 1
  }));

  this._crud.updateQuestionOrder(payload).subscribe(
    (res: any) => {
      if (res.success === 1) {
        alert('Serial numbers updated successfully');
        this.getQuestions();
      } else {
        alert('Failed to update serial numbers');
      }
    },
    (err: any) => {
      console.error(err);
      alert('Error updating serial numbers');
    }
  );
}

}
