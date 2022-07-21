import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from './layout.component';
import {QuizCreateFormComponent} from '../shared/components/quizzes/quiz-create-form/quiz-create-form.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
