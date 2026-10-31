/**
 * 埋点占位：部署目标未定（github.io 子路径 / 子域名 / VPS），无法先选统计服务。
 * 接入 Umami 或 Cloudflare Web Analytics 时替换本文件实现，调用点不用改。
 * 事件约定：quiz_start（开始答题）/ quiz_complete（到达结果页）/ save_click（点保存结果图）。
 */
export function track(event: string, detail?: Record<string, string | number>): void {
  if (import.meta.env.DEV) {
    console.info('[boji-stats]', event, detail ?? '');
  }
}
