import Link from 'next/link'



export default function Header() {
    return (
        <ul className="flex justify-center space-x-3 py-10">
        <li className=""><Link href="/">Home</Link></li>
        <li className=""><Link href="/schedule"> Schedule </Link></li>
         <li className=""><Link href="">My account</Link></li>
        </ul>
    )

}