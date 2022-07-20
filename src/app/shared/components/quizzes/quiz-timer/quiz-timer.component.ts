import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quiz-timer',
  templateUrl: './quiz-timer.component.html',
  styleUrls: ['./quiz-timer.component.scss']
})
export class QuizTimerComponent implements OnInit, OnDestroy {
  private _intervalId: number;

  @Input()
  public quizTime: number;

  @Output()
  public timeValueChange = new EventEmitter();

  ngOnInit() {
    this._intervalId = window.setInterval(() => {
      this.quizTime --;
      if (this.quizTime) {
        this.timeValueChange.emit(this.quizTime);
      }
    }, 1000);
  }

  ngOnDestroy() {
    if (this._intervalId) {
      clearInterval(this._intervalId);
    }
  }
}
