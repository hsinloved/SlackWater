export type Lang = 'en' | 'zh-TW';

export const LANGS: { code: Lang; label: string; htmlLang: string }[] = [
  { code: 'en', label: 'EN', htmlLang: 'en-GB' },
  { code: 'zh-TW', label: '中文', htmlLang: 'zh-TW' },
];

/**
 * Flat translation dictionary. Keys are shared across both languages so a
 * missing key in one falls back to English (and then to the key itself).
 * British English spelling is used throughout the `en` set.
 */
const en: Record<string, string> = {
  'common.begin': 'Begin',
  'common.home': 'Home',

  'home.eyebrow': 'Breathwork',
  'home.tagline': 'Breath · Focus · Depth',
  'home.history': 'Practice history',
  'home.safety':
    'Dry-land only. Never practise breath-holding in water. Stop if you feel unwell.',

  'modes.relaxed.title': 'Relaxed Breathing',
  'modes.relaxed.subtitle': 'Guided inhale / exhale rhythm',
  'modes.relaxed.desc':
    'A gentle rhythm to settle the body. No breath-hold — just slow, even breathing.',
  'modes.static-hold.title': 'Gentle Static Hold',
  'modes.static-hold.subtitle': 'Preparation, comfortable hold, recovery',
  'modes.static-hold.desc':
    'Prepare with relaxed breathing, take a comfortable inhale, then hold gently. End early whenever you need to.',
  'modes.rv-mobility.title': 'RV Mobility / Empty-Lung Stretch',
  'modes.rv-mobility.subtitle': 'Dry-land only · gentle mobility',
  'modes.rv-mobility.desc':
    'Empty-lung (residual volume) stretches gently build the chest and diaphragm flexibility freedivers rely on at depth.',

  'setup.inhale': 'Inhale',
  'setup.exhale': 'Exhale',
  'setup.holdAfterInhale': 'Hold after inhale',
  'setup.holdAfterExhale': 'Hold after exhale',
  'setup.cycles': 'Cycles',
  'setup.prepCycles': 'Preparation cycles',
  'setup.breathHoldTarget': 'Breath-hold target',
  'setup.recoveryCycles': 'Recovery cycles',
  'setup.rounds': 'Rounds',
  'setup.recovery': 'Recovery',
  'setup.emptyStretch': 'Empty-lung stretch',
  'setup.longHoldWarning':
    "That's a long hold. There's no need to chase a big number — consistency and comfort matter more than duration. You can end any hold early.",
  'setup.rvWarning':
    'Dry-land only. Never force the exhale — keep it light and stop at the first hint of strain.',
  'setup.finalInhaleNote':
    'Final inhale cue: “Take a comfortable 70–80% inhale.”',
  'setup.estimate': 'Estimated duration: {duration}',

  'unit.s': 's',

  'active.round': 'Round {n}/{total}',
  'active.soundOn': 'Sound on',
  'active.soundOff': 'Sound off',
  'active.vibrationOn': 'Vibration on',
  'active.vibrationOff': 'Vibration off',
  'active.safetyBanner': 'Dry practice only. Stop early if needed.',

  'controls.pause': 'Pause',
  'controls.resume': 'Resume',
  'controls.stop': 'Stop',
  'controls.needBreathe': 'I need to breathe',

  'phase.inhale': 'Inhale',
  'phase.exhale': 'Exhale',
  'phase.holdInhale': 'Hold',
  'phase.holdExhale': 'Hold (empty)',
  'phase.finalInhale': 'Final inhale',
  'phase.breathHold': 'Breath-hold',
  'phase.emptyStretch': 'Empty-lung stretch',
  'phase.gentleExhale': 'Gentle exhale',
  'phase.recovery': 'Recovery',
  'phase.rest': 'Rest',
  'phase.complete': 'Round complete',

  'cue.inhale': 'Take a comfortable inhale. Let the belly rise first.',
  'cue.exhale': 'Slow, relaxed exhale. Let the shoulders drop.',
  'cue.holdAfterInhale': 'Hold gently. Stay soft.',
  'cue.holdAfterExhale': 'Rest at empty. No tension.',
  'cue.finalInhale':
    'Take a comfortable 70–80% inhale, not a maximum inhale.',
  'cue.breathHold':
    'Hold gently. Relax your jaw. Notice the first urge to breathe — end early if needed.',
  'cue.emptyExhale':
    'Gently exhale to a natural, comfortable empty point. Do not force.',
  'cue.emptyStretch':
    'Soft empty-lung stretch. Keep it gentle — this is mobility, not a hold.',
  'cue.recovery': 'Small inhale, relaxed exhale. Breathe normally.',
  'cue.rest': 'Rest and breathe normally. Let everything settle.',
  'cue.complete': 'Session complete. Recover slowly and notice how you feel.',

  'complete.titleComplete': 'Session complete',
  'complete.titleEnded': 'Session ended',
  'complete.recoverNote': 'Recover slowly and notice how you feel.',
  'complete.feelingQ': 'How did the session feel?',
  'complete.effortQ': 'Perceived effort (optional)',
  'complete.holdLabel': 'Breath-hold completed (optional)',
  'complete.holdPlaceholder': 'seconds',
  'complete.notesLabel': 'Notes',
  'complete.notesPlaceholder':
    'Where did you feel tension first? When did the urge to breathe arrive? How full was your inhale?',
  'complete.save': 'Save reflection',
  'complete.skip': 'Skip',

  'feeling.calm': 'Calm',
  'feeling.neutral': 'Neutral',
  'feeling.tense': 'Tense',
  'feeling.uncomfortable': 'Dizzy / uncomfortable',

  'history.title': 'Practice history',
  'history.empty':
    'No sessions yet. Your reflections will appear here after your first practice.',
  'history.clear': 'Clear history',
  'history.clearAll': 'Clear all',
  'history.cancel': 'Cancel',
  'history.roundsUnit': 'rounds',
  'history.effortUnit': 'effort {n}/5',
  'history.holdUnit': 'hold {n}s',
  'history.quieter': 'Quieter',
  'history.relaxed': 'Relaxed',

  'nav.learn': 'Learn',
  'home.learnTitle': 'Learn the basics',
  'home.learnDesc': 'Breathe better, dive calmer.',
  'learn.title': 'Learn',
  'learn.disclaimer':
    'Educational only — not medical advice, and not a substitute for a certified freediving instructor.',
  'setup.learnMore': 'Learn more →',
  'complete.bodyQuieterQ': 'Did your body get quieter?',
  'complete.relaxedAtUrgeQ': 'Relaxed at the first urge to breathe?',
  'scale.yes': 'Yes',
  'scale.somewhat': 'Somewhat',
  'scale.no': 'No',
  'intro.title': 'Welcome to Slack Water',
  'intro.p1':
    'Calm, dry-land breath training for freediving — built around relaxation and body awareness, not chasing numbers.',
  'intro.p2':
    'Consistency over intensity. The goal is a quieter body and an easier breath, not a personal best.',
  'intro.continue': 'Continue',

  'safety.title': 'Before you begin',
  'safety.p1':
    'This tool is for dry-land relaxation and breath-awareness practice only.',
  'safety.p2':
    'Do not use it in water, in a bath, while driving, or alone during any breath-hold practice.',
  'safety.p3':
    'Do not hyperventilate. Stop immediately if you feel dizzy, numb, anxious, uncomfortable, or unwell.',
  'safety.p4':
    'This app is not a substitute for a certified freediving instructor.',
  'safety.ack': 'I understand',
};

