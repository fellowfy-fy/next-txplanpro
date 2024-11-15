"use client";

import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuList } from "./menu-list";
import { ActivePatient } from "./active-patient";
import { PatientSearch } from "./patient-search";

export function Sidebar() {
  return (
    <div className="absolute top-6 left-6">
      <div className="grid grid-cols-2 gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <div className="flex items-center justify-center text-2xl font-semibold cursor-pointer group">
              <Image
                src="/logo.png"
                alt=""
                width={35}
                height={35}
                className="cursor-pointer transition-transform transform group-hover:scale-110 group-hover:opacity-80"
              />
            </div>
          </SheetTrigger>
          <SheetContent side="left" className="bg-white w-[200px]">
            <SheetHeader>
              <SheetTitle>
                <div className="flex justify-center items-center">
                  <Image
                    src="/logo.png"
                    alt=""
                    width={35}
                    height={35}
                    className="cursor-pointer transition-transform transform group-hover:scale-110 group-hover:opacity-80"
                  />
                  <p className="group-hover:opacity-100 group-hover:scale-100">
                    TxPlanPro
                  </p>
                </div>
              </SheetTitle>
              <SheetDescription>
                <></>
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <MenuList />
              <ActivePatient />
              <PatientSearch variant="sidebar" />
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <></>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
