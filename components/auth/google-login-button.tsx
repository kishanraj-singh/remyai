"use client";

import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";

export function GoogleLoginButton() {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <Button
      size="lg"
      variant="outline"
      className="w-full md:w-100"
      loading={loading}
      onClick={handleLogin}
    >
      <FcGoogle /> Continue with Google
    </Button>
  );
}
