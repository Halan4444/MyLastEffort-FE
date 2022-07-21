import {Questions} from '../core/models/question';
import {QuestionsService} from '../service/questions.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';


// export class Questionaries {
//   constructor(private service: QuestionsService) {
//   }
//   QUESTIONS = this.service.getAllquestions();
// }

export const QUESTIONS: Questions[] = [
  {
    id: 1,
    content: 'Russia',
    level: {id: 1},
    category: {id: 1},
    type: {id: 1}
  },
];
