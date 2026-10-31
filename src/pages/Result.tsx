import { useRef, useState } from 'react';
import Header from '../components/Header';
import ResultPoster from '../components/ResultPoster';
import type { Personality } from '../data/personalities';
import { exportCard } from '../utils/exportImage';
import { track } from '../utils/stats';

interface Props {
  result: Personality;
  onRestart: () => void;
}

export default function Result({ result, onRestart }: Props) {
  const posterRef = useRef<HTMLDivElement | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);
  const [hint, setHint] = useState<string | null>(null);

  async function handleSave() {
    if (!posterRef.current || exporting) return;
    setExporting(true);
    setHint(null);
    try {
      const dataUrl = await exportCard(posterRef.current);
      setImgUrl(dataUrl);
      track('save_click', { personality: result.key });
      // a[download] 只是增强，且只给桌面触点：部分 webview 里数据下载会打断当前页，
      // 手机端一律走浮层 img 长按保存（主路径），最后兜底是直接截图报告卡。
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      if (!isTouch) {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'BOJI LAB 薄肌人格报告.png';
        link.click();
        setHint('已生成：长按图片保存到相册（浏览器若已自动下载，可忽略）');
      } else {
        setHint('已生成：长按图片保存到相册');
      }
    } catch {
      setHint('自动导出失败。别慌：直接截图上方报告卡，效果一样。');
    } finally {
      setExporting(false);
    }
  }

  async function handleCopy() {
    const text = `我用 30 秒测出了自己的薄肌人格：${result.name}。「${result.quote}」——小红书搜索「薄肌研究所」，测你的薄肌人格`;
    try {
      await navigator.clipboard.writeText(text);
      setHint('分享文案已复制，去发笔记吧');
    } catch {
      setHint('复制失败。长按结果卡截图，配这段文案发出去也一样');
    }
  }

  return (
    <div className="result">
      <Header />
      <div ref={posterRef}>
        <ResultPoster result={result} />
      </div>
      <div className="result-detail">
        <p className="poster-label">研究员观察记录</p>
        <p>{result.report}</p>
        <p className="poster-label">本期处方</p>
        <p>{result.advice}</p>
      </div>
      <div className="result-actions">
        <button type="button" className="btn-primary" onClick={handleSave} disabled={exporting}>
          {exporting ? '生成中…' : '保存结果图'}
        </button>
        <button type="button" className="btn-ghost" onClick={handleCopy}>
          复制分享文案
        </button>
        <button type="button" className="btn-ghost" onClick={onRestart}>
          重新测试
        </button>
      </div>
      {hint && <p className="result-hint">{hint}</p>}
      <div className="result-safety">
        <p>
          <strong>新手安全提示</strong>
        </p>
        <p>
          充分热身 · 量力而行 · 循序渐进
          <br />
          薄肌 ≠ 越瘦越好，跟风高强度训练可能受伤
        </p>
      </div>
      {imgUrl && (
        <div className="export-overlay" onClick={() => setImgUrl(null)}>
          <img src={imgUrl} alt="薄肌人格报告卡" />
          <p className="export-tip">长按图片保存到相册</p>
          <button
            type="button"
            className="export-close"
            onClick={(event) => {
              event.stopPropagation();
              setImgUrl(null);
            }}
          >
            关闭
          </button>
        </div>
      )}
    </div>
  );
}
