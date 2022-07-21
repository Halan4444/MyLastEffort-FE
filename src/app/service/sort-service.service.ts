/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';

import {Questions} from '../core/models/question';
import {QuestionsService} from '../service/questions.service';
import {SortColumn, SortDirection} from '../layout/sortable.directive';
import {QUESTIONS} from '../layout/questionaries';

interface SearchResult {
  question: Questions[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}


function sort(questions: Questions[], column: SortColumn, direction: string): Questions[] {
  if (direction === '' || column === '') {
    return questions;
  } else {
    return [...questions].sort((a, b) => {
      const res = this.compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(question: Questions, term: string, pipe: PipeTransform) {
  return question.type.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(question.level).includes(term)
    || pipe.transform(question.category).includes(term);
}

@Injectable({providedIn: 'root'})
export class SortService {

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _questions$ = new BehaviorSubject<Questions[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe, private questionService: QuestionsService) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._questions$.next(result.question);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  private compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

  get questions$() {return this._questions$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  // tslint:disable-next-line:adjacent-overload-signatures
  set page(page: number) { this._set({page}); }
  // tslint:disable-next-line:adjacent-overload-signatures
  set pageSize(pageSize: number) { this._set({pageSize}); }
  // tslint:disable-next-line:adjacent-overload-signatures
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: SortColumn) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;
    // 1. sort
    let question: any;
    question = sort(QUESTIONS, sortColumn, sortDirection);
    // 2. filter
    // tslint:disable-next-line:no-shadowed-variable
    question = question.filter(question => matches(question, searchTerm, this.pipe));
    const total = question.length;

    // 3. paginate
    question = question.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({question, total});
  }
}