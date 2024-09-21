// components/shared/teeth-import.ts

interface ToothInfo {
  number: number;
  width: number;
  height: number;
}

const upperTeeth: readonly ToothInfo[] = [
  { number: 18, width: 60, height: 60 },
  { number: 17, width: 60, height: 60 },
  { number: 16, width: 60, height: 60 },
  { number: 15, width: 50, height: 50 },
  { number: 14, width: 50, height: 50 },
  { number: 13, width: 50, height: 50 },
  { number: 12, width: 50, height: 50 },
  { number: 11, width: 60, height: 60 },
  { number: 21, width: 60, height: 60 },
  { number: 22, width: 50, height: 50 },
  { number: 23, width: 50, height: 50 },
  { number: 24, width: 50, height: 50 },
  { number: 25, width: 50, height: 50 },
  { number: 26, width: 60, height: 60 },
  { number: 27, width: 60, height: 60 },
  { number: 28, width: 60, height: 60 },
] as const;

const lowerTeeth: readonly ToothInfo[] = [
  { number: 38, width: 60, height: 60 },
  { number: 37, width: 60, height: 60 },
  { number: 36, width: 60, height: 60 },
  { number: 35, width: 50, height: 50 },
  { number: 34, width: 50, height: 50 },
  { number: 33, width: 50, height: 50 },
  { number: 32, width: 50, height: 50 },
  { number: 31, width: 50, height: 50 },
  { number: 41, width: 50, height: 50 },
  { number: 42, width: 50, height: 50 },
  { number: 43, width: 50, height: 50 },
  { number: 44, width: 50, height: 50 },
  { number: 45, width: 50, height: 50 },
  { number: 46, width: 60, height: 60 },
  { number: 47, width: 60, height: 60 },
  { number: 48, width: 60, height: 60 },
] as const;

const Teeth = {
  upperTeeth,
  lowerTeeth,
};

export default Teeth;
export type { ToothInfo };
