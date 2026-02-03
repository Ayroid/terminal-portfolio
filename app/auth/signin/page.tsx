'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="space-y-4 w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>

        <div className="space-y-2">
          <button
            onClick={() => signIn("github")}
            className="w-full p-3 border rounded hover:bg-gray-100 transition"
          >
            Sign in with GitHub
          </button>

          <button
            onClick={() => signIn("google")}
            className="w-full p-3 border rounded hover:bg-gray-100 transition"
          >
            Sign in with Google
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border rounded mb-2"
            />
            <button
              onClick={() => signIn("resend", { email })}
              className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Sign in with Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
