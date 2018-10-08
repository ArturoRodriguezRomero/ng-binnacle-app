import { TimeUtils } from '../../shared/utils/time.utils';

export namespace Endpoints {
  export namespace Activity {
    export const getById = (id: number) => {
      return `activity/${id}`;
    };
  }
  export namespace Activities {
    export const getByDay = (day: Date) => {
      return `activitiesByDay?date=${day}`;
    };

    export const getByDates = (startDate: Date, endDate: Date) => {
      console.log(
        `activitiesByDates?startDate=${TimeUtils.toServerFormat(
          startDate
        )}&endDate=${TimeUtils.toServerFormat(endDate)}`
      );
      return `activitiesByDates?startDate=${TimeUtils.toServerFormat(
        startDate
      )}&endDate=${TimeUtils.toServerFormat(endDate)}`;
    };
  }
}
