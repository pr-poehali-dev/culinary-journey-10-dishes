import { useState } from "react";
import Icon from "@/components/ui/icon";
import { HERO_IMG, GALLERY_IMG, DISHES, RECIPES, GALLERY_ITEMS } from "@/data/siteData";

type Props = {
  onScrollTo: (id: string, label: string) => void;
  onOpenDishRecipe: (id: number) => void;
};

export default function MainSections({ onScrollTo, onOpenDishRecipe }: Props) {
  const [activeDish, setActiveDish] = useState<number | null>(null);
  const [activeRecipe, setActiveRecipe] = useState<number | null>(null);
  const [activeGallery, setActiveGallery] = useState<number | null>(null);
  const [allRecipesOpen, setAllRecipesOpen] = useState(false);

  return (
    <>
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
              onClick={() => onScrollTo("recipes", "Рецепты")}
              className="text-white font-heading font-semibold px-8 py-4 rounded-full text-lg tracking-wide hover:opacity-90 transition-all hover:scale-105 shadow-lg"
              style={{ background: "linear-gradient(135deg, #f97316 0%, #e11d48 100%)", boxShadow: "0 8px 32px rgba(249,115,22,0.35)" }}
            >
              Смотреть рецепты
            </button>
            <button
              onClick={() => onScrollTo("dishes", "Блюда")}
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
                    onClick={(e) => { e.stopPropagation(); onOpenDishRecipe(dish.id); }}
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
                        onClick={(e) => { e.stopPropagation(); onScrollTo("contacts", "Контакты"); }}
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
                    onClick={() => { setAllRecipesOpen(false); onScrollTo("contacts", "Контакты"); }}
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
    </>
  );
}
