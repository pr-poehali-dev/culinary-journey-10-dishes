import { useState } from "react";
import Icon from "@/components/ui/icon";
import { INITIAL_COMMENTS, Comment } from "@/data/siteData";

export default function CommentsSection() {
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState({ name: "", text: "" });

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

  return (
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
  );
}
