import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Questions} from '../core/models/question';
import {HttpClient} from '@angular/common/http';
import {Answer} from '../core/models/answer';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  api = environment.apiUrl + '/questions';


  constructor(private http: HttpClient) {
  }

  getAllquestions(): Observable<any> {
   return this.http.get(this.api);
  }

  getAllCategories(): Observable<any> {
    return this.http.get('http://localhost:8080/categories');
  }

  getAllLevel(): Observable<any> {
    return this.http.get('http://localhost:8080/levels');
  }

  getAllTypes(): Observable<any> {
    return this.http.get('http://localhost:8080/types');
  }

  getquestionById(id): Observable<any> {
    return this.http.get(`${this.api}/${id}`);
  }

  createQuestion(question: Questions): Observable<any> {
    return this.http.post<Questions>(this.api, question);
  }

  newQuestion(): Observable<any> {
    return this.http.get<Questions>('http://localhost:8080/questions/new-question');
  }
  // tslint:disable-next-line:variable-name
  getAnswer(question_id: any): Observable<any> {
    return this.http.get<Answer>(`${this.api}/${question_id}/answers`, question_id);
  }
  answerResult(index: any, answer: Answer): Observable<any> {
    return this.http.put<Answer>('http://localhost:8080/answers/' + `${index}`, answer);
  }
  addAnswer(answer: Answer): Observable<any> {
    return this.http.post<Answer>('http://localhost:8080/answers', answer);
  }

  updateQuestion(question: Questions): Observable<any> {
    return this.http.put<Questions>(`${this.api}/${question.id}`, question);
  }

  deleteQuestion(id: any): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
