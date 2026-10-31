import { toPng } from 'html-to-image';

/**
 * 把结果卡节点导出为 PNG dataURL。
 * 方案约束（修订版第 2 步，全程最高危项）：结果卡只用系统字体栈、不放外链图片，
 * 因此没有跨域 canvas 污染，也没有 webfont 加载缺失导致的中文变方框。
 */
export async function exportCard(node: HTMLElement): Promise<string> {
  await document.fonts.ready;
  return toPng(node, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: '#0b0f0c',
  });
}
