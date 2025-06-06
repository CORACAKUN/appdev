'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false); // ✅ NEW

  useEffect(() => {
    setHasMounted(true); // ✅ Mark component as mounted
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!hasMounted || pathname === '/login' || pathname === '/register' || pathname === '/') return null; // ✅ Prevent early rendering

  const handleLinkClick = () => setMobileMenuOpen(false);

  const commonLinks = (
    <>
      <Link href="/" className="text-white hover:text-blue-600 px-2 py-1 rounded-md bg-gray-800/40 transition" onClick={handleLinkClick}>
        Home
      </Link>
      <Link href="/users" className="text-white hover:text-blue-600 px-2 py-1 rounded-md bg-gray-800/40 transition" onClick={handleLinkClick}>
        Users
      </Link>
      <Link href="/posts" className="text-white hover:text-blue-600 px-2 py-1 rounded-md bg-gray-800/40 transition" onClick={handleLinkClick}>
        Posts
      </Link>
      <Link href="/chart" className="text-white hover:text-blue-600 px-2 py-1 rounded-md bg-gray-800/40 transition" onClick={handleLinkClick}>
        Dashboard
      </Link>
    </>
  );

  return (
    <header className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-md z-10">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-semibold text-white hover:text-blue-600">MyApp</Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-4">
          {pathname !== '/myposts' && commonLinks}
          {user && (
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-black">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-white/70 bg-transparent backdrop-blur flex flex-col items-center justify-center space-y-6 z-30">
          {pathname !== '/myposts' && commonLinks}
          {user && (
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}
