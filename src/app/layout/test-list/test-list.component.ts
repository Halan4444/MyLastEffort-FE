import {Component, ElementRef, Injector, OnInit} from '@angular/core';
import {Questions} from '../../core/models/question';
import {Observable} from 'rxjs';
import {ProjectService} from '../../service/project/project.service';
import {QuestionsService} from '../../service/questions.service';
import {FormBuilder, FormControl} from '@angular/forms';
import {showPopupError, showToastSuccess} from '../../note';
import {SidebarComponent} from '../../shared/sidebar/sidebar.component';

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
  count = 0;
  tableSize = 4;
  tableSizes: any = [3, 6, 9, 12];
  page = 1;
  pageSize = 5;
  name: any;
  date: any;
  content: any;

  myUser: any = this.injection.get(SidebarComponent).myUser;
  QuestionList: any[] = [];
  category: any ;
  level: any;
  type: any ;
  ListQuestion: any[] = [];

  collectionSize = this.testList.length;

  deleteQuesId: any;

  createForm = this.fb.group({
    name: this.name,
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

  ngOnInit() {
    this.getAllTest();
    this.createTestForm();
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
    // let name = (document.getElementById('test_name')as HTMLInputElement).value;
    // let level = (document.getElementById('level_test')as HTMLInputElement).value;
    this.questionService.createTest(this.createForm).subscribe((test) => {
      const title = 'Tạo Test Thành Công';
      showToastSuccess(title);
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

}
