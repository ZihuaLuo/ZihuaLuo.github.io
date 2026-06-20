import type { Language } from "@i18n/routes";

export type NowDashboardCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  statusItems: { label: string; value: string }[];
  focusTitle: string;
  focusSubtitle: string;
  focusCenter: string;
  focusItems: { label: string; value: string; color: string }[];
  learningTitle: string;
  learningSubtitle: string;
  learningItems: { label: string; value: number; display: string }[];
  trendTitle: string;
  trendSubtitle: string;
  trendLabel: string;
  trendValue: string;
  prioritiesTitle: string;
  priorities: { label: string; value: string; tone: "cyan" | "violet" | "gold" | "blue" }[];
  snapshotTitle: string;
  snapshotSubtitle: string;
  snapshot: { label: string; value: string }[];
  momentumTitle: string;
  momentumLabel: string;
  momentumBody: string;
  momentumTags: string[];
};

export const nowDashboardCopy: Record<Language, NowDashboardCopy> = {
  en: {
    eyebrow: "Impact Metrics",
    title: "A quantified record of academic performance, credentials, work execution, and analytical scale",
    subtitle:
      "Numbers that make the work visible: grades, credentials, learning hours, professional networking, workload, review volume, and analytical scale",
    statusItems: [
      { label: "Academic record", value: "GPA 3.90/4.00" },
      { label: "Credential speed", value: "Full FRM in 6 months" },
      { label: "CFA preparation", value: "CFA I/II study 730 hours" },
      { label: "Capital exposure", value: "$3B+ AUM" },
    ],
    focusTitle: "Achievement Mix",
    focusSubtitle:
      "Sustained learning, routine discipline, and personal operating standards",
    focusCenter: "3+",
    focusItems: [
      { label: "Online Learning", value: "1,800 hours", color: "#67E8F9" },
      { label: "Annual Reviews", value: "4 years", color: "#67E8F9" },
      { label: "Wake-Up Time", value: "6 AM", color: "#C4B5FD" },
    ],
    learningTitle: "Academic Breadth",
    learningSubtitle:
      "Academic structure and cross-disciplinary preparation",
    learningItems: [
      { label: "Academic minors", value: 62, display: "3 minors" },
      { label: "DeGroote standing", value: 90, display: "Top 10%" },
      { label: "Core study areas", value: 76, display: "4" },
      { label: "Major focus", value: 86, display: "Finance" },
      { label: "Program track", value: 70, display: "Honours BCom" },
    ],
    trendTitle: "Evidence Network",
    trendSubtitle: "Academic strength, credentials, relationship-building, review work, and analytical scale",
    trendLabel: "evidence nodes",
    trendValue: "6",
    prioritiesTitle: "Core Metrics",
    priorities: [
      { label: "GPA", value: "3.90 / 4.00", tone: "cyan" },
      { label: "FRM completion", value: "6 months", tone: "violet" },
      { label: "CFA I/II study", value: "730 hours", tone: "gold" },
      { label: "AUM exposure", value: "$3B+", tone: "blue" },
    ],
    snapshotTitle: "Work & Analysis Scale",
    snapshotSubtitle: "Data depth, review volume, filing history, commercial reading, tax exposure, and conversion results",
    snapshot: [
      { label: "Data points analyzed", value: "100K+" },
      { label: "Fund reports reviewed", value: "50+" },
      { label: "SEC filings reviewed", value: "30 yrs" },
      { label: "Business articles", value: "2,000+" },
      { label: "Tax filing amount", value: "$100K+" },
      { label: "Client conversion", value: "15%+" },
    ],
    momentumTitle: "Operating Load",
    momentumLabel: "Execution record",
    momentumBody:
      "Learning capacity, task pressure, relationship reach, and review execution form the operating rhythm",
    momentumTags: ["Learning capacity", "Task pressure", "Relationship reach", "Review execution"],
  },
  zh: {
    eyebrow: "量化成果",
    title: "用数字记录学业、证书、工作与分析成果",
    subtitle:
      "用可量化指标呈现真实成果：成绩、证书、学习时长、职业社交、工作负载、审核数量与分析规模",
    statusItems: [
      { label: "学业记录", value: "GPA 3.90/4.00" },
      { label: "证书速度", value: "6 个月通过全部 FRM" },
      { label: "CFA 备考", value: "CFA 一/二级学习 730 小时" },
      { label: "资金规模", value: "超 $3B AUM" },
    ],
    focusTitle: "量化亮点",
    focusSubtitle:
      "持续学习、日常纪律与个人执行标准",
    focusCenter: "3+",
    focusItems: [
      { label: "线上学习", value: "1,800 小时", color: "#67E8F9" },
      { label: "年度总结", value: "4 年", color: "#67E8F9" },
      { label: "起床时间", value: "6 AM", color: "#C4B5FD" },
    ],
    learningTitle: "学术广度",
    learningSubtitle:
      "学业结构与跨方向准备",
    learningItems: [
      { label: "辅修数量", value: 62, display: "3 个" },
      { label: "德格鲁特排名", value: 90, display: "前 10%" },
      { label: "核心学习方向", value: 76, display: "4 个" },
      { label: "主修方向", value: 86, display: "金融" },
      { label: "商科项目", value: 70, display: "荣誉商科" },
    ],
    trendTitle: "成果网络",
    trendSubtitle: "学业表现、证书速度、职业社交、审核工作与分析能力",
    trendLabel: "证据节点",
    trendValue: "6 个",
    prioritiesTitle: "核心指标",
    priorities: [
      { label: "GPA", value: "3.90 / 4.00", tone: "cyan" },
      { label: "FRM 完成周期", value: "6 个月", tone: "violet" },
      { label: "CFA 一/二级学习", value: "730 小时", tone: "gold" },
      { label: "资金规模", value: "$3B+", tone: "blue" },
    ],
    snapshotTitle: "工作与分析规模",
    snapshotSubtitle: "用数据深度、审核数量、申报文件跨度、商业阅读、报税金额与转化表现呈现真实分析工作量",
    snapshot: [
      { label: "数据分析规模", value: "100K+" },
      { label: "基金报表审核", value: "50+" },
      { label: "SEC 申报文件跨度", value: "30 年" },
      { label: "商业文章审阅", value: "2,000+" },
      { label: "报税累计金额", value: "$100K+" },
      { label: "客户转化率", value: "15%+" },
    ],
    momentumTitle: "执行负载",
    momentumLabel: "工作记录",
    momentumBody:
      "学习容量、任务压力、关系触达与审核执行共同构成高强度工作节奏",
    momentumTags: ["学习容量", "任务压力", "关系触达", "审核执行"],
  },
};
