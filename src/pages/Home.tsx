import heroImg from '../assets/art/home-hero.webp';
import { QUESTIONS } from '../data/questions';

interface Props {
  onStart: () => void;
  /** 已作答题数（有存档且未完成时显示「继续上次进度」） */
  savedAnswered: number;
  onResume: () => void;
  hasResult: boolean;
  onViewResult: () => void;
}

export default function Home({ onStart, savedAnswered, onResume, hasResult, onViewResult }: Props) {
  const resumable = savedAnswered > 0 && savedAnswered < QUESTIONS.length;
  return (
    <main className="home">
      <p className="home-brand">BOJI LAB · 2026</p>
      <h1 className="home-title">薄肌研究所</h1>
      <img className="home-hero" src={heroImg} alt="薄肌研究所正在观察一位珍贵样本" />
      <p className="home-slogan">关于薄肌的一切，我们都进行了严谨的胡说八道。</p>
      <p className="home-hook">我们不制造薄肌，我们研究为什么你还没开始练。</p>
      <button type="button" className="btn-primary" onClick={onStart}>
        开始薄肌人格测试
      </button>
      {resumable && (
        <button type="button" className="btn-ghost" onClick={onResume}>
          继续上次进度（{savedAnswered}/{QUESTIONS.length}）
        </button>
      )}
      {hasResult && (
        <button type="button" className="btn-ghost" onClick={onViewResult}>
          查看上次报告
        </button>
      )}
      <footer className="home-foot">
        <p>人格实验室 · 理论档案室 · 新手实验计划</p>
        <p className="home-foot-note">以上栏目正在严谨地筹备中</p>
      </footer>
    </main>
  );
}
