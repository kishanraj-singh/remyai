"use client";

import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";

export function GithubLoginButton() {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    signIn("github", { callbackUrl: "/dashboard" });
  };

  return (
    <Button
      size="lg"
      variant="outline"
      className="w-full md:w-100"
      loading={loading}
      onClick={handleLogin}
    >
      <FaGithub /> Continue with github
    </Button>
  );
}
