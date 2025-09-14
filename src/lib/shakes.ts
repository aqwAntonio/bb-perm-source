export type ShakeType = 'protein' | 'carb' | 'isotonic';

export interface Shake {
  id: string;
  title: string;
  type: ShakeType;
  timeMin: number;
  kcals: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: { name: string; amount: number; unit: string; note?: string }[];
  steps: string[];
}

export const shakes: Shake[] = [
  // Белковые
  { id: 'whey_milk_banana', title: 'Сывороточный протеин с молоком и бананом', type: 'protein', timeMin: 2, kcals: 350, protein: 35, carbs: 40, fat: 6, ingredients: [
    { name: 'Сывороточный протеин', amount: 30, unit: 'г' },
    { name: 'Молоко 1.5%', amount: 250, unit: 'мл' },
    { name: 'Банан', amount: 1, unit: 'шт' }
  ], steps: ['Смешать всё в шейкере или блендере'] },
  { id: 'whey_water', title: 'Сывороточный протеин на воде', type: 'protein', timeMin: 1, kcals: 120, protein: 24, carbs: 3, fat: 2, ingredients: [
    { name: 'Сывороточный протеин', amount: 30, unit: 'г' },
    { name: 'Вода', amount: 250, unit: 'мл' }
  ], steps: ['Встряхнуть в шейкере 10–15 сек'] },
  { id: 'cottage_kefir', title: 'Творожный коктейль на кефире', type: 'protein', timeMin: 3, kcals: 320, protein: 32, carbs: 20, fat: 8, ingredients: [
    { name: 'Творог 5%', amount: 200, unit: 'г' },
    { name: 'Кефир 1%', amount: 200, unit: 'мл' },
    { name: 'Мёд', amount: 10, unit: 'г', note: 'по желанию' }
  ], steps: ['Пробить блендером до однородности'] },
  // Углеводные
  { id: 'oats_honey_milk', title: 'Овсяный коктейль с мёдом', type: 'carb', timeMin: 3, kcals: 420, protein: 16, carbs: 70, fat: 8, ingredients: [
    { name: 'Овсяные хлопья', amount: 50, unit: 'г' },
    { name: 'Молоко 1.5%', amount: 250, unit: 'мл' },
    { name: 'Мёд', amount: 15, unit: 'г' }
  ], steps: ['Взбить блендером 20–30 сек'] },
  { id: 'banana_date', title: 'Банан‑финики на воде', type: 'carb', timeMin: 2, kcals: 300, protein: 3, carbs: 70, fat: 0, ingredients: [
    { name: 'Банан', amount: 1, unit: 'шт' },
    { name: 'Финики', amount: 40, unit: 'г' },
    { name: 'Вода', amount: 250, unit: 'мл' }
  ], steps: ['Пробить блендером до однородности'] },
  // Изотонические
  { id: 'homemade_isotonic', title: 'Домашний изотоник с лимоном', type: 'isotonic', timeMin: 1, kcals: 70, protein: 0, carbs: 17, fat: 0, ingredients: [
    { name: 'Вода', amount: 500, unit: 'мл' },
    { name: 'Сок лимона', amount: 30, unit: 'мл' },
    { name: 'Соль', amount: 1, unit: 'щепотка' },
    { name: 'Сахар', amount: 15, unit: 'г' }
  ], steps: ['Перемешать до растворения сахара и соли'] },
];


