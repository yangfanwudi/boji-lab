import { useEffect, useState } from 'react';
import './App.css';
import { PERSONALITIES, type Personality, type PersonalityKey } from './data/personalities';
import { QUESTIONS } from './data/questions';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import { scoreAnswers } from './utils/scoring';

type View = 'home' | 'quiz' | 'result';

const PROGRESS_KEY = 'boji-progress-v1';
const RESULT_KEY = 'boji-last-result-v1';

/** 只存作答进度与最近结果，不采集任何个人信息（方案第四节约束）。 */
function loadProgress(): (number | null)[] {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { answers: (number | null)[] };
      if (Array.isArray(parsed.answers) && parsed.answers.length === QUESTIONS.length) {
        return parsed.answers;
      }
    }
  } catch {
    // 存档损坏按新测试处理
  }
  return QUESTIONS.map(() => null);
}

function loadLastResult(): Personality | null {
  try {
    const raw = localStorage.getItem(RESULT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as { key: PersonalityKey };
      const found = PERSONALITIES[parsed.key];
      if (found) return found;
    }
  } catch {
    // 存档损坏按无历史结果处理
  }
  return null;
}

export default function App() {
  const [view, setView] = useState<View>('home');
  const [answers, setAnswers] = useState<(number | null)[]>(loadProgress);
  const [result, setResult] = useState<Personality | null>(loadLastResult);

  useEffect(() => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify({ answers }));
  }, [answers]);

  const savedAnswered = answers.filter((answer) => answer !== null).length;

  function startFresh() {
    setAnswers(QUESTIONS.map(() => null));
    setView('quiz');
  }

  function handleQuizDone(done: (number | null)[]) {
    setAnswers(done);
    const personality = scoreAnswers(done);
    setResult(personality);
    localStorage.setItem(RESULT_KEY, JSON.stringify({ key: personality.key }));
    setView('result');
  }

  return (
    <div className="app">
      {view === 'home' && (
        <Home
          onStart={startFresh}
          savedAnswered={savedAnswered}
          onResume={() => setView('quiz')}
          hasResult={result !== null}
          onViewResult={() => setView('result')}
        />
      )}
      {view === 'quiz' && <Quiz initial={answers} onDone={handleQuizDone} />}
      {view === 'result' && result !== null && <Result result={result} onRestart={startFresh} />}
    </div>
  );
}
