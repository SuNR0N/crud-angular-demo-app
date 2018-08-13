import {
  Pipe,
  PipeTransform,
} from '@angular/core';
import * as moment from 'moment';

import { DATE_FORMAT } from '../config/config';

@Pipe({
  name: 'momentDate',
})
export class DatePipe implements PipeTransform {
  transform(value: string, format: string = DATE_FORMAT): string {
    const m = moment(value);
    if (m.isValid()) {
      return m.format(format);
    } else {
      return value;
    }
  }
}
