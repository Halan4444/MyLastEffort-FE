import {Component, Injectable, OnInit} from '@angular/core';



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
  constructor() { }

  ngOnInit() {
  }

  getDeleteId(param: any[]) {
    
  }
}
