import Icon from "@/components/ui/icon";

type RecipeDetail = {
  id: number;
  name: string;
  emoji: string;
  category: string;
  time: string;
  level: string;
  portions: number;
  desc: string;
  ingredients: string[];
  steps: { title: string; text: string }[];
  color: string;
};

const RECIPE_DETAILS: Record<number, RecipeDetail> = {
  1: {
    id: 1,
    name: "Тартар из тунца",
    emoji: "🐟",
    category: "Закуски",
    time: "20 мин",
    level: "Средний",
    portions: 2,
    desc: "Свежий тунец с авокадо, соевым соусом и кунжутным маслом — лёгкая и изысканная закуска в японском стиле.",
    color: "from-blue-900 to-slate-900",
    ingredients: [
      "300 г свежего тунца (сашими-качество)",
      "1 спелый авокадо",
      "2 ст.л. соевого соуса",
      "1 ч.л. кунжутного масла",
      "1 ч.л. свежего имбиря (тёртого)",
      "Сок половины лайма",
      "1 ч.л. кунжута",
      "Зелёный лук для подачи",
    ],
    steps: [
      { title: "Подготовка тунца", text: "Нарежьте тунца мелкими кубиками ~0,5 см. Держите рыбу холодной — работайте быстро." },
      { title: "Маринад", text: "Смешайте соевый соус, кунжутное масло, имбирь и сок лайма в миске." },
      { title: "Авокадо", text: "Нарежьте авокадо такими же кубиками. Сбрызните лаймом, чтобы не потемнел." },
      { title: "Сборка", text: "Соедините тунца с маринадом, аккуратно перемешайте. Добавьте авокадо, перемешайте ещё раз." },
      { title: "Подача", text: "Выложите тартар через кулинарное кольцо или просто горкой. Посыпьте кунжутом и зелёным луком." },
    ],
  },
  2: {
    id: 2,
    name: "Ризотто с трюфелем",
    emoji: "🍄",
    category: "Горячее",
    time: "45 мин",
    level: "Сложный",
    portions: 4,
    desc: "Кремовое ризотто с трюфельным маслом, пармезаном и белыми грибами. Ресторанное блюдо на вашей кухне.",
    color: "from-amber-900 to-stone-900",
    ingredients: [
      "300 г риса арборио",
      "1 л куриного бульона (горячего)",
      "150 мл белого сухого вина",
      "2 ст.л. трюфельного масла",
      "100 г пармезана (тёртого)",
      "50 г сливочного масла",
      "1 луковица шалот",
      "200 г белых грибов",
      "2 зубчика чеснока",
      "Соль, перец по вкусу",
    ],
    steps: [
      { title: "Обжарка грибов", text: "Нарежьте грибы и обжарьте на сильном огне с чесноком до золотистой корочки. Отложите." },
      { title: "Поджарка лука", text: "В той же сковороде растопите масло, обжарьте шалот до прозрачности (~5 мин)." },
      { title: "Тостируем рис", text: "Добавьте рис, перемешайте и обжаривайте 2 минуты — зёрна должны стать слегка прозрачными." },
      { title: "Вино", text: "Влейте вино и мешайте до полного впитывания." },
      { title: "Добавляем бульон", text: "Вливайте горячий бульон по половнику, каждый раз дожидаясь впитывания. Процесс ~20 мин." },
      { title: "Финал (мантекатура)", text: "Снимите с огня. Вбейте холодное сливочное масло, пармезан, трюфельное масло. Активно мешайте — ризотто должно стать кремовым." },
      { title: "Сборка", text: "Выложите ризотто в тарелку, сверху — грибы, ещё пармезан и капля трюфельного масла." },
    ],
  },
  3: {
    id: 3,
    name: "Крем-брюле",
    emoji: "🍮",
    category: "Десерты",
    time: "60 мин",
    level: "Средний",
    portions: 4,
    desc: "Французский классик — нежный ванильный крем под хрустящей карамельной корочкой. Магия кухонной горелки.",
    color: "from-yellow-900 to-orange-900",
    ingredients: [
      "500 мл жирных сливок (35%)",
      "5 желтков",
      "100 г сахара + 4 ст.л. для карамели",
      "1 стручок ванили (или 1 ч.л. экстракта)",
      "Щепотка соли",
    ],
    steps: [
      { title: "Нагреваем сливки", text: "Нагрейте сливки с ванилью почти до кипения. Снимите с огня, дайте настояться 10 минут." },
      { title: "Желтки с сахаром", text: "Взбейте желтки с 100 г сахара добела. Масса должна стать густой и воздушной." },
      { title: "Соединяем", text: "Влейте горячие сливки в желтки тонкой струйкой, постоянно мешая. Процедите через сито." },
      { title: "Запекаем", text: "Разлейте по формочкам. Поставьте в противень с горячей водой (водяная баня). Запекайте при 150°C 40-45 минут." },
      { title: "Охлаждение", text: "Достаньте, остудите при комнатной температуре, затем уберите в холодильник минимум на 2 часа." },
      { title: "Карамель", text: "Посыпьте поверхность тонким слоем сахара и обожгите горелкой до золотистой корочки. Подавайте сразу!" },
    ],
  },
  4: {
    id: 4,
    name: "Стейк рибай",
    emoji: "🥩",
    category: "Горячее",
    time: "30 мин",
    level: "Лёгкий",
    portions: 2,
    desc: "Сочный мраморный стейк с ароматным маслом и тимьяном. Идеальная прожарка medium-rare за 8 минут.",
    color: "from-red-900 to-rose-900",
    ingredients: [
      "2 стейка рибай (~300 г каждый, толщина 3 см)",
      "2 ст.л. растительного масла",
      "50 г сливочного масла",
      "3 зубчика чеснока",
      "Веточки тимьяна и розмарина",
      "Соль крупная, чёрный перец",
    ],
    steps: [
      { title: "Подготовка", text: "Достаньте мясо из холодильника за 30 минут. Обсушите бумажным полотенцем. Щедро посолите и поперчите." },
      { title: "Разогрев сковороды", text: "Разогрейте чугунную сковороду на максимальном огне 3-4 минуты до лёгкого дымка." },
      { title: "Обжарка", text: "Смажьте стейки маслом. Жарьте 3 минуты без движения. Переверните — ещё 3 минуты." },
      { title: "Ароматизация", text: "Добавьте сливочное масло, чеснок и травы. Наклоните сковороду и ложкой поливайте стейк горячим маслом 1-2 минуты." },
      { title: "Отдых", text: "Переложите стейк на доску. Накройте фольгой и дайте отдохнуть 5-7 минут — это обязательно!" },
      { title: "Подача", text: "Нарежьте поперёк волокон. Сверху положите кусочек сливочного масла с зеленью." },
    ],
  },
  5: {
    id: 5,
    name: "Тирамису",
    emoji: "☕",
    category: "Десерты",
    time: "40 мин",
    level: "Лёгкий",
    portions: 6,
    desc: "Итальянский десерт без выпечки — савоярди, маскарпоне, эспрессо и капля амаретто. Готовится за 40 минут.",
    color: "from-yellow-900 to-amber-900",
    ingredients: [
      "250 г маскарпоне",
      "3 яйца (разделить белки и желтки)",
      "80 г сахара",
      "200 мл крепкого эспрессо (остывшего)",
      "200 г печенья савоярди",
      "2 ст.л. амаретто или рома (по желанию)",
      "Какао-порошок для посыпки",
    ],
    steps: [
      { title: "Крем: желтки", text: "Взбейте желтки с сахаром на водяной бане до светлой пышной массы (~5 мин). Остудите." },
      { title: "Маскарпоне", text: "Вмешайте маскарпоне в желтковую массу лопаткой до однородности." },
      { title: "Белки", text: "Взбейте белки с щепоткой соли до устойчивых пиков. Аккуратно введите в крем снизу вверх." },
      { title: "Кофейный сироп", text: "Смешайте эспрессо с алкоголем. Быстро окунайте каждое савоярди — не более 2 секунд с каждой стороны." },
      { title: "Сборка", text: "Выложите слой савоярди, затем половину крема. Повторите. Разровняйте поверхность." },
      { title: "Охлаждение", text: "Уберите в холодильник на 4-6 часов (лучше на ночь). Перед подачей щедро посыпьте какао." },
    ],
  },
  6: {
    id: 6,
    name: "Паэлья с морепродуктами",
    emoji: "🦐",
    category: "Горячее",
    time: "90 мин",
    level: "Сложный",
    portions: 6,
    desc: "Испанская паэлья с креветками, мидиями и кальмарами. Золотая корочка сокаррат — признак мастерства.",
    color: "from-orange-900 to-yellow-900",
    ingredients: [
      "400 г риса арборио или паэльеро",
      "300 г королевских креветок",
      "300 г мидий в раковинах",
      "200 г кальмаров (кольца)",
      "800 мл рыбного бульона",
      "400 г томатов (пюре)",
      "1 луковица, 4 зубчика чеснока",
      "1 красный перец",
      "1 ч.л. шафрана (замочить в 50 мл тёплой воды)",
      "1 ч.л. паприки копчёной",
      "Оливковое масло, соль, лимон",
    ],
    steps: [
      { title: "Шафрановый настой", text: "Замочите шафран в тёплой воде на 15 минут. Он отдаст цвет и аромат." },
      { title: "Соффрито", text: "Обжарьте лук и чеснок на оливковом масле. Добавьте перец, через 5 минут — томатное пюре. Тушите 10 минут." },
      { title: "Морепродукты", text: "Обжарьте кальмары и креветки отдельно по 2 минуты. Отложите." },
      { title: "Рис", text: "Добавьте рис к соффрито, обжарьте 2 минуты. Влейте шафрановый настой и паприку." },
      { title: "Бульон", text: "Влейте горячий бульон, распределите рис равномерно. Готовьте без помешивания 10 минут на среднем огне." },
      { title: "Морепродукты в рис", text: "Выложите мидии, креветки и кальмары на рис. Убавьте огонь, готовьте ещё 10 минут." },
      { title: "Сокаррат", text: "Увеличьте огонь на 1-2 минуты — услышите лёгкое потрескивание. Это образуется хрустящая корочка на дне." },
      { title: "Отдых", text: "Накройте паэлью газетой или фольгой на 5 минут. Подавайте с дольками лимона." },
    ],
  },
};

