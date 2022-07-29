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

  getAllTest(): Observable<any> {
    return this.http.get('http://localhost:8080/tests');
  }

  getAllUsers(): Observable<any> {
    return this.http.get('http://localhost:8080/users');
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(`http://localhost:8080/users/${id}`);
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

  searchQuestion(content: any, type: any, category: any, level: any): Observable<any> {
    if (content === null) {
      // tslint:disable-next-line:max-line-length
      return this.http.get<Questions>(`http://localhost:8080/questions/search?contents=&type_id=${type}&category_id=${category}&level_id=${level}`);
    }
    // tslint:disable-next-line:max-line-length
    return this.http.get<Questions>(`http://localhost:8080/questions/search?contents=${content}&type_id=${type}&category_id=${category}&level_id=${level}`);
  }



  createTest(test: any): Observable<any> {
    return this.http.post<any>( 'http://localhost:8080/tests', test);
  }

  addTest(test: any): Observable<any> {
    return this.http.post<any>( 'http://localhost:8080/tests', test);
  }

  addQuestionToTest(quesId: any): Observable<any> {
    // @ts-ignore
    return this.http.get<any>(`http://localhost:8080/questions/${quesId}`);
  }

  findAnswer(answerId: any): Observable<any> {
    // @ts-ignore
    return this.http.get<any>(`http://localhost:8080/questions/${answerId}/answers`);
  }


  findQuestionByTest(testId: any): Observable<any> {
    // @ts-ignore
    return this.http.get<any>(`http://localhost:8080/tests/${testId}/questions`);
  }

  submitTest(currentTest: any): Observable<any> {
    // @ts-ignore
    return this.http.get<any>(`http://localhost:8080/tests/${currentTest}/questions`);
  }

  submitTestAns(answerId: any): Observable<any> {
    // @ts-ignore
    return this.http.get<any>(`http://localhost:8080/questions/${answerId}/answers`);
  }

  submitTestResult(index: any): Observable<any> {
    // @ts-ignore
    return this.http.get<any>(`http://localhost:8080/answers/${index}`);
  }

  submitTestLast(resultObj: any): Observable<any> {
    return this.http.get<any>('http://localhost:8080/results', resultObj);
  }

  compareAnswerQues(resultId: any): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/results/${resultId}`);
  }
  compareAnswerTest(TestId: any): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/tests/${TestId}/questions`);
  }

  compareAnswerResult(answerId: any): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/questions/${answerId}/answers`);
  }

  getResult(resultId: any): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/results/${resultId}`);
  }

  getMark(resultId: any): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/results/get-size?id=${resultId}`);
  }


  createQuestion(question: Questions): Observable<any> {
    return this.http.post<Questions>(this.api, question);
  }

  updateQuestionForm(editid: any): Observable<any> {
    return this.http.get<Questions>(`${this.api}/${editid}`);
  }
  updateCategoriesForm(): Observable<any> {
    return this.http.get<Questions>('http://localhost:8080/categories');
  }
  updateLevelForm(): Observable<any> {
    return this.http.get<Questions>('http://localhost:8080/levels');
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

  updateQuestion(editid: any, question: Questions): Observable<any> {
    return this.http.put<Questions>(`${this.api}/${editid}`, question);
  }

  deleteQuestion(id: any): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

}
