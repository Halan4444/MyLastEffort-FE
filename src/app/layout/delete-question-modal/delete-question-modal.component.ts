import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-question-modal',
  templateUrl: './delete-question-modal.component.html',
  styleUrls: ['./delete-question-modal.component.css']
})
export class DeleteQuestionModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
showDeleteModal(quesId) {
  localStorage.setItem('deleteid', quesId);
  let str = '';
  // tslint:disable-next-line:max-line-length
  str += '<input type="submit" className="btn btn-danger" onclick="deleteQuestion(' +localStorage.getItem('deleteid') + ')" value="Delete">';
  // console.log(localStorage.getItem("deleteid"))
  document.getElementById('btn-delete-ques').innerHTML = str;
}
}
