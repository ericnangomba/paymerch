import React from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

const Unauthorized: React.FC = () => {
  const [, setLocation] = useLocation();

  const handleGoBack = () => {
    // Navigate back in history
    window.history.length > 1 ? window.history.back() : setLocation("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-destructive mb-4">
          403 - Unauthorized
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          You do not have permission to view this page.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button asChild>
              <a>Go to Homepage</a>
            </Button>
          </Link>
          <Button variant="secondary" onClick={handleGoBack}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
