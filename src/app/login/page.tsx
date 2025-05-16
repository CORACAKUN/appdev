'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // 🔹 Loading state
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // 🔹 Start loading

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (cleanEmail === 'admin@admin.com' && cleanPassword === 'admin123') {
      const adminUser = {
        id: 0,
        name: 'Admin',
        email: 'admin@admin.com',
        isAdmin: true,
      };
      localStorage.setItem('user', JSON.stringify(adminUser));
      setTimeout(() => {
        router.push('/posts');
      }, 100);
      return;
    }

    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();

    const user = users.find((u: any) => u.email.toLowerCase() === cleanEmail);

    if (user && cleanPassword === user.username) {
      localStorage.setItem('user', JSON.stringify({ ...user, isAdmin: false }));
      router.push('/myposts');
    } else {
      setError('Invalid credentials. Please check your email and password.');
    }

    setLoading(false); // 🔹 Stop loading
  };

return (
  <div className="fixed inset-0 flex items-center justify-center">
    {/* 🔻 Fullscreen Loading Overlay */}
    {loading && (
      <div className="fixed inset-0 z-50 bg-transparent backdrop-blur-xl flex items-center justify-center">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500 border-solid"></div>
      </div>
    )}

    {/* Polyglass Morphism Parent Container */}
    <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/30">
      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-white mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="e.g. user@example.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-transparent text-white placeholder-white/70"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-transparent text-white placeholder-white/70"
          />
        </div>

        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}

        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Log In
          </button>
        </div>

        <div className="text-center mt-4">
          <a href="/register" className="text-blue-500 hover:underline text-sm">
            Don’t have an account? Register
          </a>
        </div>
      </form>
    </div>
  </div>
);

}
