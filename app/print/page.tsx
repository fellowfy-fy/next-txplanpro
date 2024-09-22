"use client";

import { useSearchParams } from "next/navigation";
import Slides from "@/components/shared/slides";

const PrintPage: React.FC = () => {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  const images = data ? JSON.parse(data) : {};

  return <Slides images={images} />;
};

export default PrintPage;
