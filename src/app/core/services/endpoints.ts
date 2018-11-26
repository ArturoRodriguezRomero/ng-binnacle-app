import { TimeUtils } from '../../shared/utils/time.utils';

export namespace Endpoints {
  const baseEndpoint = 'api';

  export namespace Authentication {
    export const getToken = () => {
      return `oauth/token`;
    };
  }

  export namespace Activity {
    export const getById = (id: number) => {
      return `${baseEndpoint}/activity/${id}`;
    };

    export const addNew = () => {
      return `${baseEndpoint}/activity`;
    };

    export const modify = () => {
      return `${baseEndpoint}/activity`;
    };

    export const deleteById = (id: number) => {
      return `${baseEndpoint}/activity/${id}`;
    };
  }
  export namespace Activities {
    export const getByDates = (startDate: Date, endDate: Date) => {
      return `${baseEndpoint}/activities?startDate=${TimeUtils.toDayFormat(
        startDate
      )}&endDate=${TimeUtils.toDayFormat(endDate)}`;
    };

    export const getActivitiesTimeByDates = (
      startDate: Date,
      endDate: Date
    ) => {
      return `${baseEndpoint}/activitiesTime?startDate=${TimeUtils.toTimeFormat(
        startDate
      )}&endDate=${TimeUtils.toTimeFormat(endDate)}`;
    };

    export const getImputedDaysByDates = (startDate: Date, endDate: Date) => {
      return `${baseEndpoint}/imputedDays?startDate=${TimeUtils.toTimeFormat(
        startDate
      )}&endDate=${TimeUtils.toTimeFormat(endDate)}`;
    };
  }

  export namespace Holidays {
    export const getPublicHolidaysByYear = (year: number) => {
      return `${baseEndpoint}/holidays?year=${year}`;
    };

    export const getPrivateHolidaysThisYear = () => {
      return `${baseEndpoint}/vacations`;
    };
  }
  export namespace Organizations {
    export const getAll = () => {
      return `${baseEndpoint}/organizations`;
    };
  }

  export namespace Projects {
    export const getByOrganziationId = (id: number) => {
      return `${baseEndpoint}/organization/${id}/projects`;
    };
  }

  export namespace Roles {
    export const getByProjectId = (id: number) => {
      return `${baseEndpoint}/project/${id}/roles`;
    };
  }
}
