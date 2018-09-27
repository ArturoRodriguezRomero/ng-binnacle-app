export class Endpoints {
  public static Activity: Activity;
  public static Activities: Activities;
}

class Activity {
  getById = (id: number) => {
    return `activity/${id}`;
  };
}

class Activities {
  getByDay = (day: Date) => {
    return `activitiesByDay?date=${day}`;
  };

  getByDates = (startDate: Date, endDate: Date) => {
    return `activitiesByDates?startDate=${startDate}&endDate=${endDate}`;
  };
}
