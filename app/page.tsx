import Header from '@/components/header';


export default function Home() {
 
  return (
    <>
      <Header/>
      <main className='flex justify-center'>

      <button className="font-bold">Check</button>
      <div className='result'> </div>
       </main>
    </>
  )
}