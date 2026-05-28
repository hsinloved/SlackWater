import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SafetyModal } from './components/SafetyModal';
import { readFlag, writeFlag } from './utils/storage';
import { Home } from './pages/Home';
import { Setup } from './pages/Setup';
import { ActiveSession } from './pages/ActiveSession';
import { Complete } from './pages/Complete';
import { History } from './pages/History';

const SAFETY_ACK_KEY = 'celeste.safetyAcknowledged.v1';

export default function App() {
  const [acknowledged, setAcknowledged] = useState(() =>
    readFlag(SAFETY_ACK_KEY),
  );

  const acknowledge = () => {
    writeFlag(SAFETY_ACK_KEY, true);
    setAcknowledged(true);
  };

  return (
    <>
      {!acknowledged && <SafetyModal onAcknowledge={acknowledge} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setup/:mode" element={<Setup />} />
        <Route path="/session" element={<ActiveSession />} />
        <Route path="/complete" element={<Complete />} />
        <Route path="/history" element={<History />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}
