export interface DayActivity {
    id: number;
    day: string;
    activity: string;
    startTime: string;
    endTime: string;
    dayEnd: string;
  }

  export const days: string[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  export const activity: string[] = [
    "Waking up",
    "Eating",
    "Studying",
    "Working",
    "Sleeping",
  ];

  export interface Timezone {
    label: string;
    tz: string;
  }
