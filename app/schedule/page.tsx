
"use client";

import Header from '@/components/header';
import {useState} from 'react';


export default function Schedule1() {


    const days: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const activity: string[] = ["Waking up", "Eating", "School", "Work", "Sleeping"];
    const [dayInput, setDayInput] = useState<string[]>([]);


    function addSchedules(day:string){
        setDayInput([...dayInput, day]);

    }
    return (
        <>
        <Header/>
        <main className='border-box py-10 px-16'>
        <ul className='mt-4'>
            {days.map((day) => (
                <li key={day} className='mb-2'>{day} 
                <button onClick={() => {addSchedules(day)}} className='border-2 rounded-full p-1 hover:cursor-auto'>add</button>
                <div className='schedule'>{dayInput.includes(day) && <h1>test</h1>}</div>
                </li>
                
            ))}
        </ul>
        </main>
        </>
    )
}