"use client";

import Header from "@/components/header";
import { useEffect, useState } from "react";
import { days, activity, DayActivity } from "@/types"

export default function Schedule1() {
  
  const [dayInput, setDayInput] = useState<DayActivity[]>([]);
  const [isLoaded, setisLoaded] = useState<boolean>(false);

  

  function addSchedules(day: string, activity: string, startTime: string, endTime: string, dayEnd: string) {
    setDayInput([...dayInput, {id: Date.now(), day, activity, startTime, endTime , dayEnd}]);
  }

  function updateSchedule(id:number, field: keyof DayActivity, value: string) {
    setDayInput(dayInput.map((item) => {
  const realStartTime = field === "startTime" ? value : item.startTime;
  const realEndTime = field === "endTime" ? value : item.endTime;
  return item.id === id ? { 
    ...item, 
    [field]: value, 
    dayEnd: realStartTime > realEndTime ? days[(days.indexOf(item.day) + 1) % 7] : "" 
  } : item;
}))}

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
 
console.log(days);
 return (
  <>
    <Header />
    <main className="min-h-screen bg-gray-950 py-10 px-4">
      <div className="grid grid-cols-7 gap-3">
        {days.map((day) => (
          <div key={day} className="bg-gray-900 rounded-xl border border-gray-800 p-3 flex flex-col gap-2">
            
            {/* Days*/}
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                {day}
              </span>
              <button
                onClick={() => addSchedules(day, activity[0], "", "", "")}
                className="w-6 h-6 rounded-full bg-gray-700 hover:bg-indigo-600 text-gray-300 hover:text-white text-sm font-bold transition-colors duration-150 flex items-center justify-center cursor-pointer"
              >
                +
              </button>
            </div>

            {/* Activity card*/}
            <div className="flex flex-col gap-2">
              {dayInput.filter((item) => item.day === day).map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-2 bg-gray-800 rounded-lg border border-gray-700 p-2"
                >
                  {/* Selection activity*/}
                  <select
                    value={item.activity}
                    onChange={(e) => updateSchedule(item.id, "activity", e.target.value)}
                    className="w-full bg-gray-700 text-white text-xs rounded-md px-2 py-1 border border-gray-600 focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    {activity.map((act) => (
                      <option key={act} value={act}>{act}</option>
                    ))}
                  </select>

                  {/* Hours */}
                  <div className="flex gap-1 items-center">
                    <input
                      type="time"
                      value={item.startTime}
                      onChange={(e) => updateSchedule(item.id, "startTime", e.target.value)}
                      className="flex-1 bg-gray-700 text-white text-xs rounded-md px-1 py-1 border border-gray-600 focus:outline-none focus:border-indigo-500"
                    />
                    <span className="text-gray-500 text-xs">→</span>
                    <input
                      type="time"
                      value={item.endTime}
                      onChange={(e) => updateSchedule(item.id, "endTime", e.target.value)}
                      className="flex-1 bg-gray-700 text-white text-xs rounded-md px-1 py-1 border border-gray-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => deleteSchedule(item.id)}
                    className="text-xs text-gray-500 hover:text-red-400 transition-colors duration-150 text-left cursor-pointer"
                  >
                    ✕ Delete
                  </button>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
    </main>
  </>
);
}