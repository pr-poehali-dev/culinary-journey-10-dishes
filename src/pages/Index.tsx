import { useState } from "react";
import RecipePage from "./RecipePage";
import NavBar from "@/components/NavBar";
import MainSections from "@/components/MainSections";
import CommentsSection from "@/components/CommentsSection";
import ContactsSection from "@/components/ContactsSection";

export default function Index() {
  const [activeSection, setActiveSection] = useState("Главная");
  const [openDishRecipe, setOpenDishRecipe] = useState<number | null>(null);

  const scrollTo = (id: string, label: string) => {
    setActiveSection(label);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  if (openDishRecipe !== null) {
    return <RecipePage dishId={openDishRecipe} onBack={() => setOpenDishRecipe(null)} />;
  }

  return (
    <div className="min-h-screen font-body" style={{ backgroundColor: "#100b07" }}>
      <NavBar activeSection={activeSection} onScrollTo={scrollTo} />
      <MainSections onScrollTo={scrollTo} onOpenDishRecipe={setOpenDishRecipe} />
      <CommentsSection />
      <ContactsSection onScrollTo={scrollTo} />
    </div>
  );
}
