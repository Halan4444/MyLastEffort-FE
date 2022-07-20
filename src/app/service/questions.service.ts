import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Questions} from '../core/models/question';
import {HttpClient} from '@angular/common/http';

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

  getquestionById(id): Observable<any> {
    return this.http.get(`${this.api}/${id}`);
  }

  create(question: Questions): Observable<any> {
    return this.http.post<Questions>(this.api, question);
  }

  update(question: Questions): Observable<any> {
    return this.http.put<Questions>(`${this.api}/${question.id}`, question);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
