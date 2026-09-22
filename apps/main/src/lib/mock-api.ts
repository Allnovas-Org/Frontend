import { api } from "./axios";

// ─────────────────────────────────────────────
// MOCK CONFIGURATION
// Change MOCK_USER_TYPE to switch between flows:
//   "Client"     → registers as client     → lands on Spotlight Talents
//   "Freelancer" → registers as freelancer → lands on Find Jobs
// ─────────────────────────────────────────────
export const MOCK_USER_TYPE: "Client" | "Freelancer" = "Client";

// ─────────────────────────────────────────────
// MOCK USER DATA
// ─────────────────────────────────────────────
const MOCK_USER = {
  id: "mock-user-001",
  username: "mockuser",
  email: "mock@test.com",
  first_name: "Mock",
  last_name: "User",
  created_at: new Date().toISOString(),
  user_role: MOCK_USER_TYPE,
};

const MOCK_TOKEN = "mock-token-abc123";

// ─────────────────────────────────────────────
// URL → MOCK RESPONSE MAP
// ─────────────────────────────────────────────
const MOCK_RESPONSES: Record<string, unknown> = {
  // Auth
  "POST /auth/signup/email/": {
    message: "OTP sent successfully",
    token: 123456,
    info: "Check your email for the OTP",
  },
  "POST /auth/signup/verify-token/": {
    message: "Token verified successfully",
    token: MOCK_TOKEN,
    expire_at: new Date(Date.now() + 86400000).toISOString(),
  },
  "POST /auth/signup/create-password/": {
    message: "Password created successfully",
  },
  "POST /auth/signup/add-profile/": {
    message: "Profile added successfully",
  },
  "POST /auth/login/": {
    message: "Login successful",
    user: MOCK_USER,
    token: MOCK_TOKEN,
    expires_at: new Date(Date.now() + 86400000).toISOString(),
    user_role: MOCK_USER_TYPE,
  },
  "GET /auth/me/": MOCK_USER,
  "POST /auth/logout/": {
    message: "Logged out successfully",
  },

  // Client profile completion
  "POST /client/signin-flow/type-of-client/": {
    message: "Client type saved successfully",
  },
  "POST /client/signin-flow/company-info/": {
    message: "Company info saved successfully",
  },
  "POST /client/signin-flow/language/": {
    message: "Language saved successfully",
  },
  "POST /client/signin-flow/verification/": {
    message: "Verification submitted successfully",
  },

  // Freelancer profile completion (add endpoints here when available)
  "POST /freelancer/signin-flow/skills/": {
    message: "Skills saved successfully",
  },
  "POST /freelancer/signin-flow/tools/": {
    message: "Tools saved successfully",
  },
  "POST /freelancer/signin-flow/education/": {
    message: "Education saved successfully",
  },
  "POST /freelancer/signin-flow/language/": {
    message: "Language saved successfully",
  },
  "POST /freelancer/signin-flow/payment/": {
    message: "Payment saved successfully",
  },
  "POST /freelancer/signin-flow/verification/": {
    message: "Verification submitted successfully",
  },
};

// ─────────────────────────────────────────────
// ACTIVATE MOCK INTERCEPTOR
// Intercepts every axios request and returns
// a fake response instead of hitting the API
// ─────────────────────────────────────────────
export function activateMockAPI() {
  api.interceptors.request.use(
    async (config) => {
      const method = (config.method || "GET").toUpperCase();
      const url = config.url || "";

      const key = `${method} ${url}`;
      const matchedKey = Object.keys(MOCK_RESPONSES).find((k) =>
        url.includes(k.split(" ")[1]),
      );

      if (matchedKey) {
        const mockData = MOCK_RESPONSES[matchedKey];

        // If this is the login call, also set the token in localStorage
        if (url.includes("/auth/login/")) {
          localStorage.setItem("auth-token", MOCK_TOKEN);
        }

        // If this is the verify-token call, also set the token
        if (url.includes("/auth/signup/verify-token/")) {
          localStorage.setItem("auth-token", MOCK_TOKEN);
        }

        // Return a fake axios response by throwing a special object
        // that the response interceptor will catch and treat as success
        const fakeResponse = {
          data: mockData,
          status: 200,
          statusText: "OK",
          headers: {},
          config,
        };

        // Cancel the real request and return mock data
        throw { __mock: true, response: fakeResponse };
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  // Catch the mock throw and resolve it as a successful response
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.__mock) {
        return Promise.resolve(error.response);
      }
      return Promise.reject(error);
    },
  );

  console.log(
    `%c[MOCK API ACTIVE] User type: ${MOCK_USER_TYPE}`,
    "background: #6A0DAD; color: white; padding: 4px 8px; border-radius: 4px;",
  );
}
