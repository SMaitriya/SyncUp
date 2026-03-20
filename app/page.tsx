"use client";

import Header from '@/components/header';
import { useEffect, useState } from 'react';
import { DayActivity } from "@/types"


export default function Home() {

 const date = new Date();
 const hours = date.getHours();
 const minutes = date.getMinutes();
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

      <button className="font-bold">Check {hours}:{minutes.toString().padStart(2, '0')}</button>
      <div className='result'> </div>
       </main>
    </>
  )
}