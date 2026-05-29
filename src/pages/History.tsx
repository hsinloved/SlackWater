import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';
import { Button } from '../components/Button';
import { HistoryList } from '../features/history/HistoryList';
import {
  clearHistory,
  loadHistory,
} from '../features/history/historyStorage';
import type { SessionRecord } from '../features/history/historyTypes';
import { useLanguage } from '../i18n/LanguageProvider';

export function History() {
  const { t } = useLanguage();
  const [records, setRecords] = useState<SessionRecord[]>(() => loadHistory());
  const [confirming, setConfirming] = useState(false);

  const handleClear = () => {
    clearHistory();
    setRecords([]);
    setConfirming(false);
  };

  return (
    <AppLayout>
      <Link to="/" className="mb-4 text-ink-soft hover:text-ink">
        ← {t('common.home')}
      </Link>
      <h1 className="mb-4 text-2xl font-semibold text-ink">
        {t('history.title')}
      </h1>

      <HistoryList records={records} />

      {records.length > 0 && (
        <div className="mt-6">
          {confirming ? (
            <div className="flex gap-3">
              <Button variant="warn" className="flex-1" onClick={handleClear}>
                {t('history.clearAll')}
              </Button>
              <Button
                variant="ghost"
                className="flex-1"
                onClick={() => setConfirming(false)}
              >
                {t('history.cancel')}
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => setConfirming(true)}
            >
              {t('history.clear')}
            </Button>
          )}
        </div>
      )}
    </AppLayout>
  );
}
