import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-sm">
        <h1 className="mb-6 text-3xl font-semibold">
          Sign In
        </h1>

        <LoginForm />
      </div>
    </main>
  );
}