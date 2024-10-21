import React from "react";
import { Button } from "../ui/button";

interface NextPrevTabProps {
  goToNextTab: () => void;
  goToPreviousTab: () => void;
}

export const NextPrevTab: React.FC<NextPrevTabProps> = ({
  goToNextTab,
  goToPreviousTab,
}) => {
  return (
    <div className="flex justify-between mt-4">
      <Button onClick={goToPreviousTab} className="mr-auto">
        Previous Tab
      </Button>
      <Button onClick={goToNextTab} className="ml-auto">
        Next Tab
      </Button>
    </div>
  );
};
