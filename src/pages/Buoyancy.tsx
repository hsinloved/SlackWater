import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { Button } from '../components/Button';
import {
  BUOYANCY_LEVELS,
  BUOYANCY_OBS,
  emptyLevels,
  loadBuoyancy,
  saveBuoyancy,
  type BuoyancyLevel,
  type BuoyancyObs,
} from '../features/learn/buoyancyStorage';
import { useLanguage } from '../i18n/LanguageProvider';

export function Buoyancy() {
  const { t } = useLanguage();
  const saved = loadBuoyancy();
  const [levels, setLevels] = useState(saved?.levels ?? emptyLevels());
  const [notes, setNotes] = useState(saved?.notes ?? '');
  const [justSaved, setJustSaved] = useState(false);

  const setLevel = (level: BuoyancyLevel, obs: BuoyancyObs) => {
    setJustSaved(false);
    setLevels((prev) => ({ ...prev, [level]: prev[level] === obs ? null : obs }));
  };

  const save = () => {
    saveBuoyancy({ date: new Date().toISOString(), levels, notes: notes.trim() });
    setJustSaved(true);
  };

  return (
    <AppLayout>
      <Link to="/learn" className="mb-4 text-ink-soft hover:text-ink">
        ← {t('nav.learn')}
      </Link>
      <h1 className="font-heading text-3xl font-semibold text-ink">
        {t('buoyancy.title')}
      </h1>
      <p className="mt-1 text-sm leading-relaxed text-ink-soft">
        {t('buoyancy.intro')}
      </p>

      <div className="mt-4 rounded-2xl border border-accent/50 bg-accent-soft px-5 py-4 text-sm leading-relaxed text-ink">
        {t('buoyancy.coach')}
      </div>

      <div className="mt-5 flex flex-col gap-3">
        {BUOYANCY_LEVELS.map((level) => (
          <div key={level} className="glass rounded-2xl px-5 py-4">
            <div className="mb-2 font-heading text-lg font-medium text-ink">
              {level}%
            </div>
            <div className="flex gap-2">
              {BUOYANCY_OBS.map((obs) => (
                <button
                  key={obs}
                  onClick={() => setLevel(level, obs)}
                  className={`h-11 flex-1 rounded-2xl text-sm transition ${
                    levels[level] === obs
                      ? 'bg-accent font-medium text-[#06212a]'
                      : 'glass text-ink'
                  }`}
                >
                  {t(`buoyancy.obs.${obs}`)}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <textarea
        rows={3}
        placeholder={t('buoyancy.notesPlaceholder')}
        value={notes}
        onChange={(e) => {
          setNotes(e.target.value);
          setJustSaved(false);
        }}
        className="glass mt-4 w-full resize-none rounded-2xl px-4 py-3 text-ink outline-none placeholder:text-ink-soft focus:ring-2 focus:ring-accent/40"
      />

      <Button className="mt-4 w-full" onClick={save}>
        {justSaved ? t('buoyancy.saved') : t('buoyancy.save')}
      </Button>
    </AppLayout>
  );
}
