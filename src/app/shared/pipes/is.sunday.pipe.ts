import { Pipe, PipeTransform } from '@angular/core';

import { addMinutes, setSeconds, toDate } from 'date-fns';
import { isSunday } from 'date-fns/esm';

/*
 * Checks if a date is Sunday.
 * Takes a date argument.
 * Usage:
 *   date | IsSunday
 * Example:
 *   
 *   {{ date | isSunday }}
 *   formats to: true | false
*/
@Pipe({ name: 'isSunday' })
export class IsSundayPipe implements PipeTransform {
  transform(date: Date): boolean {
    return isSunday(date);
  }
}
