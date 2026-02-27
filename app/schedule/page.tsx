"use client";

import Header from "@/components/header";
import { useEffect, useState } from "react";

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
  const [isLoaded, setisLoaded] = useState<boolean>(false);

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

  function deleteSchedule(id:number) {
    setDayInput(dayInput.filter((item) => item.id != id ))
  }

useEffect(() => {
  const storedActivity = localStorage.getItem('activity');
  if (storedActivity) {
    setDayInput(JSON.parse(storedActivity) as DayActivity[]);
  }
  setisLoaded(true)
} , [])

useEffect(() => {
  if (isLoaded) {
    localStorage.setItem('activity', JSON.stringify(dayInput))
  }
},  [isLoaded, dayInput]);

  return (
    <>
      <Header />
      <main className="border-box py-10 px-12">
        <ul className="grid grid-cols-7 border-l border-t border-stone-900">
          {days.map((day) => (
            
            <li key={day} className="bg-gray-900 p-4 mb-2">
              {day}
                <button
                onClick={() => {
                  addSchedules(day, activity[0], "", "");
                }}
                className=" ml-4 hover:cursor-pointer"
              >
                +
              </button>
        
              <div className="schedule p-2 bg-blue-900">
                {dayInput.filter((item) => item.day === day).map((item) => (
                  <div key={item.id}>
                    <select value={item.activity} onChange={(e) => updateSchedule(item.id, "activity", e.target.value)}>
                      {activity.map((act) => (
                        <option key={act} value={act}>{act}</option>
                      ))}
                    </select>
                    <input type="time" value={item.startTime} onChange={(e) => updateSchedule(item.id, "startTime", e.target.value)}/>
                     <input type="time" value={item.endTime} onChange={(e) => updateSchedule(item.id, "endTime", e.target.value)}/>
                     <button onClick={() => deleteSchedule(item.id)}> Delete </button>
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