import { useState } from "react";
import Icon from "@/components/ui/icon";
import { SECTIONS, sectionId } from "@/data/siteData";

type Props = {
  onScrollTo: (id: string, label: string) => void;
};

export default function ContactsSection({ onScrollTo }: Props) {
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

  return (
    <>
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
                onClick={() => onScrollTo(sectionId(s), s)}
                className="text-white/30 hover:text-orange-400 text-xs tracking-wide transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
          <p className="text-white/20 text-xs">© 2026 Кухня. Все права защищены.</p>
        </div>
      </footer>
    </>
  );
}
