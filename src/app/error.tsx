'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-slate-900 font-sans">
      <h2 className="text-2xl font-bold mb-4 font-sans">Something went wrong</h2>
      <button
        onClick={() => reset()}
        className="px-5 py-2 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition font-sans"
      >
        Try again
      </button>
    </div>
  );
}
