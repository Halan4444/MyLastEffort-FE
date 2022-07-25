import {Component, Injectable, OnInit} from '@angular/core';
import {QuestionsService} from '../service/questions.service';
import {User} from '../model/user';
import {AuthenticationService} from '../service/authentication.service';
import {UserService} from '../service/user.service';



@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
@Injectable({ providedIn: 'root' })
export class UserManagementComponent implements OnInit {
  userList: any[];
  page = 1;
  pageSize = 5;
  total: any;
  userInfo: any;
  constructor(private myService: QuestionsService,  private authenticationService: AuthenticationService,
              private userService: UserService) { }

  ngOnInit() {
    this.getAllUsers();
    this.getUserInfor();
  }

  getDeleteId(param: any[]) {
  }

  getUserInfor() {
    this.userService.getUser().subscribe(data => {
      console.log(data);
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

  deleteUser(){
    this.myService.getAllUsers().subscribe(users => {
        this.userList = users;
        this.total = this.userList.length;
      },
      error => {
        console.log(error);
      });
  }
}
