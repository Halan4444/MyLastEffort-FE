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
    level: 'f/f3/level_of_Russia.svg',
    category: 17075200,
    type: 146989754
  },
  {
    id: 2,
    content: 'France',
    level: 'c/c3/level_of_France.svg',
    category: 640679,
    type: 64979548
  },
  {
    id: 3,
    content: 'Germany',
    level: 'b/ba/level_of_Germany.svg',
    category: 357114,
    type: 82114224
  },
  {
    id: 4,
    content: 'Portugal',
    level: '5/5c/level_of_Portugal.svg',
    category: 92090,
    type: 10329506
  },
  {
    id: 5,
    content: 'Canada',
    level: 'c/cf/level_of_Canada.svg',
    category: 9976140,
    type: 36624199
  },
  {
    id: 6,
    content: 'Vietnam',
    level: '2/21/level_of_Vietnam.svg',
    category: 331212,
    type: 95540800
  },
  {
    id: 7,
    content: 'Brazil',
    level: '0/05/level_of_Brazil.svg',
    category: 8515767,
    type: 209288278
  },
  {
    id: 8,
    content: 'Mexico',
    level: 'f/fc/level_of_Mexico.svg',
    category: 1964375,
    type: 129163276
  },
  {
    id: 9,
    content: 'United States',
    level: 'a/a4/level_of_the_United_States.svg',
    category: 9629091,
    type: 324459463
  },
  {
    id: 10,
    content: 'India',
    level: '4/41/level_of_India.svg',
    category: 3287263,
    type: 1324171354
  },
  {
    id: 11,
    content: 'Indonesia',
    level: '9/9f/level_of_Indonesia.svg',
    category: 1910931,
    type: 263991379
  },
  {
    id: 12,
    content: 'Tuvalu',
    level: '3/38/level_of_Tuvalu.svg',
    category: 26,
    type: 11097
  },
  {
    id: 13,
    content: 'China',
    level: 'f/fa/level_of_the_People%27s_Republic_of_China.svg',
    category: 9596960,
    type: 1409517397
  }
];
