

export interface CurrentReportRes {
  success: number;
  today_report_topics_wise: ReportData;
  today_report_all_topics: ReportData;
}

export interface ReportData {
  total_questions: number;
  solved: number;
  unsolved: number;
  correct: number;
  incorrect: number;
  correct_percent: number;
  incorrect_percent: number;
}
