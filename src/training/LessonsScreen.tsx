import { useState } from "react";
import { ScreenShell } from "../app/ScreenShell";
import { TrainTabs } from "./TrainTabs";
import { useNav } from "../app/nav";
import { storage } from "../storage";
import { PlayingCard } from "../components/Card";
import { Lesson, LESSONS } from "./lessons";
import { useT } from "../i18n";

export function LessonsScreen() {
  const t = useT();
  const [openId, setOpenId] = useState<string | null>(null);
  const [done, setDone] = useState<string[]>(() => storage.loadDoneLessons());

  const markDone = (id: string) => {
    storage.setLessonDone(id);
    setDone(storage.loadDoneLessons());
  };

  const lesson = LESSONS.find((l) => l.id === openId);
  if (lesson) {
    return (
      <LessonView
        key={lesson.id}
        lesson={lesson}
        onDone={() => markDone(lesson.id)}
        onBack={() => setOpenId(null)}
      />
    );
  }

  return (
    <ScreenShell title={t("lesson.title")}>
      <TrainTabs current="lessons" />
      <p className="mb-3 text-sm text-white/70">
        {t("lesson.progress", { done: done.length, total: LESSONS.length })}
      </p>
      <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full bg-yellow-400 transition-all"
          style={{ width: `${(100 * done.length) / LESSONS.length}%` }}
        />
      </div>
      <div className="flex flex-col gap-2">
        {LESSONS.map((l, i) => {
          const isDone = done.includes(l.id);
          return (
            <button
              key={l.id}
              onClick={() => setOpenId(l.id)}
              className="flex items-center gap-3 rounded-xl bg-white/8 p-3 text-left ring-1 ring-white/10 hover:bg-white/12"
            >
              <span className="text-2xl" aria-hidden>
                {l.emoji}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">
                  {i + 1}. {l.title}
                </span>
                <span className="block text-xs text-white/55">{t("lesson.steps", { n: l.steps.length })}</span>
              </span>
              <span className="text-lg">{isDone ? "✅" : "›"}</span>
            </button>
          );
        })}
      </div>
    </ScreenShell>
  );
}

function LessonView({
  lesson,
  onDone,
  onBack,
}: {
  lesson: Lesson;
  onDone: () => void;
  onBack: () => void;
}) {
  const t = useT();
  const go = useNav((s) => s.go);

  // Toute la leçon sur une seule page : chaque idée est un bloc visible, et
  // l'illustration en cartes réelles s'affiche en évidence (pas de carrousel).
  return (
    <ScreenShell title={lesson.title} onBack={onBack}>
      <div className="mb-4 flex items-center gap-3">
        <span className="text-4xl" aria-hidden>
          {lesson.emoji}
        </span>
        <h2 className="text-xl font-bold">{lesson.title}</h2>
      </div>

      <div className="flex flex-col gap-2.5">
        {lesson.steps.map((step, k) => (
          <div
            key={k}
            className="flex gap-3 rounded-2xl bg-white/8 p-4 text-[15px] leading-relaxed ring-1 ring-white/10"
          >
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-yellow-400/90 text-sm font-bold text-emerald-950">
              {k + 1}
            </span>
            <p className="text-white/90">{step}</p>
          </div>
        ))}
      </div>

      {lesson.visual && (
        <div className="mt-4 rounded-2xl bg-emerald-900/40 p-4 ring-1 ring-emerald-600/40">
          <div className="flex flex-wrap justify-center gap-1.5">
            {lesson.visual.cards.map((card) => (
              <PlayingCard key={card.id} card={card} size="md" />
            ))}
          </div>
          <p className="mt-3 text-center text-sm text-white/75">{lesson.visual.caption}</p>
        </div>
      )}

      <button
        onClick={() => {
          onDone();
          if (lesson.practice) go("exercises");
          else onBack();
        }}
        className="mt-5 w-full rounded-lg bg-yellow-400 py-3 text-sm font-bold text-emerald-950 hover:bg-yellow-300"
      >
        {lesson.practice ? t("lesson.practice") : t("lesson.finish")}
      </button>
    </ScreenShell>
  );
}
