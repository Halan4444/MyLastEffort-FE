import {Component, Injector, OnInit} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {QuestionsService} from '../../service/questions.service';
import {Questions} from '../../core/models/question';
import {showPopupError, showToastSuccess} from '../../note';
import {LayoutComponent} from '../layout.component';

@Component({
  selector: 'app-edit-question-modal',
  templateUrl: './edit-question-modal.component.html',
  styleUrls: ['./edit-question-modal.component.css']
})
export class EditQuestionModalComponent implements OnInit {
  content: any;
  categories: any[];
  levels: any[];
  category: any;
  level: any;
  type: any;
  types: any[];

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


  constructor(private fb: FormBuilder, private questionService: QuestionsService, private injection: Injector) { }

  ngOnInit() {
    this.getAllCategoreies();
    this.getAllLevels();
    this.getAllTypes();
  }

  ondLoad() {
    $('#editQues').attr('disabled', 'disabled');
    const content = document.getElementById('edit_ques_content') as HTMLInputElement;
// run this function whenever the values of any of the above 4 inputs change.
// this is to check if the input for all 4 is valid.  if so, enable submitBtn.
// otherwise, disable it.
    const checkEnableButton = () => {
      if (
        (content.value !== '')) {
        $('#editQues').removeAttr('disabled');
      }
    };
    content.addEventListener('change', checkEnableButton);

  }

  removeKey() {
    window.location.reload();
  }


  editedForm() {
    const editid = localStorage.getItem('editid');
    this.questionService.updateQuestionForm(editid).subscribe((data) => {
      $('#edit_ques_content').val(data.content);
      this.createForm.value.type.value = data.type.id;
      this.questionService.updateCategoriesForm().subscribe((cate) => {
        let str0 = '';
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < cate.length; i++) {
          if (cate[i].name === data.category.name) {
            // this.createForm.value.category.value.id.value = cate[i].id;
            str0 += '<option selected="selected" value="' + cate[i].id + '">' + cate[i].name + '</option>';
          } else {
            str0 += '<option  value="' + cate[i].id + '">' + cate[i].name + '</option>';
          }
        }
        document.getElementById('edit_category').innerHTML = str0;
      });
      this.questionService.updateLevelForm().subscribe((level) => {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < level.length; i++) {
          if (level[i].level === data.level.level) {
            this.createForm.value.level.value.id.value = level[i].id;
          }
        }
      });
    });
  }

  editQuestion() {
    const editid = localStorage.getItem('editid');
    const ques: Questions = this.createForm.value;
    this.questionService.updateQuestion(editid, ques).subscribe(() => {
      const title = 'Sửa Quizz Thành Công';
      showToastSuccess(title);
      this.injection.get(LayoutComponent).getAllQuestion();
      localStorage.removeItem('editid');
      window.location.reload();
    },error => {
      const title = 'Thông báo';
      const content = 'Sửa Quizz Thất Bại';
      showPopupError(title, content);
    });
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

}
