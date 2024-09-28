import React from "react";
import { Separator } from "@/components/ui/separator"; // Импорт Separator из shadcn

interface OverviewProps {
  treatmentTitle: string;
  treatmentDescription: string;
  procedures?: string[];
  financialPlan: { description: string; price: string }[];
  imageSrc: string;
}

const Overview: React.FC<OverviewProps> = ({
  treatmentTitle,
  treatmentDescription,
  procedures = [],
  financialPlan,
  imageSrc,
}) => {
  return (
    <div className="w-full max-w-[297mm] mx-auto flex flex-col items-center print:h-full">
      <div className="flex flex-col md:flex-row justify-between w-full gap-8 mb-8">
        {/* Левая часть - Описание лечения */}
        <div className="md:w-1/3 flex flex-col items-start">
          <h2 className="text-xl font-semibold mb-4">{treatmentTitle}</h2>
          <p className="text-left">{treatmentDescription}</p>
        </div>

        <Separator orientation="vertical" className="md:hidden" /> {/* Разделитель для мобильных */}

        {/* Центральная часть - Процедуры */}
        <div className="md:w-1/3 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Procedures</h2>
          <ul className="list-disc text-left">
            {/* Проверка на undefined и null */}
            {procedures && procedures.length > 0 ? (
              procedures.map((procedure, index) => (
                <li key={index} className="mb-2">
                  {procedure}
                </li>
              ))
            ) : (
              <li>No procedures available</li>
            )}
          </ul>
        </div>

        <Separator orientation="vertical" className="hidden md:block" /> {/* Разделитель для десктопа */}

        {/* Правая часть - Финансовый план */}
        <div className="md:w-1/3 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Financial Plan</h2>
          <ul className="list-none text-left">
            {financialPlan.map((item, index) => (
              <li key={index} className="flex justify-between mb-2">
                <span>{item.description}</span>
                <span>{item.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Separator className="w-full my-8" /> {/* Горизонтальный разделитель перед изображением */}

      {/* Изображение */}
      <div className="w-full">
        <img
          src={imageSrc}
          alt="Overview Image"
          className="w-full object-contain"
        />
      </div>
    </div>
  );
};

export default Overview;
