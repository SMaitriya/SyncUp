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
    <main className="min-h-screen bg-gray-950 py-6 px-3 sm:py-10 sm:px-4">
      <div className="overflow-x-auto pb-4 custom-scrollbar">
        <div className="grid grid-cols-7 gap-3 min-w-[1000px] xl:min-w-0">
          {days.map((day) => (
            <div key={day} className="bg-gray-900 rounded-xl border border-gray-800 p-3 flex flex-col gap-3 min-w-[140px]">
              
              {/* Days Header */}
              <div className="flex items-center justify-between mb-1 border-b border-gray-800 pb-2">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-tighter truncate">
                  {day}
                </span>
                <button
                  onClick={() => addSchedules(day, activity[0], "", "", "")}
                  className="w-5 h-5 flex-shrink-0 rounded-md bg-indigo-900/30 hover:bg-indigo-600 text-indigo-400 hover:text-white text-xs transition-all flex items-center justify-center cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Activity cards */}
              <div className="flex flex-col gap-3">
                {dayInput.filter((item) => item.day === day).map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-2 bg-gray-800/50 rounded-lg border border-gray-700 p-2 hover:border-gray-600 transition-colors"
                  >
                    {/* Select activity */}
                    <select
                      value={item.activity}
                      onChange={(e) => updateSchedule(item.id, "activity", e.target.value)}
                      className="w-full bg-gray-900 text-white text-[11px] rounded-md px-2 py-1.5 border border-gray-700 focus:outline-none focus:border-indigo-500 cursor-pointer appearance-none"
                    >
                      {activity.map((act) => (
                        <option key={act} value={act}>{act}</option>
                      ))}
                    </select>

                    {/* Hours */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] text-gray-500 uppercase font-bold">Début</label>
                        <input
                          type="time"
                          value={item.startTime}
                          onChange={(e) => updateSchedule(item.id, "startTime", e.target.value)}
                          className="w-full bg-gray-900 text-white text-[11px] rounded-md px-2 py-1 border border-gray-700 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] text-gray-500 uppercase font-bold">Fin</label>
                        <input
                          type="time"
                          value={item.endTime}
                          onChange={(e) => updateSchedule(item.id, "endTime", e.target.value)}
                          className="w-full bg-gray-900 text-white text-[11px] rounded-md px-2 py-1 border border-gray-700 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => deleteSchedule(item.id)}
                      className="text-[10px] text-gray-500 hover:text-red-400 transition-colors pt-1 border-t border-gray-700/50 mt-1 flex items-center gap-1 cursor-pointer"
                    >
                      <span>✕</span> Supprimer
                    </button>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>
    </main>
  </>
);
}