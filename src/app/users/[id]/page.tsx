'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const LeafletMap = dynamic(() => import('../../../components/LeafletMap'), { ssr: false });

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
};

export default function UserProfile() {
  const params = useParams();
  const userId = params.id;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [userId]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <span className="loading loading-spinner text-white w-10 h-10"></span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-10 bg-white/50 backdrop-blur-xl rounded-2xl shadow-2xl">
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* User Info */}
        <div className="flex-1 border border-white/30 rounded-xl shadow-xl p-6">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-white">{user.name}</h1>
            <p className="text-lg text-white/80">@{user.username}</p>
          </div>

          <div className="space-y-4 text-white/70">
            <p><span className="font-medium">📧 Email:</span> {user.email}</p>
            <p><span className="font-medium">📞 Phone:</span> {user.phone}</p>
            <p>
              <span className="font-medium">🌐 Website:</span>{' '}
              <a
                href={`https://${user.website}`}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                {user.website}
              </a>
            </p>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-white mb-2">🏠 Address</h2>
            <p>{user.address.street}, {user.address.suite}</p>
            <p>{user.address.city}, {user.address.zipcode}</p>
          </div>

          <Link
            href="/users"
            className="inline-block mt-10 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
          >
            Back to Users
          </Link>
        </div>

        {/* Map */}
        <div className="w-full lg:w-[400px] h-96 rounded-xl overflow-hidden shadow-lg border border-gray-200">
          <LeafletMap
            lat={parseFloat(user.address.geo.lat)}
            lng={parseFloat(user.address.geo.lng)}
          />
        </div>
      </div>
    </div>
  );
}
