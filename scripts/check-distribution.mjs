/**
 * 人格分布校验（修订版方案：本地枚举全部答题组合，检查 6 人格分布）。
 * 枚举 4^6 = 4096 种组合，按 TIE_ORDER 平分判定，输出各人格占比与平分率。
 *
 * 注意：下面的分值矩阵必须与 src/data/questions.ts 的 options[].point 保持一致，
 * 改了题目分值要同步改这里（开发期工具，故意不直接引 TS 以便 node 直跑）。
 */
const POINTS = [
  ['collector', 'academic', 'fitcheck', 'quiet'], // Q1
  ['collector', 'academic', 'spark', 'steady'], // Q2
  ['fitcheck', 'steady', 'academic', 'spark'], // Q3
  ['collector', 'spark', 'fitcheck', 'quiet'], // Q4
  ['collector', 'steady', 'fitcheck', 'quiet'], // Q5
  ['collector', 'academic', 'spark', 'steady'], // Q6
];

const TIE_ORDER = ['spark', 'collector', 'academic', 'fitcheck', 'quiet', 'steady'];
const KEYS = ['academic', 'collector', 'spark', 'steady', 'fitcheck', 'quiet'];

function score(answerIndices) {
  const counts = new Map(KEYS.map((k) => [k, 0]));
  answerIndices.forEach((opt, q) => counts.set(POINTS[q][opt], counts.get(POINTS[q][opt]) + 1));
  let best = TIE_ORDER[TIE_ORDER.length - 1];
  let bestCount = -1;
  for (const key of TIE_ORDER) {
    if (counts.get(key) > bestCount) {
      bestCount = counts.get(key);
      best = key;
    }
  }
  return { best, bestCount };
}

const dist = new Map(KEYS.map((k) => [k, 0]));
let ties = 0;
let total = 0;
for (let code = 0; code < 4 ** 6; code++) {
  const answers = [];
  for (let q = 0; q < 6; q++) answers.push(Math.floor(code / 4 ** q) % 4);
  const { best, bestCount } = score(answers);
  dist.set(best, dist.get(best) + 1);
  if (bestCount <= 1) ties++; // 6 票里最高票 ≤1 即多重平分场景
  total++;
}

console.log(`组合总数 ${total}，平分判定占比 ${(ties / total * 100).toFixed(1)}%`);
for (const key of KEYS) {
  const pct = (dist.get(key) / total) * 100;
  const flag = pct < 5 || pct > 40 ? '  ← 超阈值，需调分值' : '';
  console.log(`${key.padEnd(10)} ${String(dist.get(key)).padStart(4)}  ${pct.toFixed(1)}%${flag}`);
}
