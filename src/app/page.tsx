"use client";
// import { useRouter } from "next/navigation";
import React, { Suspense } from "react";
import { AuthFormContent } from "@/components/shared/forms/auth-form-content";

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
      <AuthFormContent />
    </Suspense>
  );
}
