import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import {LayoutComponent} from './layout.component';
import {ngbdPaginationBasic} from './pagination-basic';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbdSortableHeader} from './sortable.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddQuestionModalComponent } from './add-question-modal/add-question-modal.component';
import { EditQuestionModalComponent } from './edit-question-modal/edit-question-modal.component';
import { DeleteQuestionModalComponent } from './delete-question-modal/delete-question-modal.component';
import {MainTitleComponent} from './main-title/main-title.component';


@NgModule({
    declarations: [
        LayoutComponent,
        ngbdPaginationBasic,
        NgbdSortableHeader,
        AddQuestionModalComponent,
        EditQuestionModalComponent,
        DeleteQuestionModalComponent,
        MainTitleComponent,
        MainTitleComponent,
    ],
  exports: [
    MainTitleComponent,
    MainTitleComponent
  ],
    imports: [
        CommonModule,
        LayoutRoutingModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,

    ]
})
export class LayoutModule { }
