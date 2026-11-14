
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password mismatch, please check.");
      return;
    }

    // Password reset requires a verified backend reset token.
    // Do not change the password or show success yet.
    setError(
      "Password reset is not connected yet. Please try again later."
    );
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "15px",
    paddingRight: "70px",
    border: "1px solid #D1D5DB",
    borderRadius: "8px",
    fontSize: "14px",
    boxSizing: "border-box",
    outlineColor: "#7500C8",
  };

  const toggleStyle: React.CSSProperties = {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    color: "#6B7280",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#ffffff",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "510px",
          padding: "48px 32px",
          border: "1px solid #D1D5DB",
          borderRadius: "12px",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "26px",
            fontWeight: 600,
            margin: "0 0 12px",
          }}
        >
          Reset Password
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#6B7280",
            marginBottom: "32px",
          }}
        >
          Please enter a new password below
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="reset-password">
            Password
          </label>

          <div
            style={{
              position: "relative",
              marginTop: "8px",
              marginBottom: "24px",
            }}
          >
            <input
              id="reset-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              minLength={8}
              required
              autoComplete="new-password"
              style={inputStyle}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={toggleStyle}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <label htmlFor="reset-confirm">
            Confirm Password
          </label>

          <div
            style={{
              position: "relative",
              marginTop: "8px",
            }}
          >
            <input
              id="reset-confirm"
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter your Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
              minLength={8}
              required
              autoComplete="new-password"
              style={inputStyle}
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              style={toggleStyle}
            >
              {showConfirm ? "Hide" : "Show"}
            </button>
          </div>

          {error && (
            <p
              role="alert"
              style={{
                color: "#EF4444",
                fontSize: "13px",
                marginTop: "12px",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "15px",
              marginTop: "26px",
              background: "#7500C8",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Reset Password
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "14px",
          }}
        >
          Remember your password?{" "}
          <Link
            to="/sign-in"
            style={{
              color: "#7500C8",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
