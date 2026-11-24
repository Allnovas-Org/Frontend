
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[480px] rounded-xl border border-gray-300 bg-white px-5 py-8 text-center sm:px-8">
        <h1 className="text-2xl font-semibold text-gray-950">
          Admin registration is currently invitation-only
        </h1>
        <p className="mt-4 text-sm text-gray-600">
          If you already have an administrator account, sign in to continue.
        </p>
        <Link
          to="/sign-in"
          className="mt-6 inline-block font-semibold text-purple-700 hover:text-purple-800"
        >
          Back to Sign In
        </Link>
      </div>
    </main>
  );
}
