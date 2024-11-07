"use client";
import { useClickAway, useDebounce } from "react-use";
import React from 'react';
import { useSession } from "next-auth/react";
import { Api } from "@/services/api-client";
import { PatientDTO } from "./create-view";
import { SearchBox } from "../ui/searchbox";
import { useActivePatient } from "@/store/active-patient";
import { cn } from "@/lib/utils";

export const PatientSearch: React.FC = () => {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState<PatientDTO[]>([]);
  const ref = React.useRef(null);
  
  // Используем store для активного пациента
  const { setActivePatient } = useActivePatient();

  const onClickPatient = (patient: PatientDTO) => {
    return async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (patient) {
        setActivePatient(patient);
        setFocused(false);
        setSearchQuery("");
        setSearchResults([]);
      }
    };
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
  };

  useDebounce(
    async () => {
      try {
        if (searchQuery.trim()) {
          const doctorId = Number(session?.user?.id);
          const patientData = await Api.patients.search(searchQuery, doctorId);
          setSearchResults(patientData);
          console.log("searchResults: ", patientData.length);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.log(error);
      }
    },
    250,
    [searchQuery]
  );

  
  useClickAway(ref, () => {
    setFocused(false);
  });

  return (
    <div ref={ref} onFocus={() => setFocused(true)}>
            <div className="w-full relative">

      <SearchBox onSearch={handleSearch} />
      {searchResults.length > 0 && (
        <div
          className={cn(
            "absolute w-full bg-white rounded-xl py-2 top-30 shadow-md transition-all duration-200 invisible opacity-0 z-30",
            focused && "visible opacity-100 top-12"
          )}
        >
          {searchResults.map((patient) => (
            <div
              key={patient.id}
              onClick={onClickPatient(patient)}
              className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10 cursor-pointer"
            >
              <span>{patient.fullName}</span>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};