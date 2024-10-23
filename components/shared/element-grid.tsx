"use client";
import React from "react";

interface ElementGridProps {
  children: React.ReactNode;
}

const ElementGrid: React.FC<ElementGridProps> = ({ children }) => {
  return (
    <div className="grid gap-5 grid-cols-1 lg:grid-cols-2 mt-5">{children}</div>
  );
};

export default ElementGrid;
