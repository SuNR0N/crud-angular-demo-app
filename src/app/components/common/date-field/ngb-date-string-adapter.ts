import { Injectable } from '@angular/core';
import {
  NgbDateAdapter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class NgbDateStringAdapter extends NgbDateAdapter<string> {

  fromModel(date: string): NgbDateStruct {
    if (!date) {
      return null;
    }
    const dateParts = date.split('-');
    const [ year, month, day ] = dateParts.map((part) => parseInt(part, 10));
    return {
      year,
      month,
      day,
    };
  }

  toModel(date: NgbDateStruct): string {
    if (!date) {
      return null;
    }
    const paddedDay = `${date.day}`.padStart(2, '0');
    const paddedMonth = `${date.month}`.padStart(2, '0');
    return `${date.year}-${paddedMonth}-${paddedDay}`;
  }
}
