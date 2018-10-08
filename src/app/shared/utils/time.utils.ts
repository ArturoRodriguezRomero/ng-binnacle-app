import { format } from 'date-fns';

export namespace TimeUtils {
  const apiFormat = "yyyy-MM-dd'T'HH:mm:ssZ";

  export const toServerFormat = (date: Date) => {
    return format(date, apiFormat);
  };
}
