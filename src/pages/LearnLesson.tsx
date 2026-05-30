import { Link, Navigate, useParams } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { getLesson, pickText } from '../features/learn/lessons';
import { useLanguage } from '../i18n/LanguageProvider';

export function LearnLesson() {
  const { id } = useParams();
  const { t, lang } = useLanguage();
  const lesson = getLesson(id);

  if (!lesson) {
    return <Navigate to="/learn" replace />;
  }

  return (
    <AppLayout>
      <Link to="/learn" className="mb-4 text-ink-soft hover:text-ink">
        ← {t('nav.learn')}
      </Link>
      <h1 className="mb-5 font-heading text-3xl font-semibold leading-tight text-ink">
        {pickText(lesson.title, lang)}
      </h1>

      <div className="flex flex-col gap-4 pb-6">
        {lesson.blocks.map((block, i) => {
          if (block.type === 'p') {
            return (
              <p key={i} className="text-base leading-relaxed text-ink-soft">
                {pickText(block.text, lang)}
              </p>
            );
          }
          if (block.type === 'list') {
            return (
              <ul key={i} className="flex flex-col gap-2.5">
                {block.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex gap-3 text-base leading-relaxed text-ink-soft"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{pickText(item, lang)}</span>
                  </li>
                ))}
              </ul>
            );
          }
          // callout
          const isSafety = block.tone === 'safety';
          return (
            <div
              key={i}
              className={
                isSafety
                  ? 'rounded-2xl border border-accent/50 bg-accent-soft px-5 py-4 text-sm leading-relaxed text-ink'
                  : 'glass rounded-2xl px-5 py-4 text-sm leading-relaxed text-ink-soft'
              }
            >
              {pickText(block.text, lang)}
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
}
