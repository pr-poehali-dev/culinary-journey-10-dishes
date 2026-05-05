import { useState } from "react";
import Icon from "@/components/ui/icon";
import RecipePage from "./RecipePage";

const HERO_IMG = "https://cdn.poehali.dev/projects/b79f1559-19eb-419f-8b70-ac3f8f6dc7b2/files/af3ec1a4-e817-4a33-ad5e-4debb2b9c6b5.jpg";
const GALLERY_IMG = "https://cdn.poehali.dev/projects/b79f1559-19eb-419f-8b70-ac3f8f6dc7b2/files/e46ecee1-4e28-41cf-92a4-d9aaca105a4e.jpg";

const DISHES = [
  { id: 1, name: "Тартар из тунца", category: "Закуски", time: "20 мин", level: "Средний", emoji: "🐟", color: "from-blue-900/60 to-slate-900/60" },
  { id: 2, name: "Ризотто с трюфелем", category: "Горячее", time: "45 мин", level: "Сложный", emoji: "🍄", color: "from-amber-900/60 to-stone-900/60" },
  { id: 3, name: "Крем-брюле", category: "Десерты", time: "60 мин", level: "Средний", emoji: "🍮", color: "from-yellow-900/60 to-orange-900/60" },
  { id: 4, name: "Стейк рибай", category: "Горячее", time: "30 мин", level: "Лёгкий", emoji: "🥩", color: "from-red-900/60 to-rose-900/60" },
  { id: 5, name: "Тирамису", category: "Десерты", time: "40 мин", level: "Лёгкий", emoji: "☕", color: "from-yellow-900/60 to-amber-900/60" },
  { id: 6, name: "Паэлья с морепродуктами", category: "Горячее", time: "90 мин", level: "Сложный", emoji: "🦐", color: "from-orange-900/60 to-yellow-900/60" },
];

