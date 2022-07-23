import { Component, OnInit } from '@angular/core';
import {QuestionsService} from '../../service/questions.service';
import {FormBuilder} from '@angular/forms';
import {Questions} from '../../core/models/question';
import {showPopupError, showToastSuccess} from '../../note';
import {data} from 'jquery';

@Component({
  selector: 'app-add-question-modal',
  templateUrl: './add-question-modal.component.html',
  styleUrls: ['./add-question-modal.component.css']
})
export class AddQuestionModalComponent implements OnInit {




  constructor(private fb: FormBuilder, private questionService: QuestionsService) {
  }

  categories: any[];
  category: any;
  level: any;
  levels: any[];
  types: any[];
  type: any;
  content: string;
  status: any;
  ansContent: any;
  questionId: any;

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

  answerForm = this.fb.group({
    content: this.ansContent,
    status: this.status,
    question: this.fb.group({
      id: this.questionId
    })
  });

  answers: any[];


  ngOnInit() {
    this.getAllCategoreies();
    this.getAllLevels();
    this.getAllTypes();
  }

  getAllCategoreies() {
    // tslint:disable-next-line:no-shadowed-variable
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

  listAnswer() {
    this.questionService.newQuestion().subscribe((question) => {
      // tslint:disable-next-line:variable-name
      const question_id = question.id;
      this.questionService.getAnswer(question_id).subscribe((answer) => {
        let str = '<div></div>';
        if (question.type.type === 'single') {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < answer.length; i++) {
            console.log('answeris' + answer[i].id);
            str +=
              `<input class="form-check-input" type="radio" name="answer" id="${answer[i].id}" value="${answer[i].id}">
               <label class="form-check-label"> ${answer[i].content} </label><br><br>
                    `;
          }
          console.log(str);
          document.getElementById('show_answer').innerHTML = str;

        }
        if (question.type.type === 'multi') {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < answer.length; i++) {
            // console.log("answeris"+answer[i].id)
            str +=
              `<input class="form-check-input" type="checkbox" name="answer" id="${answer[i].id}" value="${answer[i].id}">
               <label class="form-check-label">${answer[i].content}</label><br><br>`;
            // this.answers = answer[i];
          }
          // document.getElementById('show_answer').innerHTML = str;
        }
        // console.log('size trong list == ',size)
      });
    });
  }

   resetFormCreate() {
    $('#ques_content').val('');
  }

  createAnswer() {
    this.questionService.newQuestion().subscribe((question) => {
      // tslint:disable-next-line:variable-name
      const question_id = question.id;
      const icontent = (document.getElementById('ops') as HTMLInputElement).value;
      const newstatus = false;
      const answer = {
        content: icontent,
        status: newstatus,
        question: {
          id: question_id
        }
      };
      this.questionService.addAnswer(answer).subscribe(() => {
        const title = 'Tạo Đáp Án Thành Công';
        showToastSuccess(title);
      });
      }, error => {
        const title = 'Thông báo';
        const content = 'Tạo Quizz Thất Bại';
        showPopupError(title, content);
      });
    }


  submitQuestion() {
    this.questionService.newQuestion().subscribe((question) => {
      // tslint:disable-next-line:variable-name
      const question_id = question.id;
      this.questionService.getAnswer(question_id).subscribe((answer) => {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < answer.length; i++) {
          console.log('idanswer in submit' + answer[i].id);
          const index = answer[i].id;
          const icontent = answer[i].content;
          let newstatus = answer[i].status;
          if ((document.getElementById(index) as HTMLInputElement).checked) {
            console.log(index + 'co lay duoc id khong');
            newstatus = true;
            // tslint:disable-next-line:no-shadowed-variable
            const answer = {
              content: icontent,
              status: newstatus,
              question: {
                id: question_id
              }
            };
            const answerObj = JSON.stringify(answer);
            this.questionService.answerResult(index, answer).subscribe(() => {
              this.resetFormCreate();
              const title = 'Tạo Đáp Án Thành Công';
              showToastSuccess(title);
            });
          }
        }
      }, error => {
        const title = 'Thông báo';
        const content = 'Tạo Quizz Thất Bại';
        showPopupError(title, content);
      });
    });
  }
}
