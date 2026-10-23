import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-slate-900 font-sans">
      <h2 className="text-3xl font-extrabold mb-2 font-sans">Page Not Found</h2>
      <p className="text-slate-600 mb-6 font-sans">The requested resource could not be found.</p>
      <Link
        href="/"
        className="px-5 py-2.5 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition font-sans"
      >
        Return Home
      </Link>
    </div>
  );
}
