import {
  Component,
  Input,
  AfterViewInit,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    class: 'confirmation-modal',
  },
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
})
export class ConfirmationModalComponent implements AfterViewInit {
  @ViewChild('vc', { read: ViewContainerRef }) private vc: ViewContainerRef;
  @Input() body: TemplateRef<any>;
  @Input() cancelButtonText = 'Cancel';
  @Input() confirmButtonText = 'Delete';
  @Input() title = 'Confirmation';

  constructor(private activeModal: NgbActiveModal) { }

  ngAfterViewInit() {
    setTimeout(() => this.vc.createEmbeddedView(this.body));
 }

  close() {
    this.activeModal.dismiss();
  }

  confirm() {
    this.activeModal.close();
  }
}
