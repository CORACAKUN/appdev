'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

type User = {
  id: number;
  name: string;
};

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return;

    const user = JSON.parse(storedUser);
    const isAdmin = user.isAdmin === true;
    const userId = user.id;

    Promise.all([
      fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json()),
      fetch('https://jsonplaceholder.typicode.com/users').then((res) => res.json()),
    ]).then(([postsData, usersData]) => {
      if (isAdmin) {
        setPosts(postsData);
      } else {
        setPosts(postsData.filter((post: Post) => post.userId === userId));
      }
      setUsers(usersData);
      setLoading(false);
    });
  }, []);

  const getRandomTimeAgo = () => {
    const times = ['1 day ago', '2 days ago', '3 days ago', '1 week ago', '2 weeks ago'];
    return times[Math.floor(Math.random() * times.length)];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">News Feed</h1>
      <div className="space-y-6">
        {posts.map(post => {
          const user = users.find(user => user.id === post.userId);

          return (
            <Link
              key={post.id}
              href={`/posts/${post.id}`}
              className="block bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl px-6 py-4 transform transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-lg cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                  {user?.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-white">{user?.name}</p>
                  <p className="text-xs text-white/70">{getRandomTimeAgo()}</p>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-white mb-2">{post.title}</h2>
              <p className="text-white mb-1 line-clamp-2">{post.body}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
