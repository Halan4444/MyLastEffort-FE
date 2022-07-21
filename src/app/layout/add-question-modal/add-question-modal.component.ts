import { Component, OnInit } from '@angular/core';
import {QuestionsService} from '../../service/questions.service';

@Component({
  selector: 'app-add-question-modal',
  templateUrl: './add-question-modal.component.html',
  styleUrls: ['./add-question-modal.component.css']
})
export class AddQuestionModalComponent implements OnInit {

  categories: any[];
  category: any;
  level: any;
  levels: any[];
  types: any[];
  type: any;
  constructor(private questionService: QuestionsService) { }

  ngOnInit() {
    this.getAllCategoreies();
  }

  getAllCategoreies() {
    this.questionService.getAllCategories().subscribe(data => {
      console.log(data);
      this.categories = data;
      },
      error => {
        console.log(error);
      });
  }


}
