import {Component, Injectable, OnInit} from '@angular/core';
import {QuestionsService} from '../service/questions.service';
import {User} from '../model/user';
import {AuthenticationService} from '../service/authentication.service';
import {UserService} from '../service/user.service';
import {showPopupError, showToastSuccess} from '../note';



@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
@Injectable({ providedIn: 'root' })
export class UserManagementComponent implements OnInit {
  constructor(private myService: QuestionsService,  private authenticationService: AuthenticationService,
              private userService: UserService) { }
  userList: any[];
  page = 1;
  pageSize = 9;
  total: any;
  userInfo: any;

  deleteId: any;

  ngOnInit() {
    this.getAllUsers();
    this.getUserInfor();
  }


  getUserInfor() {
    this.userService.getUser().subscribe(data => {

      this.userInfo = data;
    }, error => {
      console.log(error);
    });
  }

  getAllUsers() {
    this.myService.getAllUsers().subscribe(users => {
        this.userList = users;
        this.total = this.userList.length;
      },
      error => {
        console.log(error);
      });
  }

  deleteUser(deleteId) {
    this.myService.deleteUser(deleteId).subscribe(() => {
        const title = 'Xóa User Thành Công';
        showToastSuccess(title);
       this.getAllUsers();
      },
      error => {
        const title = 'Thông báo';
        const content = 'Xóa User Thất Bại';
        showPopupError(title, content);
      });
  }
  setDeleteId(deleteId) {
    this.deleteId = deleteId;
  }
}
