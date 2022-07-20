import { Component, OnInit } from '@angular/core';
import {Project} from '../model/project';
import {ProjectService} from '../service/project/project.service';
import {SendProjectService} from '../SendProjectService';
import {Questions} from '../core/models/question';
import {QuestionsService} from '../service/questions.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  projects: Project[] = [];

  myProjects: Project[] = [];

  project: Project = {};

  questionList: Questions[] = [];
  total: number;

  constructor(private projectService: ProjectService, private questionService: QuestionsService) {
    this.getAllProjects();
    this.getMyProjects();
    this.getAllProjects();
  }

  ngOnInit(): void {
    this.getAllQuestion();
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


}
