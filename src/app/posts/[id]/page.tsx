'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

type Post = { id: number; title: string; body: string; userId: number };
type Comment = { id: number; name: string; email: string; body: string };

export default function PostDetailPage() {
  const router = useRouter();
  const params = useParams();
  const postId = Number(params?.id);

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [backLoading, setBackLoading] = useState(false);

  useEffect(() => {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      router.push('/login');
      return;
    }

    const user = JSON.parse(userJson);

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(res => res.json())
      .then(data => {
        if (!user.isAdmin && data.userId !== user.id) {
          router.push('/posts');
        } else {
          setPost(data);
        }
      });

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then(res => res.json())
      .then(setComments)
      .finally(() => setLoading(false));
  }, [postId, router]);

  const handleBack = () => {
    setBackLoading(true);
    setTimeout(() => router.push('/posts'), 500); // delay for animation feel
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return <p className="p-6 text-red-500">Post not found or not accessible.</p>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto py-10 px-4">
      <button
        onClick={handleBack}
        className="inline-block mb-10 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
        disabled={backLoading}
      >
        {backLoading ? (
          <div className="w-5 h-5 border-2 border-white border-dashed rounded-full animate-spin mx-auto" />
        ) : (
          'Back to Posts'
        )}
      </button>

      <div className="bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl px-6 py-6 mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
            {post.userId}
          </div>
          <div>
            <p className="font-medium text-white">User {post.userId}</p>
            <p className="text-xs text-white/70">Posted just now</p>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">{post.title}</h1>
        <p className="text-white text-base">{post.body}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Comments</h2>
        <div className="space-y-5">
          {comments.map(comment => (
            <div
              key={comment.id}
              className="bg-white/10 backdrop-blur-xl border border-white/30 rounded-xl shadow-xl px-5 py-4"
            >
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold text-white">{comment.name}</p>
                <p className="text-sm text-white/70">{comment.email}</p>
              </div>
              <p className="text-white">{comment.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
