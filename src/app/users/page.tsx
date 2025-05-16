'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type User = {
  id: number;
  name: string;
  username: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[] | null>(null); // Set initial to null for loading check

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  if (!users) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <span className="loading loading-spinner text-white w-10 h-10"></span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl text-center font-bold text-white mb-8">Users</h1>

      <div className="space-y-6">
        {users.map(user => (
          <Link key={user.id} href={`/users/${user.id}`}>
            <div className="flex items-center gap-4 m-1 bg-white/10 backdrop-blur-xl border border-white/30 rounded-xl shadow-xl hover:shadow-2xl transition-shadow px-6 py-4 cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg">
                {user.name.charAt(0)}
              </div>
              <div>
                <p className="text-lg font-semibold text-white">{user.name}</p>
                <p className="text-sm text-white/70">@{user.username}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
