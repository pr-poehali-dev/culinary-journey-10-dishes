import { useState } from "react";
import Icon from "@/components/ui/icon";
import { SECTIONS, sectionId } from "@/data/siteData";

type Props = {
  activeSection: string;
  onScrollTo: (id: string, label: string) => void;
};

export default function NavBar({ activeSection, onScrollTo }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (s: string) => {
    setMobileMenuOpen(false);
    onScrollTo(sectionId(s), s);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5" style={{ backgroundColor: "rgba(16,11,7,0.92)", backdropFilter: "blur(20px)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <button onClick={() => handleNav("Главная")} className="flex items-center gap-2">
          <span className="text-2xl">🔥</span>
          <span className="font-heading text-xl font-bold tracking-wider" style={{ background: "linear-gradient(135deg, #f97316, #fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>КУХНЯ</span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => handleNav(s)}
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
              onClick={() => handleNav(s)}
              className={`text-left font-body font-medium py-2 transition-colors ${activeSection === s ? "text-orange-400" : "text-white/60"}`}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
