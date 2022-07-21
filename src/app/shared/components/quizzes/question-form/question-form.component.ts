import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from '../../../../core/models/quiz';
import { Answer } from '../../../../core/models/answer';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {
  public checkedAnswer: string;
  @Input() question: Question;
  @Input() answers: Array<Answer>;
  @Input() activeQuestion: number;
  @Output() selectedAnswer = new EventEmitter();

  ngOnInit(): void {
    if (this.answers.length) {
      this.checkedAnswer = this.answers[this.activeQuestion].answer;
    }
  }

  emitAnswer(): void {
    this.selectedAnswer.emit(this.checkedAnswer);
  }
}
