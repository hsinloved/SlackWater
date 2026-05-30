import type { Lang } from '../i18n/translations';

/** Format seconds as M:SS (or H:MM:SS for long durations). */
export function formatClock(totalSeconds: number): string {
  const s = Math.max(0, Math.round(totalSeconds));
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;
  const pad = (n: number) => n.toString().padStart(2, '0');
  if (hours > 0) return `${hours}:${pad(minutes)}:${pad(seconds)}`;
  return `${minutes}:${pad(seconds)}`;
}

/** Human-friendly duration, localised: "4 min 30s" / "4 分 30 秒". */
export function formatDuration(totalSeconds: number, lang: Lang = 'en'): string {
  const s = Math.max(0, Math.round(totalSeconds));
  const minutes = Math.floor(s / 60);
  const seconds = s % 60;
  if (lang === 'zh-TW') {
    if (minutes === 0) return `${seconds} 秒`;
    if (seconds === 0) return `${minutes} 分`;
    return `${minutes} 分 ${seconds} 秒`;
  }
  if (minutes === 0) return `${seconds}s`;
  if (seconds === 0) return `${minutes} min`;
  return `${minutes} min ${seconds}s`;
}

export function formatDate(iso: string, lang: Lang = 'en'): string {
  const locale = lang === 'zh-TW' ? 'zh-TW' : 'en-GB';
  const d = new Date(iso);
  return d.toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
