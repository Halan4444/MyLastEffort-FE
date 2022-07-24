import { Injectable } from '@angular/core';
import {LayoutComponent} from './layout.component';

@Injectable({
  providedIn: 'root'
})
export class ResetService {
  constructor(private service: LayoutComponent) { }
  resetAll() {
    this.service.getAllQuestion();
  }
}
