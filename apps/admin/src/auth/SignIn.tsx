
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInAdmin } from "./adminAuth";

export default function SignIn() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!identifier.trim() || !password) {
      setError("Please enter your email or username and password.");
      return;
    }

    setIsLoading(true);
    try {
      await signInAdmin(identifier, password, rememberMe);
      navigate("/admin", { replace: true });
    } catch (signInError) {
      setError(
        signInError instanceof Error
          ? signInError.message
          : "Sign in failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[480px] rounded-xl border border-gray-300 bg-white px-5 py-8 sm:px-8">
        <div className="text-center mb-7">
          <h1 className="text-2xl font-semibold text-gray-950">
            Welcome Back
          </h1>
          <p className="mt-2 text-gray-500">
            Please let's sign you in
          </p>
        </div>

        <button
          type="button"
          disabled
          title="Google sign in is not configured yet"
          className="w-full flex items-center justify-center gap-3 rounded-lg border border-gray-300 py-3 text-gray-600 disabled:opacity-60"
        >
          <span className="font-bold text-lg">G</span>
          Continue with Google
        </button>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">
            or sign in with email or username
          </span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="admin-identifier" className="block text-sm text-gray-600 mb-2">
            Email or username
          </label>
          <input
            id="admin-identifier"
            type="text"
            autoComplete="username"
            value={identifier}
            onChange={(e) => {
              setIdentifier(e.target.value);
              setError("");
            }}
            placeholder="Enter your email or username"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-purple-700 mb-5"
          />

          <label htmlFor="admin-password" className="block text-sm text-gray-600 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              id="admin-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter your Password"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-20 outline-none focus:border-purple-700"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="flex items-center justify-between gap-3 mt-3 mb-6">
            <label className="flex items-center gap-2 text-xs text-gray-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-purple-700"
              />
              Remember me
            </label>
            <Link
              to="/forgot-password"
              className="text-xs font-medium text-gray-900 hover:text-purple-700"
            >
              Forgot Password?
            </Link>
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600 mb-4">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-purple-700 py-3 text-white font-medium hover:bg-purple-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Signing in..." : "Log in"}
          </button>
        </form>

      </div>
    </main>
  );
}
