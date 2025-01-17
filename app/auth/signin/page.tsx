// app/auth/signin/page.tsx
import { getProviders } from "next-auth/react";
import SignInComponent from "@/components/SignInComponent";

export default async function SignIn() {
  const providers = await getProviders();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <SignInComponent providers={providers ?? {}} />
    </div>
  );
}
