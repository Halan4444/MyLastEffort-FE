import {Component, ElementRef, Injector, OnInit} from '@angular/core';
import {Questions} from '../../core/models/question';
import {Observable} from 'rxjs';
import {ProjectService} from '../../service/project/project.service';
import {QuestionsService} from '../../service/questions.service';
import {FormBuilder, FormControl} from '@angular/forms';
import {showPopupError, showToastSuccess} from '../../note';
import {SidebarComponent} from '../../shared/sidebar/sidebar.component';
import {count} from 'rxjs/operators';
import Timer = NodeJS.Timer;

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private projectService: ProjectService,
              private questionService: QuestionsService,
              private injection: Injector, private elementRef: ElementRef ) { }
  testList: any[] = [];
  total: number;
  p = 1;
  count: number;
  tableSize = 4;
  tableSizes: any = [3, 6, 9, 12];
  page = 1;
  pageSize = 5;
  name: any;
  date: any;
  content: any;
  time = 0;
  display ;
  myUser: any = this.injection.get(SidebarComponent).myUser;
  QuestionList: any[] = [];
  category: any ;
  level: any;
  type: any ;
  ListQuestion: any[] = [];
  currentTest: any;
  endTime: any ;

  collectionSize = this.testList.length;

  deleteQuesId: any;

  createForm = this.fb.group({
    name: new FormControl(),
    level: this.fb.group({
      id: new FormControl(1)
    }),
    user: this.fb.group({
      id: sessionStorage.getItem('id')
    }),
    question: this.QuestionList
  });

  categories: any[];
  types: any[];
  levels: any[];

  searchQuesForm = this.fb.group({
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
  counter = 24;
  interval: any;

  ngOnInit() {
    this.getAllTest();
    this.createTestForm();
  }
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return minutes + ':' + (value - minutes * 60);
  }
  getAllTest() {
    this.questionService.getAllTest().subscribe(data => {
        this.testList = data;
        this.total = this.testList.length;
      },
      error => {
        console.log(error);
      });
  }


  changeTest() {
    document.getElementById('TestId').style.display = 'none';
    document.getElementById('QuestionList').style.display = 'block';
  }


  createTestForm() {
    this.questionService.getAllCategories().subscribe(cate => {
        this.categories = cate;
      },
      error => {
        console.log(error);
      });
    this.questionService.getAllTypes().subscribe(type => {
        this.types = type;
      },
      error => {
        console.log(error);
      });
    this.questionService.getAllLevel().subscribe(level => {
        this.levels = level;
      },
      error => {
        console.log(error);
      });
  }

  createTest() {
    const name = (document.getElementById('test_name')as HTMLInputElement).value;
    const level = (document.getElementById('level_test')as HTMLInputElement).value;
    const test = {
      name,
      level: {
        id: this.createForm.value.level.id
      },
      user: {
        id: sessionStorage.getItem('id')
        // id: 1
      },
      questions: this.ListQuestion    };
    JSON.stringify(test);
    this.questionService.createTest(test).subscribe((data) => {
      const title = 'Tạo Test Thành Công';
      showToastSuccess(title);
      this.getAllTest();
    }, error => {
      const title = 'Thông báo';
      const content = 'Tạo Test Thất Bại';
      showPopupError(title, content);
    });

  }

  searchQuestion() {
    const ques: Questions = this.searchQuesForm.value;
    const cont = this.searchQuesForm.value.content;
    const cate = this.searchQuesForm.value.category.id;
    const type = this.searchQuesForm.value.type.id;
    const level = this.searchQuesForm.value.level.id;
    console.log(cont, cate, type, level);
    this.questionService.searchQuestion(cont, cate, type, level).subscribe((question) => {
      document.getElementById('showModal').style.display = 'block';
      const title = 'Tìm Test Thành Công';
      showToastSuccess(title);
      console.log('ds cau hoi=====' + question);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < question.length; i++) {
        // str1 += '<tr>' + question[i].id + '">' + question[i].level + '</option>';
        this.QuestionList.push(question[i]);
        console.log('question id ==========' + question[i].id);
      }
      document.getElementById('show_ques').style.display = 'block';

    }, error => {
      const title = 'Thông báo';
      const content = 'Tìm Test Thất Bại';
      showPopupError(title, content);
    }); }

  addQuestionToTest(quesId) {
    this.questionService.addQuestionToTest(quesId).subscribe((test) => {
      this.ListQuestion.push(test);
      $('#ques' + quesId).hide();
      const title = 'Thêm Câu Hỏi Thành Công';
      showToastSuccess(title);
    }, error => {
      const title = 'Thông báo';
      const content = 'Thêm Câu Hỏi Thất Bại';
      showPopupError(title, content);
    });
  }

  findQuestionByTest(id) {
    let show = '';
    console.log('testid', id);
    this.currentTest = id;
    localStorage.setItem('idddd', id);
    this.questionService.findQuestionByTest(id).subscribe((question) => {
      this.count = (question.length) * 5 + 1;
      // console.log("question", question)
      show = `
                <div style="margin-top: 100px!important;" class="container-xl">
        <div class="table-responsive" style="overflow:hidden!important; ">
            <div id="submitTest" class="table-wrapper">
                <div class="table-title">
                    <div class="row">
                        <div class="col-sm-6">
                            <h2>Quizz</h2>
                        </div>
                        <div class="col-sm-6" style="display: inline-block">
                            <h2 id="timeout" style="float: right;"></h2>
                        </div>
                    </div>
                </div>
                <table  class="table table-striped table-hover">
                    <thead>
                    </thead>
                    <tbody id="demo">
                `;
      for (let i = 0; i < question.length; i++) {
        const answerId = question[i].id;
        const typeQuestion = question[i].type.id;
        let type = '';
        show +=
          `
                    <tr>
                        <h6 style="margin: 10px 0px">Question ${i + 1}: ${question[i].content}</h6>
                        <div class="form-check" style="margin-left: 10px" id="show${question[i].id}">`;
        const name = i + '';
        this.questionService.findAnswer(answerId).subscribe((answer) => {
          const idques = answer[0].question.id;
          let str = '';
          // tslint:disable-next-line:triple-equals
          if (typeQuestion == 1) {
            type = 'radio';
            // tslint:disable-next-line:triple-equals
          } else if (typeQuestion == 2) {
            type = 'checkbox';
          }
          // tslint:disable-next-line:prefer-for-of no-shadowed-variable
          for (let i = 0; i < answer.length; i++) {
            str += `<input class="form-check-input" type=${type} name="${name}" id="${answer[i].id}" value="${answer[i].id}">
                            <label class="form-check-label">
                                ${answer[i].content}
                            </label></br>`;
          }
          document.getElementById('show' + idques).innerHTML = str;
        });
        show += `</div>
                    </tr>
                    `
        ;
      }
      // tslint:disable-next-line:max-line-length
      show += `</tbody>
                        </table>
            </div>
        </div>
    </div>`;
      document.getElementById('display').innerHTML = show;
      document.getElementById('targets').style.display = `block`;
      $('#targets').appendTo('#submitTest');
      const title = 'Bắt Đầu Làm Quizz';
      showToastSuccess(title);
    }, error => {
      const title = 'Thông báo';
      const content = 'Có Lỗi Rồi';
      showPopupError(title, content);
    });
  }

  countDown() {
    // tslint:disable-next-line:no-unused-expression
    this.count--;
    this.endTime = setTimeout(() => { this.countDown(); }, 1000);
    document.getElementById('timeout').innerHTML = String(this.count);
    if (this.count <= 0) {
      clearTimeout(this.endTime);
      this.submitTest();
      const title = 'Thông báo';
      const content = 'Hết Giờ Rồi Bạn Ơi!';
      showPopupError(title, content);
    }
  }


  submitTest() {
    alert('CÓ vào không ?');
    const answerss = [];
    this.questionService.submitTest(this.currentTest).subscribe((question) => {
        // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < question.length; i++) {
      const answerId = question[i].id;
      this.questionService.submitTest(answerId).subscribe((answer) => {
        // tslint:disable-next-line:prefer-for-of no-shadowed-variable
          for (let i = 0; i < answer.length; i++) {
            const index = answer[i].id;
            // console.log("list cau tra loiw" + index)
            if ((document.getElementById(index)as HTMLInputElement).checked) {
              this.questionService.submitTestResult(index).subscribe((data) => {
                answerss.push(data);
              });
            }
          }
      });
      }
      const result = {
          test: {
            id: this.currentTest
          },
          user: {
            id: sessionStorage.getItem('id')
          },
          mark: 0,
          answers: answerss
        };
        // console.log("tao result truowc")
        // console.log(answerss)

      const resultObj = JSON.stringify(result);
      this.questionService.submitTestLast(resultObj).subscribe((data) => {
        this.compareAnswer(data.id);
        const title = 'Gửi Test Thành Công';
        showToastSuccess(title);
      });
      }
    , error => {
      const title = 'Thông báo';
      const content = 'Gửi Test Thất Bại';
      showPopupError(title, content);
    });
  }

  compareAnswer(resultId) {
    let show = '';
    const listChoosed = [];
    this.questionService.compareAnswerQues(resultId).subscribe((result) => {
      alert("Co vao khong ?")
      const listWrongAnswer = result.answers;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < listWrongAnswer.length; i++) {
        listChoosed.push(listWrongAnswer[i].id);
      }

      // @ts-ignore
      this.questionService.compareAnswerTest(result.test.id).subscribe((question) => {
        show = `
                <div style="margin-top: 100px!important;" class="container-xl">
        <div class="table-responsive">
            <div class="table-wrapper">
                <div class="table-title">
                    <div class="row">
                        <div class="col-sm-6">
                            <h2>Quizz</h2>
                        </div>
                    </div>
                </div>
                <table class="table table-striped table-hover">
                    <thead>
                    </thead>
                    <tbody id="demo">
                `;
        // hien thi danh sach o day
        let answerId;
        let typeQuestion;
        let type = '';
        let name;
        for (let i = 0; i < question.length; i++) {
          answerId = question[i].id;
          typeQuestion = question[i].type.id;
          show +=
            `
                    <tr>
                        <h6 style="margin: 10px 0px">Question ${i + 1}: ${question[i].content}</h6>
                        <div class="form-check" style="margin-left: 10px" id="show${question[i].id}">`;
          name = i + '';
      }
        this.questionService.compareAnswerTest(answerId).subscribe((answer) => {
          const idques = answer[0].question.id;
          let str = '';
          if (typeQuestion === 1) {
            type = 'radio';
          } else if (typeQuestion === 2) {
            type = 'checkbox';
          }
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < answer.length; i++) {
            if (answer[i].status === true) {
              console.log('check========' + typeof (listChoosed));
              if (listChoosed.includes(answer[i].id)) {
                console.log('co lay duoc list vao if k' + answer[i]);
                str += `<input checked class="form-check-input" type=${type} name="${name}" id="${answer[i].id}" value="${answer[i].id}">
                            <label class="form-check-label" style="color: red">
                                ${answer[i].content}
                            </label></br>`;
              } else {
                str += `<input disabled class="form-check-input" type=${type} name="${name}" id="${answer[i].id}" value="${answer[i].id}">
                            <label class="form-check-label" style="color: red">
                                ${answer[i].content}
                            </label></br>`;
              }
            } else {
              if (listChoosed.includes(answer[i].id)) {
                str += `<input checked class="form-check-input" type=${type} name="${name}" id="${answer[i].id}" value="${answer[i].id}">
                            <label class="form-check-label">
                                ${answer[i].content}
                            </label></br>`;
              } else {
                str += `<input disabled class="form-check-input" type=${type} name="${name}" id="${answer[i].id}" value="${answer[i].id}">
                            <label class="form-check-label">
                                ${answer[i].content}
                            </label></br>`;
              }
            }

            //
            //     str += `<input class="form-check-input" type=${type} name="${name}" id="${answer[i].id}" value="${answer[i].id}">
            // <label class="form-check-label">
            //     ${answer[i].content}
            // </label></br>`
          }
          document.getElementById('show' + idques).innerHTML = str;
        }
        );
        show += `</div>
                    </tr>
                    `;
        });
      show += `</tbody> <a href="../home/home.html" type="button" class="btn btn-primary" style="margin-top: 20px;" id="btnSubmit">Back</a>
                        </table>
            </div>
        </div>
    </div>`;
      document.getElementById('display').innerHTML = show;
      this.currentResult(resultId);
      const title = 'Gửi Bài Thành Công';
      showToastSuccess(title);
      },error => {
      const title = 'Thông báo';
      const content = 'Gửi Bài Thất Bại';
      showPopupError(title, content);

    });
  }
    currentResult(resultId) {
      let str = '';
      this.questionService.getResult(resultId).subscribe((result) => {
        const mark = result.mark;
        this.questionService.getMark(result.id).subscribe( (size) => {
          str += `<tr>
                        <h6 style="margin: 10px 0px">Your Result: ${mark} / ${size}</h6>`;
          document.getElementById('demo').innerHTML = str;
        });
      });
    };

}
