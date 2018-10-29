import { format } from 'date-fns';

export namespace TimeUtils {
  const dayFormat = 'yyyy-MM-dd';
  const timeFormat = "yyyy-MM-dd'T'HH:mm:ssZ";

  export const toDayFormat = (date: Date) => {
    return format(date, dayFormat);
  };

  export const toTimeFormat = (date: Date) => {
    return format(date, timeFormat);
  };
}
