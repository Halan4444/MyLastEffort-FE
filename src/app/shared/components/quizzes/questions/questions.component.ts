import { Component, OnInit } from '@angular/core';
import {Questions} from '../../../../core/models/question';
import {QuestionsService} from '../../../../service/questions.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  listQuestion: Questions[];
  total: number;
  constructor(private questionService: QuestionsService) { }

  ngOnInit(): void {
    this.getAllQuestion();
  }

  getAllQuestion(): Questions[] {
    this.questionService.getAllquestions().subscribe((result) => {
      this.listQuestion = result;
      this.total = this.listQuestion.length;
    });
    return this.listQuestion;
  }
}