const RECIPES = [
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

const GALLERY_ITEMS = [
  { id: 1, label: "Завтрак", emoji: "🥐", bg: "from-amber-600 to-orange-700" },
  { id: 2, label: "Обед", emoji: "🥗", bg: "from-green-700 to-emerald-800" },
  { id: 3, label: "Ужин", emoji: "🍷", bg: "from-red-800 to-rose-900" },
  { id: 4, label: "Десерты", emoji: "🍰", bg: "from-pink-700 to-rose-800" },
  { id: 5, label: "Напитки", emoji: "🍹", bg: "from-cyan-700 to-blue-800" },
  { id: 6, label: "Снеки", emoji: "🧀", bg: "from-yellow-600 to-amber-700" },
];

const INITIAL_COMMENTS = [
  { id: 1, name: "Марина К.", text: "Готовила карбонару по вашему рецепту — семья в восторге! Главное — не добавлять сливки 😄", date: "23 апр", avatar: "М" },
  { id: 2, name: "Алексей Р.", text: "Стейк рибай получился сочным и ароматным. Спасибо за совет по времени обжарки!", date: "21 апр", avatar: "А" },
  { id: 3, name: "Юлия С.", text: "Фондан — просто магия! Подавала на день рождения, все просили рецепт.", date: "18 апр", avatar: "Ю" },
];

const SECTIONS = ["Главная", "Блюда", "Рецепты", "Галерея", "Контакты"];

const sectionId = (s: string) => {
  const map: Record<string, string> = {
    "Главная": "hero",
    "Блюда": "dishes",
    "Рецепты": "recipes",
    "Галерея": "gallery",
    "Контакты": "contacts",
  };
  return map[s] || "hero";
};

export default function Index() {
  const [activeSection, setActiveSection] = useState("Главная");
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState({ name: "", text: "" });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDish, setActiveDish] = useState<number | null>(null);
  const [activeRecipe, setActiveRecipe] = useState<number | null>(null);
  const [activeGallery, setActiveGallery] = useState<number | null>(null);
  const [allRecipesOpen, setAllRecipesOpen] = useState(false);
  const [openDishRecipe, setOpenDishRecipe] = useState<number | null>(null);

  // Contact form
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const sendContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.message.trim()) return;
    setContactStatus("sending");
    try {
      const res = await fetch("https://functions.poehali.dev/15b42c1b-c5b7-4f67-904d-e74591e05609", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });
      if (res.ok) {
        setContactStatus("sent");
        setContactForm({ name: "", email: "", message: "" });
      } else {
        setContactStatus("error");
      }
    } catch {
      setContactStatus("error");
    }
  };

  const scrollTo = (id: string, label: string) => {
    setActiveSection(label);
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.name.trim() || !newComment.text.trim()) return;
    setComments([
      {
        id: Date.now(),
        name: newComment.name,
        text: newComment.text,
        date: "Сейчас",
        avatar: newComment.name[0].toUpperCase(),
      },
      ...comments,
    ]);
    setNewComment({ name: "", text: "" });
  };

  if (openDishRecipe !== null) {
    return <RecipePage dishId={openDishRecipe} onBack={() => setOpenDishRecipe(null)} />;
  }

  return (
    <div className="min-h-screen font-body" style={{ backgroundColor: "#100b07" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5" style={{ backgroundColor: "rgba(16,11,7,0.92)", backdropFilter: "blur(20px)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("hero", "Главная")} className="flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            <span className="font-heading text-xl font-bold tracking-wider" style={{ background: "linear-gradient(135deg, #f97316, #fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>КУХНЯ</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {SECTIONS.map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(sectionId(s), s)}
                className={`nav-link font-body text-sm font-medium tracking-wide transition-colors ${activeSection === s ? "text-orange-400 active" : "text-white/60 hover:text-white"}`}
              >
                {s}
              </button>
            ))}
          </div>

          <button className="md:hidden text-white/70 hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 px-4 py-4 flex flex-col gap-3" style={{ backgroundColor: "rgba(16,11,7,0.98)" }}>
            {SECTIONS.map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(sectionId(s), s)}
                className={`text-left font-body font-medium py-2 transition-colors ${activeSection === s ? "text-orange-400" : "text-white/60"}`}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="hero" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(16,11,7,0.3) 0%, rgba(16,11,7,0.6) 50%, #100b07 100%)" }} />
        </div>

        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 animate-float" style={{ background: "radial-gradient(circle, #f97316, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full opacity-8 animate-float animate-delay-300" style={{ background: "radial-gradient(circle, #e11d48, transparent 70%)", filter: "blur(50px)" }} />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 animate-fade-in" style={{ borderColor: "rgba(249,115,22,0.3)", backgroundColor: "rgba(249,115,22,0.1)", animationFillMode: "forwards" }}>
            <span className="text-sm font-medium tracking-widest uppercase" style={{ color: "#f97316" }}>Вкус без границ</span>
          </div>

          <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold leading-none mb-6 animate-fade-in animate-delay-200" style={{ animationFillMode: "forwards" }}>
            <span className="text-white">ИСКУССТВО</span>
            <br />
            <span style={{ background: "linear-gradient(135deg, #f97316, #fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>ГОТОВИТЬ</span>
          </h1>

          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in animate-delay-400" style={{ animationFillMode: "forwards" }}>
            Авторские рецепты, гастрономические открытия и кулинарные секреты шеф-поваров со всего мира
          </p>

          <div className="flex flex-wrap gap-4 justify-center animate-fade-in animate-delay-500" style={{ animationFillMode: "forwards" }}>
            <button
              onClick={() => scrollTo("recipes", "Рецепты")}
              className="text-white font-heading font-semibold px-8 py-4 rounded-full text-lg tracking-wide hover:opacity-90 transition-all hover:scale-105 shadow-lg"
              style={{ background: "linear-gradient(135deg, #f97316 0%, #e11d48 100%)", boxShadow: "0 8px 32px rgba(249,115,22,0.35)" }}
            >
              Смотреть рецепты
            </button>
            <button
              onClick={() => scrollTo("dishes", "Блюда")}
              className="border text-white font-heading font-medium px-8 py-4 rounded-full text-lg tracking-wide transition-all hover:text-orange-400"
              style={{ borderColor: "rgba(255,255,255,0.2)" }}
            >
              Наши блюда
            </button>
          </div>

          <div className="mt-20 grid grid-cols-3 gap-6 max-w-sm mx-auto animate-fade-in animate-delay-600" style={{ animationFillMode: "forwards" }}>
            {[["120+", "Рецептов"], ["40+", "Блюд"], ["1200+", "Отзывов"]].map(([num, label]) => (
              <div key={label} className="text-center">
                <div className="font-heading text-2xl font-bold" style={{ color: "#f97316" }}>{num}</div>
                <div className="text-xs text-white/40 mt-1 tracking-wide uppercase">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <Icon name="ChevronDown" size={24} className="text-white/30" />
        </div>
      </section>

      {/* DISHES */}
      <section id="dishes" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 text-center">
            <span className="text-sm font-medium tracking-widest uppercase" style={{ color: "#f97316" }}>Наше меню</span>
            <h2 className="font-heading text-5xl md:text-6xl font-bold text-white mt-3">
              АВТОРСКИЕ{" "}
              <span style={{ background: "linear-gradient(135deg, #f97316, #fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>БЛЮДА</span>
            </h2>
            <p className="text-white/50 mt-4 max-w-xl mx-auto">Каждое блюдо — история вкуса, рассказанная через текстуры и ароматы</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DISHES.map((dish) => (
              <div
                key={dish.id}
                className="rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300"
                style={{ backgroundColor: "#1a100a", boxShadow: activeDish === dish.id ? "0 0 0 1px rgba(249,115,22,0.5), 0 16px 48px rgba(249,115,22,0.2)" : "0 0 0 1px rgba(249,115,22,0.1)" }}
                onClick={() => setActiveDish(activeDish === dish.id ? null : dish.id)}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                <div className={`bg-gradient-to-br ${dish.color} h-40 flex items-center justify-center relative overflow-hidden`}>
                  <span className="text-7xl group-hover:scale-110 transition-transform duration-300">{dish.emoji}</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute top-3 right-3 text-xs bg-black/40 text-white/80 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                    {dish.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-xl font-semibold text-white mb-3 group-hover:text-orange-400 transition-colors">{dish.name}</h3>
                  <div className="flex items-center justify-between text-sm text-white/40 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Icon name="Clock" size={14} className="text-orange-500/70" />
                      <span>{dish.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Icon name="ChefHat" size={14} className="text-orange-500/70" />
                      <span>{dish.level}</span>
                    </div>
                  </div>
                  <button
                    className="w-full py-2 rounded-xl text-sm font-heading font-semibold text-white transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #f97316, #e11d48)" }}
                    onClick={(e) => { e.stopPropagation(); setOpenDishRecipe(dish.id); }}
                  >
                    Смотреть рецепт →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECIPES */}
      <section id="recipes" className="py-24 px-4" style={{ backgroundColor: "#0d0905" }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 text-center">
            <span className="text-sm font-medium tracking-widest uppercase" style={{ color: "#fbbf24" }}>Пошагово</span>
            <h2 className="font-heading text-5xl md:text-6xl font-bold text-white mt-3">
              ЛУЧШИЕ{" "}
              <span style={{ background: "linear-gradient(135deg, #f97316, #fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>РЕЦЕПТЫ</span>
            </h2>
            <p className="text-white/50 mt-4 max-w-xl mx-auto">Подробные инструкции от шеф-поваров — готовьте уверенно</p>
          </div>

          <div className="space-y-5">
            {RECIPES.map((recipe) => (
              <div
                key={recipe.id}
                className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start cursor-pointer group transition-all duration-300 border"
                style={{ backgroundColor: "#1a100a", borderColor: activeRecipe === recipe.id ? "rgba(249,115,22,0.4)" : "rgba(255,255,255,0.05)" }}
                onClick={() => setActiveRecipe(activeRecipe === recipe.id ? null : recipe.id)}
              >
                <div className="flex-shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center text-5xl" style={{ backgroundColor: "#231610" }}>
                  {recipe.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-start gap-3 mb-3">
                    <h3 className="font-heading text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">{recipe.title}</h3>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${recipe.tagColor}`}>{recipe.tag}</span>
                  </div>
                  <p className="text-white/50 leading-relaxed mb-4">{recipe.desc}</p>
                  <div className="flex flex-wrap gap-5 text-sm text-white/40">
                    <div className="flex items-center gap-1.5">
                      <Icon name="Timer" size={15} className="text-orange-500/70" />
                      <span>{recipe.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Icon name="Users" size={15} className="text-orange-500/70" />
                      <span>{recipe.portions} порции</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Icon name="ListOrdered" size={15} className="text-orange-500/70" />
                      <span>{recipe.steps} шагов</span>
                    </div>
                  </div>
                  {activeRecipe === recipe.id && (
                    <div className="mt-4 pt-4 border-t border-white/10 animate-fade-in">
                      <p className="text-orange-400 text-sm font-medium mb-2">Хотите приготовить это блюдо?</p>
                      <button
                        className="text-white text-sm font-heading font-semibold px-5 py-2 rounded-full transition-all hover:opacity-90"
                        style={{ background: "linear-gradient(135deg, #f97316, #e11d48)" }}
                        onClick={(e) => { e.stopPropagation(); scrollTo("contacts", "Контакты"); }}
                      >
                        Записаться на мастер-класс →
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex-shrink-0 hidden md:flex">
                  <div className="w-10 h-10 rounded-full border flex items-center justify-center transition-all group-hover:bg-orange-500/10" style={{ borderColor: "rgba(249,115,22,0.3)" }}>
                    <Icon name="ArrowRight" size={18} className="text-orange-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              className="border text-orange-400 font-heading font-medium px-8 py-3 rounded-full tracking-wide transition-all hover:bg-orange-500/10"
              style={{ borderColor: "rgba(249,115,22,0.3)" }}
              onClick={() => setAllRecipesOpen(true)}
            >
              Все рецепты →
            </button>
          </div>

          {allRecipesOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }} onClick={() => setAllRecipesOpen(false)}>
              <div className="rounded-3xl p-8 max-w-md w-full text-center" style={{ backgroundColor: "#1a100a", border: "1px solid rgba(249,115,22,0.3)" }} onClick={(e) => e.stopPropagation()}>
                <span className="text-5xl mb-4 block">📖</span>
                <h3 className="font-heading text-2xl font-bold text-white mb-3">Скоро!</h3>
                <p className="text-white/50 mb-6">Полный каталог рецептов находится в разработке. Подпишитесь — мы сообщим о запуске.</p>
                <div className="flex gap-3">
                  <button
                    className="flex-1 text-white font-heading font-semibold py-3 rounded-full transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #f97316, #e11d48)" }}
                    onClick={() => { setAllRecipesOpen(false); scrollTo("contacts", "Контакты"); }}
                  >
                    Написать нам
                  </button>
                  <button
                    className="px-5 py-3 rounded-full border text-white/50 hover:text-white transition-colors"
                    style={{ borderColor: "rgba(255,255,255,0.1)" }}
                    onClick={() => setAllRecipesOpen(false)}
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 text-center">
            <span className="text-sm font-medium tracking-widest uppercase" style={{ color: "#e11d48" }}>Фотогалерея</span>
            <h2 className="font-heading text-5xl md:text-6xl font-bold text-white mt-3">
              ГАСТРО{" "}
              <span style={{ background: "linear-gradient(135deg, #f97316, #fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>ГАЛЕРЕЯ</span>
            </h2>
            <p className="text-white/50 mt-4 max-w-xl mx-auto">Каждый снимок — это приглашение к столу</p>
          </div>

          <div className="relative rounded-3xl overflow-hidden mb-5 h-72 md:h-96">
            <img src={GALLERY_IMG} alt="gallery" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(16,11,7,0.85) 0%, transparent 55%)" }} />
            <div className="absolute left-8 top-1/2 -translate-y-1/2">
              <span className="text-sm font-medium tracking-widest uppercase" style={{ color: "#f97316" }}>Специальная подборка</span>
              <h3 className="font-heading text-3xl md:text-4xl font-bold text-white mt-2">Краски вкуса</h3>
              <p className="text-white/60 mt-2 max-w-xs">Яркие блюда из кухонь разных стран</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {GALLERY_ITEMS.map((item) => (
              <div
                key={item.id}
                className={`bg-gradient-to-br ${item.bg} rounded-2xl h-28 md:h-36 flex flex-col items-center justify-center gap-2 cursor-pointer group transition-all duration-300 relative overflow-hidden`}
                style={{ transform: activeGallery === item.id ? "scale(1.08)" : "scale(1)", boxShadow: activeGallery === item.id ? "0 8px 32px rgba(0,0,0,0.4)" : "none" }}
                onClick={() => setActiveGallery(activeGallery === item.id ? null : item.id)}
              >
                <span className="text-4xl group-hover:scale-110 transition-transform duration-200">{item.emoji}</span>
                <span className="text-white text-xs font-medium tracking-wide uppercase opacity-80">{item.label}</span>
                {activeGallery === item.id && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-2xl" style={{ backgroundColor: "rgba(0,0,0,0.45)" }}>
                    <span className="text-white text-xs font-heading font-semibold tracking-wide px-3 text-center">Смотреть подборку</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMENTS */}
      <section className="py-20 px-4" style={{ backgroundColor: "#0d0905" }}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <span className="text-sm font-medium tracking-widest uppercase" style={{ color: "#fbbf24" }}>Ваш голос</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mt-3">
              ОТЗЫВЫ И{" "}
              <span style={{ background: "linear-gradient(135deg, #f97316, #fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>СОВЕТЫ</span>
            </h2>
          </div>

          <form onSubmit={submitComment} className="rounded-2xl p-6 md:p-8 mb-8 border" style={{ backgroundColor: "#1a100a", borderColor: "rgba(249,115,22,0.2)" }}>
            <h3 className="font-heading text-xl font-semibold text-white mb-5">Оставить отзыв</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Ваше имя"
                value={newComment.name}
                onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 text-sm outline-none border transition-colors"
                style={{ backgroundColor: "#231610", borderColor: "rgba(255,255,255,0.1)" }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#f97316"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
              />
            </div>
            <textarea
              placeholder="Поделитесь советом, впечатлением или вопросом..."
              value={newComment.text}
              onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 text-sm outline-none border resize-none mb-4 transition-colors"
              style={{ backgroundColor: "#231610", borderColor: "rgba(255,255,255,0.1)" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#f97316"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
            />
            <button
              type="submit"
              className="text-white font-heading font-semibold px-8 py-3 rounded-full text-sm tracking-wide hover:opacity-90 transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #f97316 0%, #e11d48 100%)", boxShadow: "0 4px 20px rgba(249,115,22,0.3)" }}
            >
              Отправить отзыв
            </button>
          </form>

          <div className="space-y-4">
            {comments.map((c) => (
              <div
                key={c.id}
                className="rounded-2xl p-5 border flex gap-4 group transition-colors"
                style={{ backgroundColor: "#1a100a", borderColor: "rgba(255,255,255,0.05)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(249,115,22,0.2)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)"; }}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-sm text-black" style={{ background: "linear-gradient(135deg, #f97316, #fbbf24)" }}>
                  {c.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-heading font-semibold text-white text-sm">{c.name}</span>
                    <span className="text-xs text-white/30 flex-shrink-0">{c.date}</span>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl overflow-hidden relative" style={{ backgroundColor: "#1a100a" }}>
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #f97316 0%, transparent 60%), radial-gradient(circle at 80% 50%, #e11d48 0%, transparent 60%)" }} />
            <div className="relative p-10 md:p-16 text-center">
              <span className="text-4xl mb-4 block">✉️</span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
                СВЯЖИТЕСЬ{" "}
                <span style={{ background: "linear-gradient(135deg, #f97316, #fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>С НАМИ</span>
              </h2>
              <p className="text-white/50 text-lg max-w-xl mx-auto mb-10">
                Есть идея для рецепта, предложение о сотрудничестве или просто хотите поговорить о еде?
              </p>

              {/* Info tiles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto mb-10">
                {[
                  { icon: "Mail", label: "Email", value: "hello@kukhnya.ru", href: "mailto:hello@kukhnya.ru" },
                  { icon: "MapPin", label: "Адрес", value: "Казань, Россия", href: "https://maps.yandex.ru/?text=Казань" },
                ].map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="rounded-2xl p-4 text-center border transition-colors block"
                    style={{ backgroundColor: "#231610", borderColor: "rgba(255,255,255,0.05)", textDecoration: "none" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(249,115,22,0.3)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)"; }}
                  >
                    <Icon name={c.icon as "Mail" | "MapPin"} size={20} className="text-orange-400 mx-auto mb-2" />
                    <div className="text-xs text-white/30 uppercase tracking-widest mb-1">{c.label}</div>
                    <div className="text-white text-sm font-medium">{c.value}</div>
                  </a>
                ))}
              </div>

              {/* Real contact form */}
              <form onSubmit={sendContact} className="max-w-xl mx-auto text-left space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Ваше имя *"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 text-sm outline-none border transition-colors"
                    style={{ backgroundColor: "#231610", borderColor: "rgba(255,255,255,0.1)" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#f97316"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                  />
                  <input
                    type="email"
                    placeholder="Ваш email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 text-sm outline-none border transition-colors"
                    style={{ backgroundColor: "#231610", borderColor: "rgba(255,255,255,0.1)" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#f97316"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                  />
                </div>
                <textarea
                  placeholder="Ваше сообщение *"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl text-white placeholder-white/30 text-sm outline-none border transition-colors resize-none"
                  style={{ backgroundColor: "#231610", borderColor: "rgba(255,255,255,0.1)" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#f97316"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                />
                {contactStatus === "sent" ? (
                  <div className="flex items-center justify-center gap-2 py-3 rounded-full border border-green-500/40 bg-green-500/10 text-green-400 font-heading font-semibold text-sm animate-fade-in">
                    <Icon name="CheckCircle" size={18} />
                    Сообщение отправлено! Мы скоро свяжемся
                  </div>
                ) : contactStatus === "error" ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 py-3 rounded-full border border-red-500/40 bg-red-500/10 text-red-400 font-heading font-semibold text-sm">
                      <Icon name="AlertCircle" size={18} />
                      Ошибка отправки — проверьте настройки почты
                    </div>
                    <button type="submit" className="w-full text-white font-heading font-semibold py-3 rounded-full text-sm tracking-wide hover:opacity-90 transition-all" style={{ background: "linear-gradient(135deg, #f97316, #e11d48)" }}>
                      Попробовать ещё раз
                    </button>
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={contactStatus === "sending"}
                    className="w-full text-white font-heading font-semibold py-4 rounded-full text-base tracking-wide hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                    style={{ background: "linear-gradient(135deg, #f97316 0%, #e11d48 100%)", boxShadow: "0 8px 32px rgba(249,115,22,0.35)" }}
                  >
                    {contactStatus === "sending" ? (
                      <>
                        <Icon name="Loader" size={18} className="animate-spin" />
                        Отправляем...
                      </>
                    ) : (
                      "Отправить сообщение"
                    )}
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔥</span>
            <span className="font-heading text-lg font-bold tracking-wider" style={{ background: "linear-gradient(135deg, #f97316, #fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>КУХНЯ</span>
          </div>
          <div className="flex gap-6">
            {SECTIONS.map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(sectionId(s), s)}
                className="text-white/30 hover:text-orange-400 text-xs tracking-wide transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
          <p className="text-white/20 text-xs">© 2026 Кухня. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}