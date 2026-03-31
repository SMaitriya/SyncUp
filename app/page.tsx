"use client";

import Header from '@/components/header';
import { useEffect, useState } from 'react';
import { DayActivity } from "@/types"
import { days, activity } from "@/types"



export default function Home() {

 const date = new Date();
 const day = days[(date.getDay() - 1 + 7) % 7]
 const hours = date.getHours();
 const minutes = date.getMinutes();
 const time = hours.toString().padStart(2,'0')+":"+minutes.toString().padStart(2, '0')
 const [storedActivity, setStoredActivity] = useState<DayActivity[]>([])

 useEffect(() => {
  const storedActivity = localStorage.getItem('activity');
  if (storedActivity) {
    setStoredActivity(JSON.parse(storedActivity) as DayActivity[]);
  }
  
 }, [])



 
  return (
    <>
      <Header/>
      <main className='flex justify-center'>

      <div className='result'> {storedActivity.filter( (e) => e.day === day && e.startTime <= time && e.endTime >= time).map((e) => <div key={e.id}> she is at {e.activity} </div>)}</div>
       
       </main>
    </>
  )
}