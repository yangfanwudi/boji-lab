/**
 * BOJI LAB 构建期生图管线：用 gpt-image-2.5 批量生成静态视觉素材。
 *
 * 用法（在 boji-lab/ 目录下）：
 *   node scripts/gen-art.mjs              # 生成全部素材
 *   node scripts/gen-art.mjs card-bg      # 只重新生成指定素材（重 roll 单张）
 *
 * key 从 scripts/.apikey 读取（已 gitignore，绝不进前端代码/构建产物）。
 * 生成结果下载到 src/assets/art/，随 Vite 打包为同源资源，运行时零 API 依赖。
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const KEY = readFileSync(join(__dirname, '.apikey'), 'utf8').trim();
const BASE = 'https://keylinkclub.com';
const MODEL = 'gpt-image-2.5-flare';
const OUT = join(__dirname, '..', 'src', 'assets', 'art');

/** 全局画风锚：保证 8 张素材风格统一。 */
const STYLE =
  'Flat vector illustration, humorous internet research-lab aesthetic, pseudo-scientific field-guide style. ' +
  'Near-black background #0b0f0c, neon green #b6ff3d and off-white accents, thin technical grid lines, ' +
  'subtle stamp and label shapes, clean bold shapes. ' +
  'Absolutely no text, no letters, no words, no numbers.';

/** 统一角色：一个瘦得搞笑的「薄肌研究员」。 */
const CHARACTER =
  'a lanky pale young man with comically thin stick-like arms and tiny stubble muscles, wearing a simple white tank top';

const TASKS = [
  {
    name: 'card-bg',
    size: '1024x1536',
    quality: 'high',
    prompt:
      'Poster background for a mock internet research institute report, portrait 3:4. ' +
      'Near-black #0b0f0c base, faint thin technical grid, subtle blueprint-style lab report layout blocks, ' +
      'scattered neon green #b6ff3d accents: round stamps, dashed frames, small crosses and measurement marks, ' +
      'archive folder texture, generous empty dark space in the center and lower half for text overlay. ' +
      'Flat vector. Absolutely no text, no letters, no words, no numbers.',
  },
  {
    name: 'p-academic',
    size: '1024x1024',
    quality: 'medium',
    prompt: `${CHARACTER}, sitting on a huge stack of books and research papers, adjusting round glasses, a dumbbell used as a paperweight, smug professorial expression. Framed like a specimen photo in a research report. ${STYLE}`,
  },
  {
    name: 'p-collector',
    size: '1024x1024',
    quality: 'medium',
    prompt: `${CHARACTER}, buried up to the neck in an avalanche of training plans, clipboards and printed schedules, happily filing one more paper into the pile. Framed like a specimen photo in a research report. ${STYLE}`,
  },
  {
    name: 'p-spark',
    size: '1024x1024',
    quality: 'medium',
    prompt: `${CHARACTER}, sprinting out of the frame leaving a comic dust trail and motion lines, one small dumbbell abandoned mid-air, heroic start energy fading fast. Framed like a specimen photo in a research report. ${STYLE}`,
  },
  {
    name: 'p-steady',
    size: '1024x1024',
    quality: 'medium',
    prompt: `${CHARACTER}, calmly holding a perfect squat with a stopwatch around his neck, rock-steady posture, subtle green glow, unbothered expression. Framed like a specimen photo in a research report. ${STYLE}`,
  },
  {
    name: 'p-fitcheck',
    size: '1024x1024',
    quality: 'medium',
    prompt: `${CHARACTER}, taking a mirror selfie in a full matching designer gym outfit, holding a dumbbell purely as a fashion accessory, never broken a sweat. Framed like a specimen photo in a research report. ${STYLE}`,
  },
  {
    name: 'p-quiet',
    size: '1024x1024',
    quality: 'medium',
    prompt: `${CHARACTER}, standing in dark shadows lit only by a thin green rim light, lifting a barbell, face half hidden by a hood, silent and unlogged. Framed like a specimen photo in a research report. ${STYLE}`,
  },
  {
    name: 'home-hero',
    size: '1536x1024',
    quality: 'medium',
    prompt: `Wide banner illustration for a mock internet research institute studying a viral thin-muscle trend: ${CHARACTER}, standing proudly on a lab podium like a priceless specimen, scientists with clipboards observing him from behind monitors and measuring devices. ${STYLE}`,
  },
];

async function genOne(task) {
  const res = await fetch(`${BASE}/v1/images/generations`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: MODEL, prompt: task.prompt, size: task.size, quality: task.quality }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const json = await res.json();
  const item = json?.data?.[0];
  // 中转站有时返回 b64_json、有时返回托管 url，两种都要接住
  if (item?.b64_json) {
    return Buffer.from(item.b64_json, 'base64');
  }
  if (item?.url) {
    const imgRes = await fetch(item.url);
    if (!imgRes.ok) throw new Error(`图片下载 HTTP ${imgRes.status}`);
    return Buffer.from(await imgRes.arrayBuffer());
  }
  throw new Error(`响应里没有 b64_json/url: ${JSON.stringify(json).slice(0, 200)}`);
}

const only = process.argv.slice(2);
// 显式点名 → 无条件重生成；全量跑 → 跳过已存在的文件（省钱续跑）
const targets = only.length
  ? TASKS.filter((t) => only.includes(t.name))
  : TASKS.filter((t) => !existsSync(join(OUT, `${t.name}.png`)));
if (targets.length === 0) {
  console.error(`没有匹配的素材名。可用：${TASKS.map((t) => t.name).join(', ')}`);
  process.exit(1);
}
mkdirSync(OUT, { recursive: true });

let failed = 0;
for (const task of targets) {
  let ok = false;
  for (let attempt = 1; attempt <= 3 && !ok; attempt++) {
    try {
      process.stdout.write(`生成 ${task.name}（第 ${attempt} 次）…\n`);
      const bytes = await genOne(task);
      writeFileSync(join(OUT, `${task.name}.png`), bytes);
      process.stdout.write(`✓ ${task.name}（${Math.round(bytes.length / 1024)} KB）\n`);
      ok = true;
    } catch (err) {
      process.stderr.write(`✗ ${task.name}: ${err.message}\n`);
      if (attempt === 3) failed += 1;
      else await new Promise((r) => setTimeout(r, 3000));
    }
  }
}
if (failed > 0) {
  console.error(`完成，但 ${failed} 张失败，可单独重跑：node scripts/gen-art.mjs <名字>`);
  process.exit(1);
}
console.log('全部完成。');
