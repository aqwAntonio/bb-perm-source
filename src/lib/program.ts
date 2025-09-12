export type Goal = 'strength' | 'hypertrophy' | 'general';

export interface Equipment {
  barbell: boolean;
  rack: boolean; // для приседов/жима со штангой
  bench: boolean;
  dumbbells: boolean;
  pullup: boolean;
  machines: boolean; // блочные тренажёры
}

export interface GenerateParams {
  level: 'novice' | 'intermediate';
  frequency: 3 | 4;
  goal: Goal;
  weeks: number; // 4..8
  equipment: Equipment;
}

export interface DayPlan {
  title: string; // e.g., "Неделя 1, Пн (Upper)"
  blocks: string[]; // e.g., ["Присед 3×5", "Жим лёжа 3×5"]
}

export interface WeekPlan {
  week: number;
  days: DayPlan[];
  note: string; // подсказка по прогрессии
}

function pickSquat(e: Equipment): string {
  if (e.barbell && e.rack) return 'Присед со штангой';
  if (e.dumbbells) return 'Гоблет‑присед с гантелью';
  return 'Сплит‑присед (без оборудования)';
}

function pickHinge(e: Equipment): string {
  if (e.barbell) return 'Становая тяга со штангой';
  if (e.dumbbells) return 'Румынская тяга с гантелями';
  return 'Ягодичный мост (без оборудования)';
}

function pickBench(e: Equipment): string {
  if (e.barbell && e.bench && e.rack) return 'Жим лёжа со штангой';
  if (e.dumbbells && e.bench) return 'Жим гантелей лёжа';
  return 'Отжимания от пола';
}

function pickOverhead(e: Equipment): string {
  if (e.barbell) return 'Жим штанги стоя';
  if (e.dumbbells) return 'Жим гантелей стоя/сидя';
  return 'Отжимания в стойке у стены/плечевой жим без отягощений';
}

function pickRow(e: Equipment): string {
  if (e.barbell) return 'Тяга штанги в наклоне';
  if (e.dumbbells) return 'Тяга гантели в наклоне (поочерёдно)';
  if (e.rack) return 'Горизонтальная тяга собственным весом (inverted row)';
  return 'Тяга резиной к поясу';
}

function pickVerticalPull(e: Equipment): string {
  if (e.pullup) return 'Подтягивания';
  if (e.machines) return 'Тяга верхнего блока';
  return 'Тяга резины сверху (имитация)';
}

function scheme(goal: Goal, movement: 'main' | 'assist'): string {
  if (goal === 'strength') {
    return movement === 'main' ? '3×5' : '3×8';
  }
  if (goal === 'hypertrophy') {
    return movement === 'main' ? '4×8–12' : '3–4×12–15';
  }
  // general
  return movement === 'main' ? '3×6–10' : '3×10–12';
}

function progressionNote(week: number, goal: Goal): string {
  if (goal === 'strength') {
    return week === 1 ? 'Старт: подберите вес с запасом 2–3 повтора.' : 'Добавьте ~2.5 кг к базовым упражнениям (или +2.5%).';
  }
  if (goal === 'hypertrophy') {
    return week % 2 === 0 ? 'Стремитесь к верхней границе диапазона повторов, затем увеличьте вес.' : 'Работайте близко к отказу (RIR 1–2).';
  }
  return week % 2 === 0 ? 'Лёгкая неделя: уменьшите вес на 10%.' : 'Возвращайтесь к обычным весам, отслеживайте технику.';
}

function dayTemplateAB(index: number, e: Equipment, g: Goal): string[] {
  // A: squat, bench/press, row, core; B: hinge, overhead, vertical pull, core
  const A = [
    `${pickSquat(e)} ${scheme(g, 'main')}`,
    `${pickBench(e)} ${scheme(g, 'main')}`,
    `${pickRow(e)} ${scheme(g, 'assist')}`,
    `Пресс ${g === 'hypertrophy' ? '3×15–20' : '3×12'}`,
  ];
  const B = [
    `${pickHinge(e)} ${scheme(g, 'main')}`,
    `${pickOverhead(e)} ${scheme(g, 'main')}`,
    `${pickVerticalPull(e)} ${scheme(g, 'assist')}`,
    `Планка ${g === 'hypertrophy' ? '3×45–60с' : '3×30–45с'}`,
  ];
  return index % 2 === 0 ? A : B;
}

function dayTemplateUpper(e: Equipment, g: Goal): string[] {
  return [
    `${pickBench(e)} ${scheme(g, 'main')}`,
    `${pickRow(e)} ${scheme(g, 'main')}`,
    `${pickOverhead(e)} ${scheme(g, 'assist')}`,
    `${pickVerticalPull(e)} ${scheme(g, 'assist')}`,
    `Бицепс/Трицепс ${g === 'hypertrophy' ? '3×12–15' : '2–3×10–12'}`,
  ];
}

function dayTemplateLower(e: Equipment, g: Goal): string[] {
  return [
    `${pickSquat(e)} ${scheme(g, 'main')}`,
    `${pickHinge(e)} ${scheme(g, 'main')}`,
    `Выпады/Болгарские приседы ${g === 'hypertrophy' ? '3×12–15' : '3×8–10'}`,
    `Кор/ягодичные ${g === 'hypertrophy' ? '3×15–20' : '3×12'}`,
  ];
}

export function generateProgram(params: GenerateParams): WeekPlan[] {
  const { frequency, goal, weeks, equipment } = params;
  const totalWeeks = Math.max(4, Math.min(8, weeks));
  const plans: WeekPlan[] = [];

  for (let w = 1; w <= totalWeeks; w++) {
    if (frequency === 3) {
      const daysNames = ['Пн', 'Ср', 'Пт'];
      const days: DayPlan[] = daysNames.map((d, i) => ({
        title: `Неделя ${w}, ${d}`,
        blocks: dayTemplateAB(i + w, equipment, goal), // чередуем A/B меж неделями
      }));
      plans.push({ week: w, days, note: progressionNote(w, goal) });
    } else {
      const daysNames = ['Пн (Upper)', 'Вт (Lower)', 'Чт (Upper)', 'Сб (Lower)'];
      const days: DayPlan[] = daysNames.map((d, i) => ({
        title: `Неделя ${w}, ${d}`,
        blocks: i % 2 === 0 ? dayTemplateUpper(equipment, goal) : dayTemplateLower(equipment, goal),
      }));
      plans.push({ week: w, days, note: progressionNote(w, goal) });
    }
  }

  return plans;
}


