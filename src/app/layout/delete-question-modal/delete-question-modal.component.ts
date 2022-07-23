import { Component, OnInit } from '@angular/core';
import {QuestionsService} from '../../service/questions.service';
import {showPopupError, showToastSuccess} from '../../note';
import {Router} from '@angular/router';

@Component({
  selector: 'app-delete-question-modal',
  templateUrl: './delete-question-modal.component.html',
  styleUrls: ['./delete-question-modal.component.css']
})
export class DeleteQuestionModalComponent implements OnInit {
  deleteId: any;

  constructor(private service: QuestionsService, private router: Router) { }

  ngOnInit() {
  }
deleteQuestionModule() {
  const id = localStorage.getItem('deleteid');
  this.deleteId = id;
  this.service.deleteQuestion(id).subscribe(() => {
    const title = 'Xóa Quizz Thành Công';
    showToastSuccess(title);
    window.location.reload();
  }, error => {
    const title = 'Thông báo';
    const content = 'Xóa Quizz Thất Bại';
    showPopupError(title, content);

  });
}
}
