import React from "react";
import { Button } from "../ui/button";

export function Footer() {
  return (
    <footer className="bg-gray-50  p-4 flex flex-col sm:flex-row justify-center items-center sm:justify-between align-center">
      <div className="flex flex-row items-center pb-5 sm:pb-0">
        <Button variant="outline">Cookies policy</Button>
        <Button variant="outline">Legal terms</Button>
        <Button variant="outline">Privacy policy</Button>
      </div>
      <div>
        <p className="text-gray-400 text-md">
          &copy; {new Date().getFullYear()} TxPlan. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
