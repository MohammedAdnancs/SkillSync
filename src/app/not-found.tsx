"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return(
    <div className="h-screen flex flex-col gap-y-4 items-center justify-center">
      <AlertTriangle className="size-9" />
      <p className="text-xl font-semibold">404 - Page Not Found</p>
      <p className="text-lg text-muted-foreground">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button variant="secondary" size="sm">
        <Link href="/">
          Back to home
        </Link>
      </Button>
    </div>
  );
}