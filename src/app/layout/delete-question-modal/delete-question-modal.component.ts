import {Component, Injector, OnInit} from '@angular/core';
import {QuestionsService} from '../../service/questions.service';
import {showPopupError, showToastSuccess} from '../../note';
import {Router} from '@angular/router';
import {delay} from 'rxjs/operators';
import {LayoutComponent} from '../layout.component';

@Component({
  selector: 'app-delete-question-modal',
  templateUrl: './delete-question-modal.component.html',
  styleUrls: ['./delete-question-modal.component.css']
})
export class DeleteQuestionModalComponent implements OnInit {
  deleteId: any;

  constructor(private service: QuestionsService, private router: Router, private injection: Injector) { }

  ngOnInit() {
  }
deleteQuestionModule() {
  const id = this.injection.get(LayoutComponent).deleteQuesId;
  this.deleteId = id;
  this.service.deleteQuestion(id).subscribe( () => {
    const title = 'Xóa Quizz Thành Công';
    showToastSuccess(title);
    this.injection.get(LayoutComponent).getAllQuestion();
  }, error => {
    const title = 'Thông báo';
    const content = 'Xóa Quizz Thất Bại';
    showPopupError(title, content);

  });
}
}
