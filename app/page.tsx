import Header from '@/components/header';


export default function Home() {

 const date = new Date();
 const hours = date.getHours();
 const minutes = date.getMinutes();


 
  return (
    <>
      <Header/>
      <main className='flex justify-center'>

      <button className="font-bold">Check {hours}{minutes}</button>
      <div className='result'> </div>
       </main>
    </>
  )
}