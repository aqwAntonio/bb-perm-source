export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';
export type Preference = 'any' | 'meat' | 'fish' | 'dairy' | 'veggie';

export interface Recipe {
  id: string;
  title: string;
  meal: MealType;
  pref: Exclude<Preference, 'any'>;
  timeMin: number;
  kcals: number;
  protein: number;
  fat: number;
  carbs: number;
  servings: number;
  ingredients: { name: string; amount: number; unit: string; note?: string }[];
  steps: string[];
}

export const recipes: Recipe[] = [
  { id: 'omlet_cottage', title: 'Омлет с творогом и зеленью', meal: 'breakfast', pref: 'dairy', timeMin: 10, kcals: 420, protein: 36, fat: 22, carbs: 18, servings: 1, ingredients: [
    { name: 'Яйца', amount: 3, unit: 'шт' },
    { name: 'Творог 5%', amount: 150, unit: 'г' },
    { name: 'Молоко', amount: 30, unit: 'мл', note: 'по желанию' },
    { name: 'Масло для жарки', amount: 5, unit: 'г' },
    { name: 'Зелень', amount: 10, unit: 'г' },
  ], steps: ['Смешать яйца и творог', 'Обжарить 5–7 мин', 'Подать с зеленью'] },
  { id: 'oats_kefir', title: 'Овсянка на кефире с ягодами', meal: 'breakfast', pref: 'dairy', timeMin: 5, kcals: 350, protein: 20, fat: 8, carbs: 50, servings: 1, ingredients: [
    { name: 'Овсяные хлопья', amount: 60, unit: 'г' },
    { name: 'Кефир 1%', amount: 250, unit: 'мл' },
    { name: 'Ягоды', amount: 80, unit: 'г' },
    { name: 'Орехи', amount: 10, unit: 'г', note: 'по желанию' },
  ], steps: ['Овсянка + кефир', 'Добавить ягоды и орехи'] },
  { id: 'chicken_rice', title: 'Курица с рисом и овощами', meal: 'lunch', pref: 'meat', timeMin: 20, kcals: 520, protein: 40, fat: 12, carbs: 65, servings: 1, ingredients: [
    { name: 'Куриная грудка', amount: 180, unit: 'г' },
    { name: 'Рис', amount: 70, unit: 'г', note: 'сухой' },
    { name: 'Овощи замороженные', amount: 150, unit: 'г' },
    { name: 'Масло оливковое', amount: 5, unit: 'г' },
  ], steps: ['Отварить рис', 'Обжарить курицу', 'Добавить замороженные овощи'] },
  { id: 'salmon_potato', title: 'Лосось с картофелем и салатом', meal: 'dinner', pref: 'fish', timeMin: 25, kcals: 600, protein: 38, fat: 24, carbs: 55, servings: 1, ingredients: [
    { name: 'Лосось', amount: 170, unit: 'г' },
    { name: 'Картофель', amount: 250, unit: 'г' },
    { name: 'Салатный микс', amount: 80, unit: 'г' },
    { name: 'Оливковое масло', amount: 10, unit: 'г' },
  ], steps: ['Запечь лосось', 'Отварить картофель', 'Собрать салат'] },
  { id: 'tuna_pasta', title: 'Паста с тунцом и томатами', meal: 'dinner', pref: 'fish', timeMin: 15, kcals: 550, protein: 35, fat: 14, carbs: 70, servings: 1, ingredients: [
    { name: 'Паста', amount: 80, unit: 'г', note: 'сухая' },
    { name: 'Тунец в собственном соку', amount: 120, unit: 'г' },
    { name: 'Томатный соус', amount: 120, unit: 'г' },
  ], steps: ['Отварить пасту', 'Смешать с тунцом и соусом'] },
  { id: 'buckwheat_mush', title: 'Гречка с грибами и яйцом', meal: 'lunch', pref: 'veggie', timeMin: 20, kcals: 480, protein: 24, fat: 14, carbs: 60, servings: 1, ingredients: [
    { name: 'Гречка', amount: 70, unit: 'г', note: 'сухая' },
    { name: 'Грибы шампиньоны', amount: 150, unit: 'г' },
    { name: 'Яйца', amount: 2, unit: 'шт' },
    { name: 'Масло для жарки', amount: 5, unit: 'г' },
  ], steps: ['Отварить гречку', 'Обжарить грибы', 'Добавить яйцо'] },
  { id: 'cottage_bowl', title: 'Творожная тарелка с бананом и мёдом', meal: 'snack', pref: 'dairy', timeMin: 3, kcals: 300, protein: 24, fat: 4, carbs: 48, servings: 1, ingredients: [
    { name: 'Творог 5%', amount: 200, unit: 'г' },
    { name: 'Банан', amount: 1, unit: 'шт' },
    { name: 'Мёд', amount: 10, unit: 'г' },
  ], steps: ['Смешать творог', 'Добавить банан и мёд'] },
  { id: 'wrap_chicken', title: 'Лаваш с курицей и йогуртовым соусом', meal: 'snack', pref: 'meat', timeMin: 10, kcals: 420, protein: 32, fat: 10, carbs: 55, servings: 1, ingredients: [
    { name: 'Лаваш', amount: 1, unit: 'шт' },
    { name: 'Куриная грудка', amount: 120, unit: 'г', note: 'готовая' },
    { name: 'Йогурт натуральный', amount: 60, unit: 'г' },
    { name: 'Овощи (огурец/помидор)', amount: 120, unit: 'г' },
  ], steps: ['Смешать начинку', 'Свернуть в лаваш'] },
];

export const recipeById: Record<string, Recipe> = Object.fromEntries(recipes.map(r => [r.id, r]));


