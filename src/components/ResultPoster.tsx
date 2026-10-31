import type { Personality, PersonalityKey } from '../data/personalities';
import cardBg from '../assets/art/card-bg.webp';
import pAcademic from '../assets/art/p-academic.webp';
import pCollector from '../assets/art/p-collector.webp';
import pSpark from '../assets/art/p-spark.webp';
import pSteady from '../assets/art/p-steady.webp';
import pFitcheck from '../assets/art/p-fitcheck.webp';
import pQuiet from '../assets/art/p-quiet.webp';

const ART: Record<PersonalityKey, string> = {
  academic: pAcademic,
  collector: pCollector,
  spark: pSpark,
  steady: pSteady,
  fitcheck: pFitcheck,
  quiet: pQuiet,
};

/**
 * 结果卡：全站唯一随截图离开站点的载体，按「可分享海报」设计——
 * 图大字少：样本插画 + 人格名 + 金句上卡，长文案留在网页里。
 * 背景为构建期生成的同源素材（经 html-to-image 导出无跨域问题），底部固定栏 =
 * 品牌署名 + 可搜索口令（站内搜索引导，不印网址/二维码）。
 */
export default function ResultPoster({ result }: { result: Personality }) {
  return (
    <div
      className="poster"
      style={{ backgroundImage: `linear-gradient(rgba(11, 15, 12, 0.4), rgba(11, 15, 12, 0.8)), url(${cardBg})` }}
    >
      <div className="poster-head">
        <span>薄肌研究所 BOJI LAB</span>
        <span>密级：可不公开</span>
      </div>
      <p className="poster-title">薄肌人格鉴定报告 · 样本量 1</p>
      <div className="poster-stick">
        <img src={ART[result.key]} alt={`${result.name}研究样本`} />
        <p className="poster-stick-label">研究样本 · 观察期 7 天</p>
      </div>
      <h2 className="poster-name">{result.name}</h2>
      <p className="poster-tag">{result.tag}</p>
      <p className="poster-quote">「{result.quote}」</p>
      <div className="poster-foot">
        <p className="poster-slogan">关于薄肌的一切，我们都进行了严谨的胡说八道。</p>
        <p className="poster-cta">小红书搜索「薄肌研究所」· 测你的薄肌人格</p>
      </div>
    </div>
  );
}
