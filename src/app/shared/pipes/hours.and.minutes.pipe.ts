import { Pipe, PipeTransform } from '@angular/core';

/*
 * Displays minutes with hours:moduleMinutes.
 * Takes a totalMinutes argument.
 * Usage:
 *   totalMinutes | HoursAndMinutesPipe
 * Example:
 *   {{ 75 | HoursAndMinutesPipe }}
 *   formats to: 1:15
*/
@Pipe({ name: 'hoursAndMinutes' })
export class HoursAndMinutesPipe implements PipeTransform {
  transform(totalMinutes: number): string {
    const hours = Math.trunc(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const minutePrefix = minutes < 10 ? '0' : '';

    return `${Math.abs(hours)}:${minutePrefix}${Math.abs(minutes)}`;
  }
}
