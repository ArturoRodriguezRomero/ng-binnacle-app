import { TimeUtils } from '../../shared/utils/time.utils';

export namespace Endpoints {
  export namespace Activity {
    export const getById = (id: number) => {
      return `activity/${id}`;
    };

    export const addNew = () => {
      return `activity`;
    };

    export const modify = () => {
      return `activity`;
    };

    export const deleteById = (id: number) => {
      return `activity/${id}`;
    };
  }
  export namespace Activities {
    export const getByDates = (startDate: Date, endDate: Date) => {
      return `activities?startDate=${TimeUtils.toDayFormat(
        startDate
      )}&endDate=${TimeUtils.toDayFormat(endDate)}`;
    };

    export const getActivitiesTimeByDates = (
      startDate: Date,
      endDate: Date
    ) => {
      return `activitiesTime?startDate=${TimeUtils.toTimeFormat(
        startDate
      )}&endDate=${TimeUtils.toTimeFormat(endDate)}`;
    };

    export const getImputedDaysByDates = (startDate: Date, endDate: Date) => {
      return `imputedDays?startDate=${TimeUtils.toTimeFormat(
        startDate
      )}&endDate=${TimeUtils.toTimeFormat(endDate)}`;
    };
  }

  export namespace Holidays {
    export const getPublicHolidaysByYear = (year: number) => {
      return `holidays?year=${year}`;
    };

    export const getPrivateHolidaysThisYear = () => {
      return `vacations`;
    };
  }
  export namespace Organizations {
    export const getAll = () => {
      return `organizations`;
    };
  }

  export namespace Projects {
    export const getByOrganziationId = (id: number) => {
      return `organization/${id}/projects`;
    };
  }

  export namespace Roles {
    export const getByProjectId = (id: number) => {
      return `project/${id}/roles`;
    };
  }
}
