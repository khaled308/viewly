"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">
          Viewly
        </Link>

        <div className="space-x-4 flex items-center">
          <Link href="/" className="text-gray-700 hover:text-blue-500">
            Home
          </Link>

          {session ? (
            <>
              <Link
                href="/upload"
                className="text-gray-700 hover:text-blue-500"
              >
                Upload
              </Link>
              <span className="text-sm text-gray-600">
                {session.user?.name}
              </span>
              <button
                onClick={() => signOut()}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
              >
                Sign out
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
