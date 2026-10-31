/**
 * 素材压缩：把 src/assets/art/*.png 转成同尺寸 WebP（卡内中文字走 DOM，图片只需氛围）。
 * 用法：node scripts/optimize-art.mjs   （生成 png 前先跑 gen-art.mjs）
 * 结果：同目录同名 .webp，Vite 打包引用 .webp；原始 png 保留作母版。
 */
import { readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'src', 'assets', 'art');

const pngs = readdirSync(OUT).filter((f) => f.endsWith('.png'));
for (const file of pngs) {
  const src = join(OUT, file);
  const dest = join(OUT, file.replace(/\.png$/, '.webp'));
  const before = statSync(src).size;
  await sharp(src).webp({ quality: 82 }).toFile(dest);
  const after = statSync(dest).size;
  process.stdout.write(`${file} → ${file.replace('.png', '.webp')}：${Math.round(before / 1024)} KB → ${Math.round(after / 1024)} KB\n`);
}
console.log('压缩完成。');
