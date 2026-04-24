"use client";

import Header from '@/components/header';
import { useEffect, useState } from 'react';
import { DayActivity } from "@/types"
import { days } from "@/types"
import { Timezone} from "@/types";

const timezones: Timezone[]= [
    {label: "France", tz: "Europe/Paris"},
    {label: "New York", tz: "America/New_York"},
    {label: "Nepal" , tz: "Asia/Kathmandu"},
  ]

export default function Home() {

const [date , setDate] = useState<Date>(new Date());
 const day = days[(date.getDay() - 1 + 7) % 7]
 const hours = date.getHours();
 const minutes = date.getMinutes();
 const time = hours.toString().padStart(2,'0')+":"+minutes.toString().padStart(2, '0')
 const [storedActivity, setStoredActivity] = useState<DayActivity[]>([])
 const [selectTimeZone, setSelectTimeZone] = useState<Timezone>({label: "New York", tz: "America/New_York"})

  useEffect(() => {
  const interval = setInterval(() => {
    setDate(new Date())
  },  60_000)
  return () => clearInterval(interval)

  
 }, [])

const herTime = date.toLocaleTimeString("fr-FR", { 
  timeZone: selectTimeZone.tz,
  hour: "2-digit", 
  minute: "2-digit" 
})

const herDay = date.toLocaleDateString("en-US", { 
  timeZone: selectTimeZone.tz,
  weekday: "long",
})



 useEffect(() => {
  const storedActivity = localStorage.getItem('activity');
  if (storedActivity) {
    setStoredActivity(JSON.parse(storedActivity) as DayActivity[]);
  }
  
 }, [])



 
  return (
    <>
      <Header/>
      <main className=' justify-center'>
        <div className="flex justify-center my-6">
          <select
            value={selectTimeZone.tz}
            onChange={(e) => {
              const found = timezones.find((t) => t.tz === e.target.value)
              if (found) setSelectTimeZone(found);
            }}
            className="bg-gray-900 text-white text-sm rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            {timezones.map((e) => (
              <option key={e.tz} value={e.tz}>{e.label}</option>
            ))}
          </select>
        </div>



        <div className='result '>
          {(() => {
            const current = storedActivity.filter((e) => {
              const today = e.day === herDay; 
              const notOver = e.dayEnd === herDay;
              return (today && ((e.startTime <= herTime && e.endTime >= herTime) || (e.dayEnd !== "" && herTime >= e.startTime))) || (notOver && herTime <= e.endTime);
             });
             return current.length > 0 ? current.map((e) => <div key={e.id} className='mt-4'> She is {e.activity} </div>)
             : "she is free !";
          })()}

        </div>
      
       </main>
    </>
  )
}