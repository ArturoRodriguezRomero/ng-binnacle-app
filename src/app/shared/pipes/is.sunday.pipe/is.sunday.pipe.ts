import { Pipe, PipeTransform } from '@angular/core';

import { isSunday } from 'date-fns';

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
