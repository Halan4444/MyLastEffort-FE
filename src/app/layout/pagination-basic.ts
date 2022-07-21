import {Component} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ngbd-pagination-basic',
  templateUrl: './layout.component.html'
})
export class ngbdPaginationBasic {
  pageSize = 25;
  page = 4;
}
