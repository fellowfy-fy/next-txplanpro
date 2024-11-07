"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import { useState } from "react";

export function SupportForm() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6 max-w-[500px]">
      <h3 className="text-lg font-bold mb-4">Form</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Input placeholder="Name" className="h-[50px]" />
        <Input placeholder="Email" className="h-[50px]" />
      </div>
      <Textarea placeholder="Message" className="mb-4 min-h-[120px]" />
      
      <Button
        variant="secondary"
        className="w-full h-[50px]"
        onClick={() => setOpen(true)} 
      >
        Send message
      </Button>

      {/* Компонент AlertDialog */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to submit this message?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => setOpen(false)}>Submit</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
