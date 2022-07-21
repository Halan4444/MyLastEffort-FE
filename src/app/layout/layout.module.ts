import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import {LayoutComponent} from './layout.component';
import {ngbdPaginationBasic} from './pagination-basic';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbdSortableHeader} from './sortable.directive';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    LayoutComponent,
    ngbdPaginationBasic,
    NgbdSortableHeader,

  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NgbModule,
    FormsModule,

  ]
})
export class LayoutModule { }
