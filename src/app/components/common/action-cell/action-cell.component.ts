import { Component } from '@angular/core';

@Component({
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    class: 'action-cell d-flex justify-content-around',
  },
  // tslint:disable-next-line:component-selector
  selector: '[appActionCell]',
  templateUrl: './action-cell.component.html',
  styleUrls: ['./action-cell.component.scss']
})
export class ActionCellComponent { }
