export type PersonalityKey =
  | 'academic'
  | 'collector'
  | 'spark'
  | 'steady'
  | 'fitcheck'
  | 'quiet';

export interface Personality {
  key: PersonalityKey;
  /** 人格名 */
  name: string;
  /** 关键词（结果卡副标题） */
  tag: string;
  /** 一句金句（结果卡主梗） */
  quote: string;
  /** 研究报告风格评语 */
  report: string;
  /** 一条可以执行的建议 */
  advice: string;
}

export const PERSONALITIES: Record<PersonalityKey, Personality> = {
  academic: {
    key: 'academic',
    name: '理论院士',
    tag: '懂了一身，练没上阵',
    quote: '我没有练，我只是在做文献综述。',
    report:
      '经本研究室长期观察，该样本的肌肉含量与专业知识储量呈显著负相关。其大脑皮层中「训练学知识」的密度已达院士级，唯有一处数据无法解释：从没有人训练区见过他。',
    advice: '本期处方：现在，立刻，做 10 个深蹲。做完你会发现，文献里说的「泵感」原来真的存在。',
  },
  collector: {
    key: 'collector',
    name: '计划收藏家',
    tag: '收藏即拥有',
    quote: '我的训练计划，比我的肌肉先到达了理想状态。',
    report:
      '该样本的收藏夹已完成对全网训练计划的学术性收藏，涵盖新手到奥林匹亚全阶段。研究确认：其收藏频率与实际训练频率无显著相关（p < 0.001）。',
    advice: '本期处方：删到只剩 1 份计划，今天就做它的第一组。剩下的，等练出第一块肌肉再说。',
  },
  spark: {
    key: 'spark',
    name: '三分钟热度型',
    tag: '开局即巅峰',
    quote: '我练过很多次，每次三天。加起来，也算久经沙场了。',
    report:
      '该样本的热情输出曲线呈典型脉冲状：开局火力全开，第三天抵达峰值，第四天于全网失联。本研究室尊重其每一次重启的仪式感——问题只是，重启的次数略多。',
    advice: '本期处方：把目标缩小到「每天 5 分钟」。三天后你还活着，本次实验即宣告成功。',
  },
  steady: {
    key: 'steady',
    name: '稳健执行派',
    tag: '版本答案本答',
    quote: '你们讨论薄肌的时候，我已经练完了。',
    report:
      '稀有样本警报。该样本不收藏、不打卡、不争论，只按自己的节奏稳定输出。本研究室郑重提示：请控制强度并保留休息日，不要把自己卷成下一则受伤新闻的主角。',
    advice: '本期处方：保持现状，加一条——每练 3 天休息 1 天。薄肌是长期主义，不是短跑。',
  },
  fitcheck: {
    key: 'fitcheck',
    name: '穿搭视觉派',
    tag: '装备先于热身',
    quote: '只要装备够专业，路人就会以为我在练。',
    report:
      '该样本的运动预算构成高度集中：装备支出占比约 95%，实际训练支出趋近于零。穿搭完成度与训练完成度呈显著负相关——但必须承认，是真的好看。',
    advice: '本期处方：穿着这身装备，完成 20 分钟真实训练。装备的价值是陪你流汗，不是陪你出片。',
  },
  quiet: {
    key: 'quiet',
    name: '低调行动派',
    tag: '闷声卷王',
    quote: '不是我没练，是你的朋友圈没有权限。',
    report:
      '该样本在所有社交平台保持零训练动态，但体测数据持续神秘改善。本研究室一度怀疑其为数据异常，后确认：真的有人默默在练，并且不打算告诉任何人。',
    advice: '本期处方：偶尔也晒一张。多一个监督你的人，就少一个放弃的理由。',
  },
};

/** 平分时的判定顺序：越靠前越优先（稳健执行派需要明确优势才能测出） */
export const TIE_ORDER: PersonalityKey[] = [
  'spark',
  'collector',
  'academic',
  'fitcheck',
  'quiet',
  'steady',
];
