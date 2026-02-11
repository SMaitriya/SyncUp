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
    id: number;
    day: string;
    activity: string;
    startTime: string;
    endTime: string;
  }

  function addSchedules(day: string, activity: string, startTime: string, endTime: string) {
    setDayInput([...dayInput, {id: Date.now(), day, activity, startTime, endTime }]);
  }

  function updateSchedule(id:number, field: keyof DayActivity, value: string) {
    setDayInput(dayInput.map((item) => item.id === id ? { ...item, [field]: value} : item))
     
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
                  addSchedules(day, activity[0], "", "");
                }}
                className="border-2 rounded-full p-1 hover:cursor-pointer"
              >
                add
              </button>
              <div className="schedule">
                {dayInput.filter((item) => item.day === day).map((item) => (
                  <div key={item.id}>
                    <select value={item.activity} onChange={(e) => updateSchedule(item.id, "activity", e.target.value)}>
                      {activity.map((act) => (
                        <option key={act} value={act}>{act}</option>
                      ))}
                    </select>
                    <input type="time" value={item.startTime} onChange={(e) => updateSchedule(item.id, "startTime", e.target.value)}/>
                     <input type="time" value={item.endTime} onChange={(e) => updateSchedule(item.id, "endTime", e.target.value)}/>
                  </div>
                ))}
              
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}