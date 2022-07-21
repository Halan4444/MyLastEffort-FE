import { Component, OnInit } from '@angular/core';
import {QuestionsService} from '../../service/questions.service';
import {FormBuilder} from '@angular/forms';
import {Questions} from '../../core/models/question';
import {showPopupError, showToastSuccess} from '../../note';

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
  content: string;

  // levelForm = this.fb.group( {
  //   id: this.level
  // });
  // typeForm = this.fb.group( {
  //   id: this.type
  // });
  //
  // cateForm = this.fb.group( {
  //   id: this.category
  // });

  createForm = this.fb.group({
    content: this.content,
    level: this.fb.group({
      id: this.level
    }),
    type: this.fb.group({
      id: this.type
    }),
    category: this.fb.group({
      id: this.category
    })
  });
  constructor(private fb: FormBuilder, private questionService: QuestionsService) { }



  ngOnInit() {
    this.getAllCategoreies();
    this.getAllLevels();
    this.getAllTypes();
  }

  getAllCategoreies() {
    this.questionService.getAllCategories().subscribe(data => {
      this.categories = data;
      },
      error => {
        console.log(error);
      });
  }
  getAllLevels() {
    this.questionService.getAllLevel().subscribe(data => {
        this.levels = data;
      },
      error => {
        console.log(error);
      });
  }

  getAllTypes() {
    this.questionService.getAllTypes().subscribe(data => {
        this.types = data;
      },
      error => {
        console.log(error);
      });
  }

  createQuestion() {
    const ques: Questions = this.createForm.value;
    console.log(ques);
    this.questionService.createQuestion(ques).subscribe(() => {
      const title = 'Tạo Quizz Thành Công';
      showToastSuccess(title);
    }, error => {
      const title = 'Thông báo';
      const content = 'Tạo Quizz Thất Bại';
      showPopupError(title, content);
    });
  }

  createAnswerForm() {
    let str = '';
    let str1 = '';
    str +=
      '<input id = "ops" name = "" type = "text" class = "form-control" required >' +
      '<input type = "submit" name = "" onclick="createAnswer();listAnswer(); createAnswerForm()" value="Add Answer">';
    document.getElementById('addQuestionModal').setAttribute('id', 'newModal');
    document.getElementById('new_question').innerHTML = str;
    str1 += '<input type = "submit" onclick="submitQuestion()" value="Submit Question">';
    document.getElementById('submit_question').innerHTML = str1;
  }

  listAnswer() {
    this.questionService.newQuestion().subscribe((question) => {
      // tslint:disable-next-line:variable-name
      let question_id = question.id;
      this.questionService.getAnswer(question_id).subscribe(() => {
        const title = 'Tạo Quizz Thành Công';
        showToastSuccess(title);
      }, error => {
        const title = 'Thông báo';
        const content = 'Tạo Quizz Thất Bại';
        showPopupError(title, content);
      });
    });
  }



}
