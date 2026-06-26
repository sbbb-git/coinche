import { ScreenShell } from "../app/ScreenShell";
import { TrainTabs } from "./TrainTabs";
import { useT } from "../i18n";

interface Guide {
  qKey: string; // clé de la situation
  aKey: string; // clé du conseil
}
interface Section {
  titleKey: string;
  emoji: string;
  guides: Guide[];
}

const SECTIONS: Section[] = [
  {
    titleKey: "guide.sec.bid.title",
    emoji: "🂠",
    guides: [
      { qKey: "guide.bid.q1", aKey: "guide.bid.a1" },
      { qKey: "guide.bid.q2", aKey: "guide.bid.a2" },
      { qKey: "guide.bid.q3", aKey: "guide.bid.a3" },
      { qKey: "guide.bid.q4", aKey: "guide.bid.a4" },
      { qKey: "guide.bid.q5", aKey: "guide.bid.a5" },
      { qKey: "guide.bid.q6", aKey: "guide.bid.a6" },
      { qKey: "guide.bid.q7", aKey: "guide.bid.a7" },
      { qKey: "guide.bid.q8", aKey: "guide.bid.a8" },
      { qKey: "guide.bid.q9", aKey: "guide.bid.a9" },
    ],
  },
  {
    titleKey: "guide.sec.play.title",
    emoji: "🃏",
    guides: [
      { qKey: "guide.play.q1", aKey: "guide.play.a1" },
      { qKey: "guide.play.q2", aKey: "guide.play.a2" },
      { qKey: "guide.play.q3", aKey: "guide.play.a3" },
      { qKey: "guide.play.q4", aKey: "guide.play.a4" },
      { qKey: "guide.play.q5", aKey: "guide.play.a5" },
      { qKey: "guide.play.q6", aKey: "guide.play.a6" },
      { qKey: "guide.play.q7", aKey: "guide.play.a7" },
      { qKey: "guide.play.q8", aKey: "guide.play.a8" },
      { qKey: "guide.play.q9", aKey: "guide.play.a9" },
    ],
  },
  {
    titleKey: "guide.sec.adv.title",
    emoji: "🧠",
    guides: [
      { qKey: "guide.adv.q1", aKey: "guide.adv.a1" },
      { qKey: "guide.adv.q2", aKey: "guide.adv.a2" },
      { qKey: "guide.adv.q3", aKey: "guide.adv.a3" },
      { qKey: "guide.adv.q4", aKey: "guide.adv.a4" },
      { qKey: "guide.adv.q5", aKey: "guide.adv.a5" },
    ],
  },
];

export function GuidesScreen() {
  const t = useT();
  return (
    <ScreenShell title={t("guide.title")}>
      <TrainTabs current="guides" />
      <p className="mb-3 text-sm text-white/70">
        {t("guide.intro")}
      </p>
      {SECTIONS.map((s) => (
        <div key={s.titleKey} className="mb-5">
          <h2 className="mb-2 text-base font-bold">
            {s.emoji} {t(s.titleKey)}
          </h2>
          <div className="flex flex-col gap-2">
            {s.guides.map((g, i) => (
              <GuideItem key={i} guide={g} />
            ))}
          </div>
        </div>
      ))}
    </ScreenShell>
  );
}

function GuideItem({ guide }: { guide: Guide }) {
  const t = useT();
  // Tout est visible (plus d'accordéon à dérouler).
  return (
    <div className="rounded-xl bg-white/8 p-3 ring-1 ring-white/10">
      <p className="font-semibold text-yellow-300">{t(guide.qKey)}</p>
      <p className="mt-1 text-sm leading-relaxed text-white/85">{t(guide.aKey)}</p>
    </div>
  );
}
