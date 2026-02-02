
import Header from '@/components/header';


export default function Schedule1() {
    const days: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const activity: string[] = ["Waking up", "Eating", "School", "Work", "Sleeping"]
    return (
        <>
        <Header/>
        <main className='border-box py-10 px-16'>
        <ul className='mt-4'>
            {days.map((day) => (
                <li key={day} className='mb-2'>{day} <button className='border-2 rounded-full p-1 hover:cursor-auto'>add</button></li>
                
            ))}
        </ul>
        </main>
        </>
    )
}