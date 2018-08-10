import { Component } from '@angular/core';

@Component({
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    class: 'action-bar d-flex justify-content-center',
  },
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
})
export class ActionBarComponent {}