const zhTW: Record<string, string> = {
  'common.begin': '開始',
  'common.home': '首頁',

  'home.eyebrow': '呼吸練習',
  'home.tagline': '呼吸 · 專注 · 深度',
  'home.history': '練習紀錄',
  'home.safety': '僅限陸上練習。切勿在水中閉氣。若感到不適請立即停止。',

  'modes.relaxed.title': '放鬆呼吸',
  'modes.relaxed.subtitle': '引導吸氣 / 吐氣節奏',
  'modes.relaxed.desc': '以和緩的節奏安定身體。不閉氣——只是緩慢、平穩地呼吸。',
  'modes.static-hold.title': '和緩靜態閉氣',
  'modes.static-hold.subtitle': '準備、舒適閉氣、恢復',
  'modes.static-hold.desc':
    '先以放鬆呼吸準備，舒適地吸一口氣，再輕鬆地閉氣。隨時都可以提早結束。',
  'modes.rv-mobility.title': '殘氣量活動度 / 空肺伸展',
  'modes.rv-mobility.subtitle': '僅限陸上 · 和緩活動度',
  'modes.rv-mobility.desc':
    '空肺（殘氣量）伸展，溫和培養自由潛水在深處所需的胸腔與橫膈柔軟度。',

  'setup.inhale': '吸氣',
  'setup.exhale': '吐氣',
  'setup.holdAfterInhale': '吸氣後閉氣',
  'setup.holdAfterExhale': '吐氣後閉氣',
  'setup.cycles': '循環次數',
  'setup.prepCycles': '準備循環',
  'setup.breathHoldTarget': '閉氣目標',
  'setup.recoveryCycles': '恢復循環',
  'setup.rounds': '回合數',
  'setup.recovery': '恢復',
  'setup.emptyStretch': '空肺伸展',
  'setup.longHoldWarning':
    '這是一段較長的閉氣。不需要追求數字——穩定與舒適比時間長短更重要。你隨時都可以提早結束。',
  'setup.rvWarning':
    '僅限陸上。切勿勉強吐氣——保持輕鬆，一有緊繃或不適就停止。',
  'setup.finalInhaleNote': '最後吸氣提示：「舒適地吸到七到八成。」',
  'setup.estimate': '預估時間：{duration}',

  'unit.s': '秒',

  'active.round': '第 {n}/{total} 回合',
  'active.soundOn': '聲音開',
  'active.soundOff': '聲音關',
  'active.vibrationOn': '震動開',
  'active.vibrationOff': '震動關',
  'active.safetyBanner': '僅限陸上練習。需要時請提早停止。',

  'controls.pause': '暫停',
  'controls.resume': '繼續',
  'controls.stop': '停止',
  'controls.needBreathe': '我需要呼吸',

  'phase.inhale': '吸氣',
  'phase.exhale': '吐氣',
  'phase.holdInhale': '閉氣',
  'phase.holdExhale': '閉氣（空肺）',
  'phase.finalInhale': '最後吸氣',
  'phase.breathHold': '閉氣',
  'phase.emptyStretch': '空肺伸展',
  'phase.gentleExhale': '和緩吐氣',
  'phase.recovery': '恢復',
  'phase.rest': '休息',
  'phase.complete': '回合完成',

  'cue.inhale': '舒適地吸氣，先讓腹部隆起。',
  'cue.exhale': '緩慢、放鬆地吐氣，讓肩膀沉下。',
  'cue.holdAfterInhale': '輕鬆地閉氣，保持柔軟。',
  'cue.holdAfterExhale': '停在空肺狀態，不要緊繃。',
  'cue.finalInhale': '舒適地吸到七到八成，不要吸到最滿。',
  'cue.breathHold':
    '輕鬆地閉氣，放鬆下巴。留意第一次想呼吸的衝動——需要時就提早結束。',
  'cue.emptyExhale': '和緩地吐到自然、舒適的空肺點，不要勉強。',
  'cue.emptyStretch': '輕柔的空肺伸展。保持和緩——這是活動度，不是閉氣。',
  'cue.recovery': '小口吸氣，放鬆吐氣。正常呼吸。',
  'cue.rest': '休息並正常呼吸，讓一切沉澱。',
  'cue.complete': '練習完成。慢慢恢復，留意自己的感受。',

  'complete.titleComplete': '練習完成',
  'complete.titleEnded': '練習結束',
  'complete.recoverNote': '慢慢恢復，留意自己的感受。',
  'complete.feelingQ': '這次練習感覺如何？',
  'complete.effortQ': '自覺費力程度（選填）',
  'complete.holdLabel': '完成的閉氣時間（選填）',
  'complete.holdPlaceholder': '秒',
  'complete.notesLabel': '筆記',
  'complete.notesPlaceholder':
    '你最先在哪裡感到緊繃？想呼吸的衝動何時出現？你吸了多滿？',
  'complete.save': '儲存紀錄',
  'complete.skip': '略過',

  'feeling.calm': '平靜',
  'feeling.neutral': '普通',
  'feeling.tense': '緊繃',
  'feeling.uncomfortable': '頭暈 / 不適',

  'history.title': '練習紀錄',
  'history.empty': '目前還沒有紀錄。完成第一次練習後，你的紀錄會顯示在這裡。',
  'history.clear': '清除紀錄',
  'history.clearAll': '全部清除',
  'history.cancel': '取消',
  'history.roundsUnit': '回合',
  'history.effortUnit': '費力 {n}/5',
  'history.holdUnit': '閉氣 {n}秒',
  'history.quieter': '安靜',
  'history.relaxed': '放鬆',

  'nav.learn': '學習',
  'home.learnTitle': '認識基礎',
  'home.learnDesc': '呼吸更好，下潛更從容。',
  'learn.title': '學習',
  'learn.disclaimer':
    '僅供教育參考——不是醫療建議，也無法取代合格的自由潛水教練。',
  'setup.learnMore': '了解更多 →',
  'complete.bodyQuieterQ': '身體有變得更安靜嗎？',
  'complete.relaxedAtUrgeQ': '想呼吸時能保持放鬆嗎？',
  'scale.yes': '有',
  'scale.somewhat': '還好',
  'scale.no': '沒有',
  'intro.title': '歡迎使用 Slack Water',
  'intro.p1':
    '為自由潛水設計的陸上呼吸練習——重點在放鬆與身體覺察，而不是追求數字。',
  'intro.p2':
    '穩定勝過強度。目標是更安靜的身體與更輕鬆的呼吸，不是個人紀錄。',
  'intro.continue': '繼續',

  'safety.title': '開始之前',
  'safety.p1': '本工具僅供陸上放鬆與呼吸覺察練習使用。',
  'safety.p2':
    '請勿在水中、浴缸中、開車時，或獨自進行任何閉氣練習時使用。',
  'safety.p3':
    '請勿過度換氣。若感到頭暈、麻木、焦慮、不適或身體不舒服，請立即停止。',
  'safety.p4': '本應用程式無法取代合格的自由潛水教練。',
  'safety.ack': '我了解',
};

export const dictionaries: Record<Lang, Record<string, string>> = {
  en,
  'zh-TW': zhTW,
};
