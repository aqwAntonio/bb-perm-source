export type OneRmFormula = 'epley' | 'brzycki';

export function estimateOneRepMax(params: { weightKg: number; reps: number; formula?: OneRmFormula }): number {
  const { weightKg, reps } = params;
  const formula: OneRmFormula = params.formula ?? 'epley';
  if (reps <= 1) return weightKg;
  if (formula === 'epley') {
    return weightKg * (1 + reps / 30);
  }
  // Brzycki
  return weightKg * (36 / (37 - reps));
}

export function calculatePercentOfOneRm(params: { oneRm: number; percent: number }): number {
  const { oneRm, percent } = params;
  return (oneRm * percent) / 100;
}

export function reversePercentToOneRm(params: { targetWeight: number; percent: number }): number {
  const { targetWeight, percent } = params;
  if (percent <= 0) return 0;
  return (targetWeight * 100) / percent;
}


