'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-cyan-600 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div>
            <a href="/" className="text-xl font-bold">
              Aurorafin
            </a>
          </div>
          <div>
            {session ? (
              <div className="flex items-center space-x-4">
                <span>{session.user.email}</span>
                <button
                  onClick={() => signOut()}
                  className="bg-rose-400 text-white px-4 py-2 rounded-md"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
