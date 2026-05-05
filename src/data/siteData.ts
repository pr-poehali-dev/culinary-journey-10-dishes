export const HERO_IMG = "https://cdn.poehali.dev/projects/b79f1559-19eb-419f-8b70-ac3f8f6dc7b2/files/af3ec1a4-e817-4a33-ad5e-4debb2b9c6b5.jpg";
export const GALLERY_IMG = "https://cdn.poehali.dev/projects/b79f1559-19eb-419f-8b70-ac3f8f6dc7b2/files/e46ecee1-4e28-41cf-92a4-d9aaca105a4e.jpg";

export const DISHES = [
  { id: 1, name: "Тартар из тунца", category: "Закуски", time: "20 мин", level: "Средний", emoji: "🐟", color: "from-blue-900/60 to-slate-900/60" },
  { id: 2, name: "Ризотто с трюфелем", category: "Горячее", time: "45 мин", level: "Сложный", emoji: "🍄", color: "from-amber-900/60 to-stone-900/60" },
  { id: 3, name: "Крем-брюле", category: "Десерты", time: "60 мин", level: "Средний", emoji: "🍮", color: "from-yellow-900/60 to-orange-900/60" },
  { id: 4, name: "Стейк рибай", category: "Горячее", time: "30 мин", level: "Лёгкий", emoji: "🥩", color: "from-red-900/60 to-rose-900/60" },
  { id: 5, name: "Тирамису", category: "Десерты", time: "40 мин", level: "Лёгкий", emoji: "☕", color: "from-yellow-900/60 to-amber-900/60" },
  { id: 6, name: "Паэлья с морепродуктами", category: "Горячее", time: "90 мин", level: "Сложный", emoji: "🦐", color: "from-orange-900/60 to-yellow-900/60" },
];

export const RECIPES = [
  {
    id: 1,
    title: "Идеальная паста карбонара",
    desc: "Настоящий римский рецепт без сливок — только яйца, гуанчале и пекорино. Шаг за шагом к совершенству.",
    time: "25 мин",
    portions: 2,
    steps: 6,
    emoji: "🍝",
    tag: "Популярное",
    tagColor: "bg-orange-500 text-white",
  },
  {
    id: 2,
    title: "Говяжий бульон по-французски",
    desc: "Насыщенный консоме с овощами, пряными травами и бокалом красного вина. Основа классической кухни.",
    time: "3 часа",
    portions: 6,
    steps: 8,
    emoji: "🍲",
    tag: "Мастер-класс",
    tagColor: "bg-rose-600 text-white",
  },
  {
    id: 3,
    title: "Шоколадный фондан",
    desc: "Горячее шоколадное сердце с хрустящей корочкой. Приготовьте за 15 минут и удивите гостей.",
    time: "15 мин",
    portions: 4,
    steps: 5,
    emoji: "🍫",
    tag: "Быстро",
    tagColor: "bg-amber-400 text-black",
  },
];

export const GALLERY_ITEMS = [
  { id: 1, label: "Завтрак", emoji: "🥐", bg: "from-amber-600 to-orange-700" },
  { id: 2, label: "Обед", emoji: "🥗", bg: "from-green-700 to-emerald-800" },
  { id: 3, label: "Ужин", emoji: "🍷", bg: "from-red-800 to-rose-900" },
  { id: 4, label: "Десерты", emoji: "🍰", bg: "from-pink-700 to-rose-800" },
  { id: 5, label: "Напитки", emoji: "🍹", bg: "from-cyan-700 to-blue-800" },
  { id: 6, label: "Снеки", emoji: "🧀", bg: "from-yellow-600 to-amber-700" },
];

export const INITIAL_COMMENTS = [
  { id: 1, name: "Марина К.", text: "Готовила карбонару по вашему рецепту — семья в восторге! Главное — не добавлять сливки 😄", date: "23 апр", avatar: "М" },
  { id: 2, name: "Алексей Р.", text: "Стейк рибай получился сочным и ароматным. Спасибо за совет по времени обжарки!", date: "21 апр", avatar: "А" },
  { id: 3, name: "Юлия С.", text: "Фондан — просто магия! Подавала на день рождения, все просили рецепт.", date: "18 апр", avatar: "Ю" },
];

export const SECTIONS = ["Главная", "Блюда", "Рецепты", "Галерея", "Контакты"];

export const sectionId = (s: string): string => {
  const map: Record<string, string> = {
    "Главная": "hero",
    "Блюда": "dishes",
    "Рецепты": "recipes",
    "Галерея": "gallery",
    "Контакты": "contacts",
  };
  return map[s] || "hero";
};

export type Comment = { id: number; name: string; text: string; date: string; avatar: string };
