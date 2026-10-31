import { useEffect, useState } from 'react';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';
import { QUESTIONS } from '../data/questions';
import { track } from '../utils/stats';

interface Props {
  /** 恢复的作答进度（从首页「开始」进入时为全空数组） */
  initial: (number | null)[];
  onDone: (answers: (number | null)[]) => void;
}

export default function Quiz({ initial, onDone }: Props) {
  const [answers, setAnswers] = useState<(number | null)[]>(initial);
  const [idx, setIdx] = useState(() => {
    const firstEmpty = initial.findIndex((answer) => answer === null);
    return firstEmpty === -1 ? 0 : firstEmpty;
  });
  const current = QUESTIONS[idx];
  const answeredCount = answers.filter((answer) => answer !== null).length;

  useEffect(() => {
    track('quiz_start', { resumed: initial.some((answer) => answer !== null) ? 1 : 0 });
    // 仅在进入测试页时上报一次
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function choose(optionIndex: number) {
    const next = [...answers];
    next[idx] = optionIndex;
    setAnswers(next);
    if (idx === QUESTIONS.length - 1) {
      track('quiz_complete');
      onDone(next);
    } else {
      setIdx(idx + 1);
    }
  }

  return (
    <div className="quiz">
      <Header />
      <span className="quiz-count">
        研究问题 {idx + 1} / {QUESTIONS.length}
      </span>
      <div className="progress">
        <div
          className="progress-bar"
          style={{ width: `${(answeredCount / QUESTIONS.length) * 100}%` }}
        />
      </div>
      <QuestionCard question={current} selected={answers[idx]} onSelect={choose} />
      <div className="quiz-foot">
        {idx > 0 && (
          <button type="button" className="btn-ghost" onClick={() => setIdx(idx - 1)}>
            上一题
          </button>
        )}
      </div>
    </div>
  );
}
