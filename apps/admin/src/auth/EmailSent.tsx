
import React from "react";
import { Link } from "react-router-dom";

export default function EmailSent() {
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
          border: "1px solid #D1D5DB",
          borderRadius: "12px",
          padding: "48px 32px",
          boxSizing: "border-box",
          textAlign: "center",
        }}
      >
        {/* Purple envelope icon */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "28px",
          }}
        >
          <svg
            width="90"
            height="90"
            viewBox="0 0 90 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect
              x="25"
              y="8"
              width="40"
              height="48"
              rx="5"
              fill="#7500C8"
            />
            <path
              d="M35 28L42 35L55 21"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M34 43H56"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M15 39L45 63L75 39V75H15V39Z"
              fill="#7500C8"
            />
            <path
              d="M15 75L36 56M75 75L54 56"
              stroke="white"
              strokeWidth="3"
            />
          </svg>
        </div>

        <h2
          style={{
            fontSize: "24px",
            fontWeight: 600,
            margin: "0 0 10px",
            color: "#111827",
          }}
        >
          Check Your Email
        </h2>

        <p
          style={{
            color: "#9CA3AF",
            fontSize: "15px",
            marginBottom: "30px",
            lineHeight: 1.6,
          }}
        >
          If your email is registered, you will receive
          password reset instructions.
        </p>

        <Link
          to="/sign-in"
          style={{
            display: "block",
            width: "100%",
            padding: "15px",
            background: "#7500C8",
            color: "#ffffff",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: 600,
            textDecoration: "none",
            boxSizing: "border-box",
          }}
        >
          Continue
        </Link>
      </div>
    </div>
  );
}
