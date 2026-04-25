import { GithubLoginButton } from "@/components/auth/github-login-button";
import { GoogleLoginButton } from "@/components/auth/google-login-button";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative px-[5%]">
      <div className="flex flex-col justify-center items-center gap-6">
        <Logo size="lg" />
        <span className="text-muted-foreground">Continue with a provider</span>

        <div className="w-full flex flex-col gap-3">
          <GoogleLoginButton />
          <GithubLoginButton />
        </div>

        <span className="text-sm text-muted-foreground text-center">
          By continuing you agree to our{" "}
          <Link href="/legal" className="text-primary">
            Terms & Privacy Policy
          </Link>
        </span>

        <Link href="/" className="text-muted-foreground">
          <Button variant="ghost">
            <ArrowLeftIcon />
            Back to home
          </Button>
        </Link>
      </div>
    </div>
  );
}
