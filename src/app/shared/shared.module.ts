import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {SearchBoardFillterPipe} from '../project/search-board-fillter.pipe';
import { QuestionsComponent } from './components/quizzes/questions/questions.component';
import {QuizCreateFormComponent} from './components/quizzes/quiz-create-form/quiz-create-form.component';
import {UserManagementComponent} from '../user-management/user-management.component';
import {LayoutModule} from '../layout/layout.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    SearchBoardFillterPipe,
    QuestionsComponent,
    UserManagementComponent,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
  ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        Ng2SearchPipeModule,
        LayoutModule,
        NgbModule,
    ]
})
export class SharedModule { }
