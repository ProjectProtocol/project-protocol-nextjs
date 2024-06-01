"use client";

import LoginForm from "./LoginForm";

// A wrapper for the forms to log in, sign up, and reset password
export default function LoginUI() {
  return (
    <div className="m-auto" style={{ maxWidth: "400px" }}>
      <h2 className="text-center">Log in</h2>
      <LoginForm submitLabel="Log in" />
    </div>
  );
}
