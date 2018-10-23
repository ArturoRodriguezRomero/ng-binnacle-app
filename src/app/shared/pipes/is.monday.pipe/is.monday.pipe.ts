import { Pipe, PipeTransform } from '@angular/core';

import { isMonday } from 'date-fns';

/*
 * Checks if a date is Monday.
 * Takes a date argument.
 * Usage:
 *   date | IsMonday
 * Example:
 *   
 *   {{ date | isMonday }}
 *   formats to: true | false
*/
@Pipe({ name: 'isMonday' })
export class IsMondayPipe implements PipeTransform {
  transform(date: Date): boolean {
    return isMonday(date);
  }
}
