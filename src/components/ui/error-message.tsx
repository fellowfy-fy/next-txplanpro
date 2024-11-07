import React from "react";

interface Props {
  message: string;
}

export const ErrorMessage: React.FC<Props> = ({ message }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
      <span className="block sm:inline">{message}</span>
    </div>
  );
};
