import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Project} from '../model/project';
import {ProjectService} from '../service/project/project.service';
import {SendProjectService} from '../SendProjectService';
import {Questions} from '../core/models/question';
import {QuestionsService} from '../service/questions.service';
import {NgbdSortableHeader, SortEvent} from './sortable.directive';
import {SortService} from '../service/sort-service.service';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  projects: Project[] = [];

  myProjects: Project[] = [];

  project: Project = {};

  questionList: Questions[] = [];
  total: number;

  POSTS: any;
  p = 1;
  count = 0;
  tableSize = 4;
  tableSizes: any = [3, 6, 9, 12];
  page = 1;
  pageSize = 5;
   questionList$: Observable<any>;
   total$: Observable<any>;


  constructor(private projectService: ProjectService, private questionService: QuestionsService, private service: SortService) {
    this.getAllProjects();
    this.getMyProjects();
    this.getAllProjects();
    this.questionList$ = service.questions$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
    this.getAllQuestion();
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  getAllQuestion() {
    this.questionService.getAllquestions().subscribe(data => {
      this.questionList = data;
      this.total = this.questionList.length;
    },
      error => {
      console.log(error);
      });
  }

  getMyProjects() {
    this.projectService.getProjectByProjectOwner().subscribe(
      data => {
        this.myProjects = data;
      },
      error => {
        console.log(error);
      }
    );
  }


  getAllProjects() {
    this.projectService.getAllProjects().subscribe(
      data => {
        this.projects = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  // onTableDataChange(event: any) {
  //   this.page = event;
  //   this.getAllQuestion();
  // }
  // onTableSizeChange(event: any): void {
  //   this.tableSize = event.target.value;
  //   this.page = 1;
  //   this.getAllQuestion();
  // }



}
