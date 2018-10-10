import { TimeUtils } from '../../shared/utils/time.utils';

export namespace Endpoints {
  export namespace Activity {
    export const getById = (id: number) => {
      return `activity/${id}`;
    };
  }
  export namespace Activities {
    export const getByDates = (startDate: Date, endDate: Date) => {
      return `activitiesByDates?startDate=${TimeUtils.toServerFormat(
        startDate
      )}&endDate=${TimeUtils.toServerFormat(endDate)}`;
    };

    export const getActivitiesTimeByDates = (
      startDate: Date,
      endDate: Date
    ) => {
      return `activitiesTime?startDate=${TimeUtils.toServerFormat(
        startDate
      )}&endDate=${TimeUtils.toServerFormat(endDate)}`;
    };

    export const getImputedDaysByDates = (startDate: Date, endDate: Date) => {
      return `imputedDays?startDate=${TimeUtils.toServerFormat(
        startDate
      )}&endDate=${TimeUtils.toServerFormat(endDate)}`;
    };
  }
}
