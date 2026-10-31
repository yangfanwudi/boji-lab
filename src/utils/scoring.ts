import { PERSONALITIES, TIE_ORDER, type Personality, type PersonalityKey } from '../data/personalities';
import { QUESTIONS } from '../data/questions';

/**
 * 前端固定评分：每题选中项记 1 分，总分最高的人格胜出；
 * 平分时按 TIE_ORDER 先后判定（稳健执行派需要明确优势才能测出）。
 */
export function scoreAnswers(answers: (number | null)[]): Personality {
  const counts = new Map<PersonalityKey, number>();
  answers.forEach((optionIndex, questionIndex) => {
    if (optionIndex === null) return;
    const question = QUESTIONS[questionIndex];
    const option = question?.options[optionIndex];
    if (!option) return;
    counts.set(option.point, (counts.get(option.point) ?? 0) + 1);
  });

  let best: PersonalityKey = TIE_ORDER[TIE_ORDER.length - 1];
  let bestCount = -1;
  for (const key of TIE_ORDER) {
    const count = counts.get(key) ?? 0;
    if (count > bestCount) {
      bestCount = count;
      best = key;
    }
  }
  return PERSONALITIES[best];
}
