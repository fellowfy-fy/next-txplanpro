interface CountResult {
  name: string;
  count: number;
}

interface Counts {
  [key: string]: number;
}

export const countDiagnosis = (data: Array<{ diagnosis: string[] }>): CountResult[] => {
  const counts = data.reduce<Counts>((acc, item) => {
    item.diagnosis.forEach(d => {
      acc[d] = (acc[d] || 0) + 1;
    });
    return acc;
  }, {});

  return Object.entries(counts).map(([name, count]) => ({
    name,
    count
  }));
};

export const countTreatments = (data: Array<{ treatments: string[] }>): CountResult[] => {
  const counts = data.reduce<Counts>((acc, item) => {
    item.treatments.forEach(t => {
      const cleanName = t.startsWith('T') ? t.slice(1) : t;
      acc[cleanName] = (acc[cleanName] || 0) + 1;
    });
    return acc;
  }, {});

  return Object.entries(counts).map(([name, count]) => ({
    name,
    count
  }));
};