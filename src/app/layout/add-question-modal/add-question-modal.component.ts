import {Component, Injector, Input, OnInit} from '@angular/core';
import {QuestionsService} from '../../service/questions.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Questions} from '../../core/models/question';
import {showPopupError, showToastSuccess} from '../../note';
import {data} from 'jquery';
import {ResetService} from '../reset.service';
import {LayoutComponent} from '../layout.component';



@Component({
  selector: 'app-add-question-modal',
  templateUrl: './add-question-modal.component.html',
  styleUrls: ['./add-question-modal.component.css'],
})
export class AddQuestionModalComponent implements OnInit {




  constructor(private fb: FormBuilder, private questionService: QuestionsService, private injector: Injector) {
  }

  categories: any[];
  category: any ;
  level: any;
  levels: any[];
  types: any[];
  type: any ;
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
      id: new FormControl(1)
    }),
    type: this.fb.group({
      id: new FormControl(1)
    }),
    category: this.fb.group({
      id: new FormControl(1)
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

  ondLoad() {

    $('#btn-create').attr('disabled', 'disabled');
    const submitBtn = document.getElementById('btn-create') as HTMLInputElement;
    const content = document.getElementById('ques_content') as HTMLInputElement;
    const cate = document.getElementById('category_id') as HTMLInputElement;
    const level = document.getElementById('level_id') as HTMLInputElement;
    const type = document.getElementById('type_id') as HTMLInputElement;

// run this function whenever the values of any of the above 4 inputs change.
// this is to check if the input for all 4 is valid.  if so, enable submitBtn.
// otherwise, disable it.
    const checkEnableButton = () => {
      if (
        (content.value !== '') &&
        (cate.value !== '') &&
        (level.value !== '') &&
        (type.value !== '' ) ) {
        $('#btn-create').removeAttr('disabled');
      }
    };

    content.addEventListener('change', checkEnableButton);
    cate.addEventListener('change', checkEnableButton);
    type.addEventListener('change', checkEnableButton);
    level.addEventListener('change', checkEnableButton);
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
    this.questionService.createQuestion(ques).subscribe(() => {
      document.getElementById('showModal').style.display = 'block';
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
          document.getElementById('show_answer').innerHTML = str;
        }
        // console.log('size trong list == ',size)
      });
    });
  }

   resetFormCreate() {
    $('#ques_content').val('');
  }
  resetFormAnswer() {
    $('#ops').val('');
  }
  resetFormAll() {
    this.resetFormCreate();
    this.resetFormAnswer();
    const str = '';
    document.getElementById('show_answer').innerHTML = str;
    document.getElementById('showModal').style.display = 'none';
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
        this.resetFormAnswer();
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
              this.resetFormAll();
              this.injector.get(LayoutComponent).getAllQuestion();
              // window.location.reload();
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
