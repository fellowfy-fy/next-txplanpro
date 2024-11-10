import type { Tooth, Service } from "@prisma/client";

interface PriceResult {
  name: string;
  count: number;
  pricePerUnit: number;
  totalPrice: number;
}

export const countTreatmentsWithPrices = (
  teeth: Tooth[],
  prices: Service[]
): PriceResult[] => {
  const counts = teeth.reduce<{ [key: string]: number }>((acc, tooth) => {
    tooth.treatments.forEach(t => {
      const cleanName = t.startsWith('T') ? t.slice(1).toLowerCase().replace(/ /g, '_') : t.toLowerCase().replace(/ /g, '_');
      acc[cleanName] = (acc[cleanName] || 0) + 1;
    });
    return acc;
  }, {});

  return Object.entries(counts).map(([name, count]) => {
    const priceInfo = prices.find(p => p.name === name);
    return {
      name: name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      count,
      pricePerUnit: priceInfo?.price || 0,
      totalPrice: (priceInfo?.price || 0) * count
    };
  });
};