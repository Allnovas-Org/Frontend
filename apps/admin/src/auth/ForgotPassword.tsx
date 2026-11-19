
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    // Temporary frontend navigation.
    // A backend request must be added before email
    // delivery or account verification can work.
    navigate("/email-sent");
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
          padding: "40px 32px",
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
          Forgot Password
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#6B7280",
            marginBottom: "32px",
          }}
        >
          Please enter your registered email ID
        </p>

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="forgot-email"
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#374151",
            }}
          >
            Email
          </label>

          <input
            id="forgot-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            placeholder="Enter your Email"
            required
            style={{
              width: "100%",
              padding: "15px",
              border: error
                ? "1px solid #EF4444"
                : "1px solid #D1D5DB",
              borderRadius: "8px",
              fontSize: "14px",
              boxSizing: "border-box",
              outlineColor: "#7500C8",
            }}
          />

          {error && (
            <p
              role="alert"
              style={{
                color: "#EF4444",
                fontSize: "13px",
                marginTop: "8px",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              marginTop: "26px",
              padding: "15px",
              background: "#7500C8",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Continue
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontSize: "14px",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/sign-up"
            style={{
              color: "#7500C8",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
