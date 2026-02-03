"use client";

import Header from "@/components/header";
import { useState } from "react";

export default function Schedule1() {
  const days: string[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const activity: string[] = [
    "Waking up",
    "Eating",
    "School",
    "Work",
    "Sleeping",
  ];
  const [dayInput, setDayInput] = useState<DayActivity[]>([]);
  const [activityInput, setActivityInput] = useState<string>('');
    const [startTimeInput, setStartTimeInput] = useState<string>('');
      const [endTimeInput, setEndTimeInput] = useState<string>('');

  interface DayActivity {
    day: string;
    activity: string;
    startTime: string;
    endTime: string;
  }

  function addSchedules(day: string, activity: string, startTime: string, endTime: string) {
    setDayInput([...dayInput, {day: day, activity: act, startTime: startT, endTime: endT}]);
  }
  return (
    <>
      <Header />
      <main className="border-box py-10 px-16">
        <ul className="mt-4">
          {days.map((day) => (
            <li key={day} className="mb-2">
              {day}
              <button
                onClick={() => {
                  addSchedules(day);
                }}
                className="border-2 rounded-full p-1 hover:cursor-auto"
              >
                add
              </button>
              <div className="schedule">
                {dayInput.includes(day) && (
                    <>
                  <select>
                    {activity.map((act) => (
                      <option value={act}>{act}</option>
                    ))}
                  </select>
                  <input type="time"></input>
                   </>
                )}
               
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}