"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export function LogoutButton() {
  return (
    <Button variant="outline" onClick={() => signOut()} className="w-25">
      Log Out
    </Button>
  );
}