type Props = {
  dishId: number;
  onBack: () => void;
};

export default function RecipePage({ dishId, onBack }: Props) {
  const recipe = RECIPE_DETAILS[dishId];
  if (!recipe) return null;

  return (
    <div className="min-h-screen font-body" style={{ backgroundColor: "#100b07" }}>
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-white/5" style={{ backgroundColor: "rgba(16,11,7,0.95)", backdropFilter: "blur(20px)" }}>
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
          >
            <Icon name="ArrowLeft" size={18} />
            Назад
          </button>
          <div className="w-px h-4 bg-white/10" />
          <span className="text-white/40 text-sm">{recipe.category}</span>
          <span className="text-white/20">·</span>
          <span className="text-white/60 text-sm font-medium">{recipe.name}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero block */}
        <div className={`bg-gradient-to-br ${recipe.color} rounded-3xl p-8 md:p-12 mb-10 relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)" }} />
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
            <span className="text-8xl">{recipe.emoji}</span>
            <div>
              <span className="text-white/60 text-sm font-medium tracking-widest uppercase">{recipe.category}</span>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mt-1 mb-3">{recipe.name}</h1>
              <p className="text-white/70 text-lg leading-relaxed max-w-xl">{recipe.desc}</p>
            </div>
          </div>
          <div className="relative flex flex-wrap gap-6 mt-8 pt-6 border-t border-white/10">
            {[
              { icon: "Clock", label: "Время", value: recipe.time },
              { icon: "ChefHat", label: "Уровень", value: recipe.level },
              { icon: "Users", label: "Порций", value: String(recipe.portions) },
              { icon: "ListOrdered", label: "Шагов", value: String(recipe.steps.length) },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <Icon name={s.icon as "Clock" | "ChefHat" | "Users" | "ListOrdered"} size={16} className="text-white/50" />
                <span className="text-white/50 text-sm">{s.label}:</span>
                <span className="text-white font-semibold text-sm">{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Ingredients */}
          <div className="md:col-span-1">
            <div className="rounded-2xl p-6 sticky top-20" style={{ backgroundColor: "#1a100a", border: "1px solid rgba(249,115,22,0.15)" }}>
              <h2 className="font-heading text-xl font-bold text-white mb-5 flex items-center gap-2">
                <Icon name="ShoppingBasket" size={20} className="text-orange-400" />
                Ингредиенты
              </h2>
              <ul className="space-y-3">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5" style={{ background: "linear-gradient(135deg, #f97316, #e11d48)", color: "#fff" }}>
                      {i + 1}
                    </span>
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Steps */}
          <div className="md:col-span-2">
            <h2 className="font-heading text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Icon name="BookOpen" size={20} className="text-orange-400" />
              Пошаговый рецепт
            </h2>
            <div className="space-y-4">
              {recipe.steps.map((step, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-5 flex gap-4 border border-white/5 hover:border-orange-500/20 transition-colors"
                  style={{ backgroundColor: "#1a100a" }}
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-heading font-bold text-sm" style={{ background: "linear-gradient(135deg, #f97316, #e11d48)", color: "#fff" }}>
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-white mb-1">{step.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl p-6 text-center border" style={{ backgroundColor: "#1a100a", borderColor: "rgba(249,115,22,0.2)" }}>
              <span className="text-2xl block mb-2">🍽️</span>
              <p className="text-white/60 text-sm">Приятного аппетита! Поделитесь результатом — оставьте отзыв на сайте.</p>
              <button
                onClick={onBack}
                className="mt-4 text-sm text-orange-400 hover:text-orange-300 transition-colors font-medium"
              >
                ← Вернуться к блюдам
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
