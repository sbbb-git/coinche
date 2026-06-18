import { useState } from "react";
import { ScreenShell } from "../app/ScreenShell";
import { useNav } from "../app/nav";
import { storage } from "../storage";
import { Lesson, LESSONS } from "./lessons";

export function LessonsScreen() {
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
    <ScreenShell title="Leçons">
      <p className="mb-3 text-sm text-white/70">
        Un parcours progressif, des règles aux conventions. {done.length}/{LESSONS.length} terminées.
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
                <span className="block text-xs text-white/55">{l.steps.length} étapes</span>
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
  const [i, setI] = useState(0);
  const go = useNav((s) => s.go);
  const last = i === lesson.steps.length - 1;

  return (
    <ScreenShell title={lesson.title} onBack={onBack}>
      <div className="mb-3 flex gap-1">
        {lesson.steps.map((_, k) => (
          <div
            key={k}
            className={`h-1.5 flex-1 rounded-full ${k <= i ? "bg-yellow-400" : "bg-white/15"}`}
          />
        ))}
      </div>

      <div
        key={i}
        className="animate-pop rounded-2xl bg-white/8 p-4 text-[15px] leading-relaxed ring-1 ring-white/10"
      >
        <div className="mb-2 text-3xl" aria-hidden>
          {lesson.emoji}
        </div>
        {lesson.steps[i]}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setI((x) => Math.max(0, x - 1))}
          disabled={i === 0}
          className="flex-1 rounded-lg bg-white/10 py-2.5 text-sm font-semibold disabled:opacity-40"
        >
          ← Précédent
        </button>
        {last ? (
          <button
            onClick={() => {
              onDone();
              if (lesson.practice) go("exercises");
              else onBack();
            }}
            className="flex-1 rounded-lg bg-yellow-400 py-2.5 text-sm font-bold text-emerald-950 hover:bg-yellow-300"
          >
            {lesson.practice ? "S'entraîner →" : "Terminer ✅"}
          </button>
        ) : (
          <button
            onClick={() => setI((x) => x + 1)}
            className="flex-1 rounded-lg bg-yellow-400 py-2.5 text-sm font-bold text-emerald-950 hover:bg-yellow-300"
          >
            Suivant →
          </button>
        )}
      </div>
    </ScreenShell>
  );
}
