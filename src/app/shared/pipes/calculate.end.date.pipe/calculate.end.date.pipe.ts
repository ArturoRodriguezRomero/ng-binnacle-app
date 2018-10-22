import { Pipe, PipeTransform } from '@angular/core';

import { addMinutes, setSeconds, toDate } from 'date-fns';

/*
 * Returns the endDate from a stardDate plus minutes.
 * Takes a startDate and a minutes argument.
 * Usage:
 *   startDate | calculateEndDate:minutes
 * Example:
 *   const startDate = "2010/10/10:12:00"
 *   {{ startDate | calculateEndDate:75 }}
 *   formats to: 2010/10/10:13:15
*/
@Pipe({ name: 'calculateEndDate' })
export class CalculateEndDatePipe implements PipeTransform {
  transform(startDate: Date, minutes: number): Date {
    const endDate = setSeconds(addMinutes(toDate(startDate), minutes), 0);
    return endDate;
  }
}
