import Link from 'next/link'



export default function Header() {
  return (
    <header className="bg-gray-900 border-b border-gray-800 px-8 py-4 flex items-center justify-between">
      
      <span className="text-white font-semibold tracking-wide">SyncUp</span>

      <nav>
        <ul className="flex items-center gap-6">
          <li>
            <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors duration-150">
              Home
            </Link>
          </li>
          <li>
            <Link href="/schedule" className="text-sm text-gray-400 hover:text-white transition-colors duration-150">
              Schedule
            </Link>
          </li>
          <li>
            <Link href="/account" className="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg transition-colors duration-150">
              My Account
            </Link>
          </li>
        </ul>
      </nav>

    </header>
  );
}