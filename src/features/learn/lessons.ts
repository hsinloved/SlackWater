import type { Lang } from '../../i18n/translations';

export interface Localized {
  en: string;
  'zh-TW': string;
}

export type LessonBlock =
  | { type: 'p'; text: Localized }
  | { type: 'list'; items: Localized[] }
  | { type: 'callout'; tone: 'safety' | 'tip'; text: Localized };

export interface Lesson {
  id: string;
  title: Localized;
  summary: Localized;
  blocks: LessonBlock[];
}

/** Pick the string for the active language, falling back to English. */
export function pickText(text: Localized, lang: Lang): string {
  return text[lang] ?? text.en;
}

const p = (en: string, zh: string): LessonBlock => ({
  type: 'p',
  text: { en, 'zh-TW': zh },
});
const list = (items: [string, string][]): LessonBlock => ({
  type: 'list',
  items: items.map(([en, zh]) => ({ en, 'zh-TW': zh })),
});
const callout = (
  tone: 'safety' | 'tip',
  en: string,
  zh: string,
): LessonBlock => ({ type: 'callout', tone, text: { en, 'zh-TW': zh } });

export const LESSONS: Lesson[] = [
  {
    id: 'comfortable-breath',
    title: {
      en: 'The comfortable full breath',
      'zh-TW': '舒服的滿，不是最大容量',
    },
    summary: {
      en: 'Aim for ~70–85%, body soft — not a maximum inhale.',
      'zh-TW': '吸到約 70–85%，身體放鬆——不是吸到最滿。',
    },
    blocks: [
      p(
        'In freediving we talk about a "full breath", but beginners often over-do it: chest hard, shoulders raised, neck tight, ribs jammed, the whole body floaty.',
        '自由潛水常說「full breath」，但初學時很容易做過頭：胸口很硬、肩膀聳起、脖子緊、肋骨卡住、整個人很浮。',
      ),
      p(
        'That actually makes you more tense, more eager to exhale, and harder to descend — and it makes neutral buoyancy hard to find.',
        '這樣反而會讓你更緊張、更想吐氣、更難下潛，也會讓中性浮力變得很難抓。',
      ),
      p(
        'A more useful feeling: inhale to about 70–85% and stay soft — shoulders down, throat open, chest not straining. After the breath you should still be able to relax.',
        '比較實用的感覺：吸到大約 70–85% 滿，身體還是軟的、肩膀放下、喉嚨不憋、胸口不炸。吸完之後應該還能放鬆。',
      ),
      callout(
        'tip',
        'You are looking for a "comfortable full", not "maximum capacity".',
        '你要找的是「舒服的滿」，不是「最大容量」。',
      ),
    ],
  },
  {
    id: 'co2-tolerance',
    title: {
      en: 'Longer holds come from CO₂ tolerance',
      'zh-TW': '憋得久，靠的是 CO₂ 耐受',
    },
    summary: {
      en: 'The urge to breathe is rising CO₂, not a sudden lack of oxygen.',
      'zh-TW': '想呼吸的感覺多半是 CO₂ 上升，不是氧氣馬上不夠。',
    },
    blocks: [
      p(
        "The first discomfort in a hold is usually not oxygen running low — it's rising CO₂ creating the urge to breathe.",
        '憋氣時最早出現的不舒服，通常不是氧氣馬上不夠，而是 CO₂ 上升造成的想呼吸感。',
      ),
      p(
        'Training is about letting the body get used to "CO₂ is rising, but I don\'t need to panic" — not about flushing CO₂ out with big, fast breaths.',
        '訓練的重點是讓身體慢慢習慣「CO₂ 上升時不要慌」，而不是用大口快速呼吸把 CO₂ 洗掉。',
      ),
      p(
        'So think of pre-dive breathing as: normal, slow, quiet breaths; a last breath to a comfortable volume; then begin.',
        '所以潛前呼吸可以想成：正常、慢、安靜地呼吸；最後一口吸到舒服的容量；然後開始。',
      ),
      callout(
        'safety',
        'Don\'t do many "huff-puff" breaths or long, forceful exhales — these can quietly become hyperventilation. DAN notes that long exhales, over-exhaling and fast breathing can lower CO₂ and weaken your body\'s natural protection.',
        '不要做那種「呼哈呼哈很多次」或「很長很用力的吐氣」當準備，這可能在不知不覺中變成過度換氣。DAN 也提到，長吐氣、吐太多、快速呼吸都可能降低 CO₂，削弱身體原本的保護機制。',
      ),
    ],
  },
  {
    id: 'dry-land-routine',
    title: {
      en: 'A gentle dry-land hold',
      'zh-TW': '陸地溫和憋氣練法',
    },
    summary: {
      en: 'Train on land — but never push to the painful edge.',
      'zh-TW': '可以在陸地練，但不要硬撐。',
    },
    blocks: [
      list([
        [
          'Relax-breathe for 3–5 minutes — lying or sitting, shoulders, jaw, tongue and belly soft.',
          '放鬆呼吸 3–5 分鐘——躺著或坐著，肩膀、下巴、舌頭、肚子都放鬆。',
        ],
        [
          'Take a 70–80% breath — not a max inhale; you should still be able to relax.',
          '吸一口 70–80% 的氣——不是吸爆，吸完身體還能放鬆。',
        ],
        [
          'Hold only until the first clear urge to breathe, then stop — not until it hurts.',
          '憋到「第一個明顯想呼吸」就停——不是撐到很痛苦。',
        ],
        [
          'Rest 1.5–2 minutes and repeat for 4–6 rounds, every round easy.',
          '休息 1.5–2 分鐘，重複 4–6 組，每組都保持輕鬆。',
        ],
      ]),
      p(
        'You are practising reading the body\'s signals, not chasing a limit. It is like building trust: "the urge to breathe is here, but I don\'t have to panic."',
        '你練的是辨識身體訊號，不是挑戰極限。這比較像跟身體建立信任：「想呼吸的感覺來了，但我不用立刻慌。」',
      ),
    ],
  },
  {
    id: 'relax-efficiency',
    title: { en: 'Tension burns your air', 'zh-TW': '真正耗氧的是緊張與亂動' },
    summary: {
      en: 'Underwater, calm and stillness save more air than big lungs.',
      'zh-TW': '水下省氣靠放鬆與省動作，不是靠肺大。',
    },
    blocks: [
      p(
        'Beginners often think a short hold means small lungs. More often it is: too excited or tense before going down, kicking too hard, sculling with the hands, lifting the head to look, tightening shoulders, neck and jaw, and thinking "am I running out of air?"',
        '初學者常以為憋不久是肺不夠大。其實更多是：下水前太興奮或緊張、踢蛙鞋太用力、手一直划、頭一直抬起來看、肩膀脖子嘴巴用力，還有一直想「我快沒氣了嗎？」',
      ),
      callout(
        'tip',
        'Think of freediving as lowering your consumption — not storing more air.',
        '把自由潛水想成：不是把氣存很多，而是把消耗降到很低。',
      ),
    ],
  },
  {
    id: 'neutral-buoyancy',
    title: { en: 'Buoyancy & how much you inhale', 'zh-TW': '中性浮力與吸氣量' },
    summary: {
      en: 'Use one consistent, comfortable volume every dive.',
      'zh-TW': '每次都用一個穩定、舒服的吸氣量。',
    },
    blocks: [
      p(
        'A bigger breath makes you more buoyant, especially in shallow water. Neutral buoyancy comes from your weights + wetsuit + depth + how much you inhaled, together.',
        '吸越多氣會越浮，在淺水特別明顯。中性浮力其實是靠你的配重 + 防寒衣厚度 + 水深 + 吸氣量一起調出來的。',
      ),
      p(
        'So when a coach says "don\'t inhale so much", they usually don\'t mean hold more uncomfortably — they mean use a steady, comfortable, repeatable volume so your buoyancy isn\'t different every time.',
        '所以教練說「不要吸太多氣」，通常不是要你憋得更痛苦，而是：用一個穩定、舒服、可重複的吸氣量，讓浮力不要每次都差太多。',
      ),
      p(
        'Pick one feeling — say a comfortable 75–80% — and use the same inhale every dive. If you inhale 95% one day and 70% the next, you can\'t tell whether it\'s weighting, position, or breath.',
        '固定用一個體感，例如舒服的 75–80%，每次都用差不多的吸法。今天吸 95%、明天吸 70%，就很難判斷問題出在配重、姿勢，還是吸氣量。',
      ),
      callout(
        'tip',
        'With a coach, try the same gear and weight at 70 / 80 / 90% and notice which feels most stable. Ask: am I really floaty, or just tense and stiff?',
        '可以跟教練用同樣裝備與配重試 70 / 80 / 90%，看哪個最穩定。問自己：我是真的浮，還是因為緊張、身體變硬？',
      ),
    ],
  },
  {
    id: 'belly-vs-chest',
    title: {
      en: 'Breathing "into the belly" vs the chest',
      'zh-TW': '吸到肚子 vs 吸到胸口',
    },
    summary: {
      en: 'Air always enters the lungs — change where you expand.',
      'zh-TW': '空氣都進肺，差別在你用哪裡擴張。',
    },
    blocks: [
      p(
        'Air always goes into the lungs — "belly breathing" just means the diaphragm drops and the belly is pushed out, so the breath feels low and the body feels stable.',
        '空氣一定是進肺。「吸到肚子」其實是橫膈膜下降、腹部被推出來，感覺氣比較「低」、身體比較穩。',
      ),
      p(
        'Chest breathing expands the ribs and upper chest — the breath feels high, and it is easier to tense the chest, shoulders and neck (and feel floaty).',
        '胸口吸氣是肋骨、上胸擴張，感覺氣比較「高」，也比較容易讓胸口、肩膀、脖子緊，人也更浮。',
      ),
      p(
        'Practise a 3-part breath on land, gently: belly fills first, then the side ribs widen, then just a little into the upper chest — without raising the shoulders. The useful version is not "fill all three to the max", it is roughly low 60–70% + ribs 20% + a touch of upper chest.',
        '在陸地溫和練「三段式吸氣」：先肚子、再肋骨往兩側打開、最後上胸只補一點點，不要聳肩。實用版不是「三段都塞滿」，而是大約低位 60–70% + 側肋 20% + 上胸只補一點。',
      ),
      callout(
        'tip',
        'After the inhale you should still have soft shoulders, a soft jaw, an open throat and no chest anxiety — calm enough to begin.',
        '吸完之後肩膀、下巴要鬆、喉嚨不卡、胸口不焦慮，可以安靜地開始。',
      ),
    ],
  },
  {
    id: 'rv-explained',
    title: { en: 'What is RV (residual volume)?', 'zh-TW': '什麼是 RV（殘氣量）？' },
    summary: {
      en: 'The air left after a full exhale — and why depth needs flexibility.',
      'zh-TW': '吐到底後肺裡剩下的氣，以及為何深潛需要柔軟度。',
    },
    blocks: [
      p(
        "Residual volume (RV) is the air still left in your lungs after a maximum exhale — you can't push it out.",
        'RV（殘氣量）是你最大吐氣後，肺裡仍然剩下、吐不出去的氣。',
      ),
      p(
        'Freedivers care because the lungs compress as you descend, getting closer to RV the deeper you go. Flexibility of the diaphragm, ribs and chest affects how comfortable you are near that point.',
        '自由潛水會在意 RV，是因為下潛時肺部被壓縮，越深越接近 RV。橫膈膜、肋骨、胸腔的柔軟度，會影響你在接近 RV 時舒不舒服。',
      ),
      callout(
        'safety',
        'Be conservative: RV / empty-lung / negative-pressure work must NOT become a breath-hold challenge. Case reports link RV dry holds and negative pressure to low oxygen, blackout, even lung (pulmonary) oedema — especially unsupervised. For you, this is mobility, not "hold empty for a long time."',
        '請務必保守：RV／空肺／負壓類練習不要做成挑戰憋氣。有案例報告提醒，RV 乾式憋氣與負壓狀態可能造成低氧、昏厥，甚至肺水腫，尤其在無人監督時。對你來說，這是「橫膈膜柔軟度練習」，不是「空肺憋很久」。',
      ),
    ],
  },
  {
    id: 'rv-mobility-howto',
    title: { en: 'A gentle empty-lung stretch', 'zh-TW': '溫和的空肺伸展做法' },
    summary: {
      en: 'Open the diaphragm — stretch sensation only, never strain.',
      'zh-TW': '打開橫膈膜空間——只要伸展感，絕不硬撐。',
    },
    blocks: [
      list([
        [
          'Sit or stand relaxed; breathe normally for 1–2 minutes.',
          '坐著或站著放鬆，正常呼吸 1–2 分鐘。',
        ],
        [
          "Exhale slowly to a natural empty — don't squeeze the last bit out.",
          '慢慢吐氣，吐到「自然吐完」，不要用力榨乾。',
        ],
        [
          'Close your mouth and gently close the throat (or pinch the nose).',
          '閉嘴，輕輕關閉喉嚨（或捏鼻）。',
        ],
        [
          'Make a "mock inhale" — the motion of inhaling, but let no air in. You\'ll feel the ribs and chest open a little and the belly draw up.',
          '做一個「假吸氣」：像要吸氣，但不讓空氣進來。你會感覺肋骨或胸口微微打開，腹部往內上提。',
        ],
        [
          'Hold the stretch just 2–5 seconds, then relax and breathe back in slowly. Repeat 3–5 times.',
          '維持 2–5 秒就好，然後放鬆、慢慢吸氣回來。做 3–5 次。',
        ],
      ]),
      callout(
        'safety',
        "Stretch sensation only — never pain, dizziness, chest tightness or a pulling throat. Warm up first and progress gradually (as SSI's freediving material describes). Stop at once if anything feels off.",
        '只要伸展感——不要痛、不要暈、不要胸悶、不要喉嚨被拉扯。先暖身、循序漸進（SSI 自由潛水教材也這樣建議）。一有不對就立刻停止。',
      ),
    ],
  },
  {
    id: 'weekly-plan',
    title: { en: 'A simple weekly routine', 'zh-TW': '一週簡單的陸地練習' },
    summary: {
      en: '3–4×/week, 10–15 minutes — calm and consistent.',
      'zh-TW': '一週 3–4 次，每次 10–15 分鐘。',
    },
    blocks: [
      list([
        [
          "Relax-breathe 3 minutes — slow in, slow out; don't chase depth.",
          '放鬆呼吸 3 分鐘——慢吸慢吐，不追求很深。',
        ],
        [
          '3-part breathing ×5 — belly → side ribs → a little upper chest, to ~75–80%, body still soft.',
          '三段式吸氣 ×5——肚子 → 側肋 → 上胸一點點，吸到約 75–80%，身體還是軟的。',
        ],
        [
          'Gentle RV / empty-lung stretch ×3–5 — 2–5 s each, no straining.',
          '溫和 RV／空肺伸展 ×3–5——每次 2–5 秒，完全不硬撐。',
        ],
        [
          'Static holds ×3–4 — inhale 75–80%, stop at a clear-but-not-painful urge, rest 1.5–2 min.',
          '靜態閉氣 ×3–4——吸 75–80%，憋到「明顯想呼吸但還不痛苦」就停，休息 1.5–2 分鐘。',
        ],
      ]),
      callout(
        'tip',
        'Aim for steady and calm, not records.',
        '目標是穩定、平靜，不是破紀錄。',
      ),
    ],
  },
  {
    id: 'real-metric',
    title: { en: 'A better measure than seconds', 'zh-TW': '比秒數更好的指標' },
    summary: {
      en: 'Calm and efficiency matter more than your time.',
      'zh-TW': '安靜與省力，比秒數更重要。',
    },
    blocks: [
      p(
        'Instead of "how many seconds did I hold?", ask yourself:',
        '與其問「我憋到幾秒？」，不如問自己：',
      ),
      list([
        [
          'Did my body get quieter as the hold went on?',
          '憋氣時，身體有沒有越來越安靜？',
        ],
        [
          'When the urge to breathe arrived, did I stay relaxed?',
          '想呼吸出現時，我有沒有保持放鬆？',
        ],
        [
          'Could I move with fewer kicks — kick less, glide more?',
          '下潛後能不能少踢幾下也前進——踢少一點、滑久一點？',
        ],
      ]),
      p(
        'Practising "quiet, slow, efficient" will take you further than chasing breath-hold time.',
        '練「安靜、慢、有效率」，其實比單純練憋氣更重要。',
      ),
    ],
  },
];

export function getLesson(id: string | undefined): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}
