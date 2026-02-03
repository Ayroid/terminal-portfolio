'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";

interface Provider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

interface SignInComponentProps {
  providers: Record<string, Provider>;
}

export default function SignInComponent({ providers }: SignInComponentProps) {
  const [email, setEmail] = useState("");

  return (
    <div className="space-y-4 w-full max-w-md p-8">
      <div className="space-y-2">
        {Object.values(providers).map((provider) => {
          if (provider.id === "email" || provider.id === "resend") {
            return (
              <div key={provider.id}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full p-2 border rounded"
                />
                <button
                  onClick={() => signIn(provider.id, { email })}
                  className="w-full mt-2 p-2 bg-blue-500 text-white rounded"
                >
                  Sign in with Email
                </button>
              </div>
            );
          }

          return (
            <button
              key={provider.id}
              onClick={() => signIn(provider.id)}
              className="w-full p-2 border rounded"
            >
              Sign in with {provider.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
