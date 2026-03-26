"use client";

import Header from '@/components/header';
import { useEffect, useState } from 'react';
import { DayActivity } from "@/types"
import { days, activity } from "@/types"



export default function Home() {

 const date = new Date();
 const day = days[(date.getDay() - 1 + 7) % 7]
 console.log(day)
 const hours = date.getHours();
 const minutes = date.getMinutes();
 const [storedActivity, setStoredActivity] = useState<DayActivity[]>([])

 useEffect(() => {
  const storedActivity = localStorage.getItem('activity');
  if (storedActivity) {
    setStoredActivity(JSON.parse(storedActivity) as DayActivity[]);
    console.log(storedActivity);
  }
  
 }, [])



 
  return (
    <>
      <Header/>
      <main className='flex justify-center'>

      <div className="font-bold"> {hours}:{minutes.toString().padStart(2, '0')}</div>
      <div className='result'> {storedActivity.filter( (e) => e.day === day).map((e) => <div key={e.id}> she is at {e.activity} </div>)}</div>
       
       </main>
    </>
  )
}