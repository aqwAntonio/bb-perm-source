export type Sex = 'male' | 'female';

export function calculateBmr(params: { sex: Sex; weightKg: number; heightCm: number; ageYears: number }): number {
  const { sex, weightKg, heightCm, ageYears } = params;
  const base = 10 * weightKg + 6.25 * heightCm - 5 * ageYears;
  return sex === 'male' ? base + 5 : base - 161;
}

export function getActivityFactor(level: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'): number {
  switch (level) {
    case 'sedentary':
      return 1.2; // малоактивный
    case 'light':
      return 1.375; // 1–3 тренировки/нед
    case 'moderate':
      return 1.55; // 3–5 трен/нед
    case 'active':
      return 1.725; // 6–7 трен/нед
    case 'very_active':
      return 1.9; // тяжёлая физ.работа/2х тренировки
  }
}

export function calculateTdee(params: {
  sex: Sex;
  weightKg: number;
  heightCm: number;
  ageYears: number;
  activity: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
}): { bmr: number; tdee: number } {
  const bmr = calculateBmr(params);
  const tdee = bmr * getActivityFactor(params.activity);
  return { bmr, tdee };
}

export function suggestMacros(params: { weightKg: number; calories: number }): {
  proteinGrams: number;
  fatGrams: number;
  carbsGrams: number;
} {
  const { weightKg, calories } = params;
  const proteinGrams = Math.round(weightKg * 1.8); // 1.6–2.2 г/кг → берём 1.8
  const fatGrams = Math.round(weightKg * 0.8); // 0.6–1.0 г/кг → берём 0.8
  const caloriesFromProtein = proteinGrams * 4;
  const caloriesFromFat = fatGrams * 9;
  const remainingCalories = Math.max(0, Math.round(calories - caloriesFromProtein - caloriesFromFat));
  const carbsGrams = Math.round(remainingCalories / 4);
  return { proteinGrams, fatGrams, carbsGrams };
}


