import type { PersonalityKey } from './personalities';

export interface QuestionOption {
  text: string;
  point: PersonalityKey;
}

export interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
}

/**
 * 6 道行为题（修订版方案：8 压到 6 题，前 3 题放最强代入感的行为场景）。
 * 题面同时覆盖「办了卡在纠结的半吊子」和「只围观梗的纯路人」两档人群。
 */
export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: '刷到「薄肌」内容时，你的标准动作是？',
    options: [
      { text: '先点收藏，万一哪天要练呢', point: 'collector' },
      { text: '在心里（或评论区）科普：这词根本不是医学概念', point: 'academic' },
      { text: '重点看博主穿的什么，链接甩过来', point: 'fitcheck' },
      { text: '点赞都不点，但看完了全部', point: 'quiet' },
    ],
  },
  {
    id: 2,
    text: '你的收藏夹 vs 训练，现状更像哪种？',
    options: [
      { text: '收藏了十几份计划，打开次数为零', point: 'collector' },
      { text: '每份都研究过优缺点，属于云端健身', point: 'academic' },
      { text: '跟练过一次，坚持到了第三天', point: 'spark' },
      { text: '从不收藏，我直接练', point: 'steady' },
    ],
  },
  {
    id: 3,
    text: '决定「明天开始练」的那个晚上，你会？',
    options: [
      { text: '先下单全套装备，仪式感拉满', point: 'fitcheck' },
      { text: '把计划排成表格，精确到每组几次', point: 'steady' },
      { text: '先搜「练薄肌会不会受伤」，越搜越清醒', point: 'academic' },
      { text: '热血上头当场做了十个俯卧撑，然后躺下', point: 'spark' },
    ],
  },
  {
    id: 4,
    text: '连续三天没练之后，第四天你？',
    options: [
      { text: '自责五分钟，然后收藏一份新计划', point: 'collector' },
      { text: '热血回归猛练到力竭，接着又消失三天', point: 'spark' },
      { text: '换身新装备重启，顺便拍照', point: 'fitcheck' },
      { text: '谁说我断了？我只是没发朋友圈', point: 'quiet' },
    ],
  },
  {
    id: 5,
    text: '健身房离你家 800 米，你的行动方案是？',
    options: [
      { text: '已为这 800 米规划好三条路线', point: 'collector' },
      { text: '定好每周三练的时间表，雷打不动', point: 'steady' },
      { text: '为这 800 米买了双新跑鞋', point: 'fitcheck' },
      { text: '跑都跑完了，有啥好说的', point: 'quiet' },
    ],
  },
  {
    id: 6,
    text: '「薄肌打卡」第 7 天，你的真实战绩是？',
    options: [
      { text: '计划表填到了第 30 天，实练第 0 天', point: 'collector' },
      { text: '能背出「薄肌不是医学定义」，深蹲一个没做', point: 'academic' },
      { text: '前三天猛如虎，后四天查无此人', point: 'spark' },
      { text: '不打卡，但真的练了七天', point: 'steady' },
    ],
  },
];
