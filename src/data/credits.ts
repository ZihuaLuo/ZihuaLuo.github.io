export type CreditTier = "huge" | "credit";

export type CreditEntry = {
  index: string;
  tier: CreditTier;
  name: string;
  firstName: string;
  initial: string;
  sortKey: string;
  role: string;
  roleZh: string;
  organization: string;
};

type RawCreditEntry = {
  name: string;
  role: string;
  roleZh: string;
  tier: CreditTier;
};

export const creditPageSize: Record<CreditTier, number> = {
  huge: 12,
  credit: 24,
};

const rawCreditEntries: RawCreditEntry[] = [
  { tier: "huge", name: "Wenjing Ding", role: "My Significant Other", roleZh: "我的重要伴侣" },
  { tier: "huge", name: "Anyu Luo", role: "My Dad", roleZh: "父亲" },
  { tier: "huge", name: "Liangyin Wu", role: "My Mom", roleZh: "母亲" },
  { tier: "huge", name: "Sorenia Chatzialexiou", role: "Manager at TD", roleZh: "道明银行 经理" },
  { tier: "huge", name: "Dr. Richard Hou", role: "Director at RBC", roleZh: "加拿大皇家银行 总监" },
  { tier: "huge", name: "Walker Chau", role: "Supervisor at CIBC Mellon", roleZh: "CIBC Mellon 主管" },
  { tier: "huge", name: "Dr. Trevor William Chamberlain", role: "Professor at McMaster University", roleZh: "麦克马斯特大学 教授" },
  { tier: "huge", name: "Dr. Anna Danielova", role: "Associate Professor at McMaster University", roleZh: "麦克马斯特大学 副教授" },
  { tier: "huge", name: "Dr. Nooshin Salari", role: "Assistant Professor at McMaster University", roleZh: "麦克马斯特大学 助理教授" },
  { tier: "huge", name: "Dhama Ganesh", role: "Manager at TD Asset Management", roleZh: "道明资产管理 经理" },
  { tier: "huge", name: "Dr. Jun Wu", role: "A Life Instructor I Have Never Met", roleZh: "从未谋面的人生导师" },
  { tier: "huge", name: "Dr. Zhaofeng Xue", role: "Instructor in Economic Thinking", roleZh: "经济思维导师" },

  { tier: "credit", name: "Dr. Yoontae Jeon", role: "Associate Professor at McMaster University", roleZh: "麦克马斯特大学 副教授" },
  { tier: "credit", name: "Dr. Sudipto Sarkar", role: "Professor at McMaster University", roleZh: "麦克马斯特大学 教授" },
  { tier: "credit", name: "Vicky Deng", role: "Operational Excellence & Transformation Intern at CIBC Mellon", roleZh: "CIBC Mellon 运营卓越与转型实习生" },
  { tier: "credit", name: "Amar Sandher", role: "Relationship Manager at McMaster University", roleZh: "麦克马斯特大学 关系经理" },
  { tier: "credit", name: "Isabella Fang", role: "Private Equity Intern at Brookfield", roleZh: "布鲁克菲尔德 私募股权实习生" },
  { tier: "credit", name: "Yuming Sun", role: "CEO & Founder at RER-RECONOCER", roleZh: "RER-RECONOCER 创始人兼 CEO" },
  { tier: "credit", name: "Mina Kanani", role: "Business Intelligence Analyst at McKesson", roleZh: "麦克森 商业智能分析师" },
  { tier: "credit", name: "Kshitij Gupta", role: "Senior Manager at RBC", roleZh: "加拿大皇家银行 高级经理" },
  { tier: "credit", name: "Ernad Sijercic", role: "Equity Research Associate at TD Securities", roleZh: "道明证券 股票研究助理" },
  { tier: "credit", name: "Yukang (Dora) Duan", role: "Senior Manager at Scotiabank", roleZh: "加拿大丰业银行 高级经理" },
  { tier: "credit", name: "Eric Gu", role: "Treasury Analyst at Wealthsimple", roleZh: "Wealthsimple 财资分析师" },
  { tier: "credit", name: "Farzad Jafari", role: "Senior Risk Consultant at EY", roleZh: "安永 高级风险顾问" },
  { tier: "credit", name: "Malavika Suresh", role: "VP at TD Asset Management", roleZh: "道明资产管理 副总裁" },
  { tier: "credit", name: "Nihar Desai", role: "VP at Brookfield", roleZh: "布鲁克菲尔德 副总裁" },
  { tier: "credit", name: "Christy Yang", role: "Corporate Development Analyst at RBC", roleZh: "加拿大皇家银行 企业发展分析师" },
  { tier: "credit", name: "Christopher Doyle", role: "Corporate Development Analyst at Vale Base Metals", roleZh: "淡水河谷基本金属 企业发展分析师" },
  { tier: "credit", name: "Laura Venizelos", role: "Director at RBC", roleZh: "加拿大皇家银行 总监" },
  { tier: "credit", name: "Marzuka Mahmud", role: "Senior Analyst at TD Securities", roleZh: "道明证券 高级分析师" },
  { tier: "credit", name: "Pouya Hosseini", role: "Senior Consultant at EY", roleZh: "安永 高级顾问" },
  { tier: "credit", name: "Jen Li", role: "Senior Manager at CIBC", roleZh: "加拿大帝国商业银行 高级经理" },
  { tier: "credit", name: "Don Li", role: "VP at TD Asset Management", roleZh: "道明资产管理 副总裁" },
  { tier: "credit", name: "Liam (William) Zerter", role: "Senior Manager at CIBC", roleZh: "加拿大帝国商业银行 高级经理" },
  { tier: "credit", name: "René Javier Guzmán", role: "Director at BMO", roleZh: "蒙特利尔银行 总监" },
  { tier: "credit", name: "James J. Park", role: "VP at TD Asset Management", roleZh: "道明资产管理 副总裁" },
  { tier: "credit", name: "Benjamin Phan", role: "M&A Analyst at EQ Capital Partners", roleZh: "EQ Capital Partners 并购分析师" },
  { tier: "credit", name: "Lucas Pan", role: "Manager at RBC", roleZh: "加拿大皇家银行 经理" },
  { tier: "credit", name: "Grace Wang", role: "Senior AML Investigator at Deloitte", roleZh: "德勤 高级反洗钱调查员" },
  { tier: "credit", name: "Jiahe Deng", role: "Enterprise Market Risk Manager at RBC", roleZh: "加拿大皇家银行 企业市场风险经理" },
  { tier: "credit", name: "Eric Lai", role: "Manager, Structural Market Risk at BMO", roleZh: "蒙特利尔银行 结构性市场风险经理" },
  { tier: "credit", name: "Desmond Correa", role: "Manager at Accenture", roleZh: "埃森哲 经理" },
  { tier: "credit", name: "Peiru Yao", role: "Manager at TD", roleZh: "道明银行 经理" },
  { tier: "credit", name: "Farrukh Mumtaz K.", role: "Audit Manager at CIBC", roleZh: "加拿大帝国商业银行 审计经理" },
  { tier: "credit", name: "Tianmo (Paul) Huang", role: "Director at RBC", roleZh: "加拿大皇家银行 总监" },
  { tier: "credit", name: "Bob Lin", role: "Director at BMO", roleZh: "蒙特利尔银行 总监" },
  { tier: "credit", name: "Sonika Shriwastav", role: "Senior Manager at CIBC", roleZh: "加拿大帝国商业银行 高级经理" },
  { tier: "credit", name: "Arnav Dureja", role: "High Yield Analyst at TD Asset Management", roleZh: "道明资产管理 高收益分析师" },
  { tier: "credit", name: "Assad Nunhuck", role: "Investment Banking Analyst at CIBC", roleZh: "加拿大帝国商业银行 投资银行分析师" },
  { tier: "credit", name: "Brian Lee", role: "CFO at CIBC Mellon", roleZh: "CIBC Mellon 首席财务官" },
  { tier: "credit", name: "Shobhit Bajaj", role: "Finance Manager at TD", roleZh: "道明银行 财务经理" },
  { tier: "credit", name: "Haley (Hanbo) Wang", role: "Senior Manager at RBC", roleZh: "加拿大皇家银行 高级经理" },
  { tier: "credit", name: "Nicola Christie", role: "Recruiter at RBC", roleZh: "加拿大皇家银行 招聘顾问" },
  { tier: "credit", name: "Cole Joyce", role: "Investment Banking Analyst at Agentis Capital", roleZh: "Agentis Capital 投资银行分析师" },
  { tier: "credit", name: "Ran Wang", role: "Senior Manager at CIBC", roleZh: "加拿大帝国商业银行 高级经理" },
  { tier: "credit", name: "Yerassyl Satybaldiyev", role: "Associate at TD Asset Management", roleZh: "道明资产管理 投资业务专员" },
  { tier: "credit", name: "Sulton Asanshoev", role: "Senior Manager at Scotiabank", roleZh: "加拿大丰业银行 高级经理" },
  { tier: "credit", name: "Vinod K Bulani", role: "Senior Director at RBC", roleZh: "加拿大皇家银行 高级总监" },
  { tier: "credit", name: "Parshv Chhajer", role: "Fund Accountant at CIBC Mellon", roleZh: "CIBC Mellon 基金会计" },
  { tier: "credit", name: "Xinrui Yang", role: "Investment Analyst at ActivumSG", roleZh: "ActivumSG 投资分析师" },
  { tier: "credit", name: "Yiyuan (Christina) Zhang", role: "Junior Financial Controller at Desay SV Europe", roleZh: "德赛西威欧洲 初级财务控制专员" },
  { tier: "credit", name: "Hugh Daly", role: "Investment Analyst at Tokoro Capital", roleZh: "Tokoro Capital 投资分析师" },
  { tier: "credit", name: "Alistair Bush", role: "Market Analytics at Green Street", roleZh: "Green Street 市场分析" },
  { tier: "credit", name: "Ziwei (Vivian) Wang", role: "Proseminar at Fidelity Investments", roleZh: "富达投资 Proseminar 项目" },
  { tier: "credit", name: "Tinglin Huang", role: "Cyber Research Specialist at Hiscox", roleZh: "Hiscox 网络安全研究专家" },
  { tier: "credit", name: "Jingxuan (Jessica) Jiang", role: "Sales & Trading FICC Desk at Goldman Sachs", roleZh: "高盛 FICC 销售与交易" },
  { tier: "credit", name: "Matthew McKee", role: "Equity Derivatives Trader at RBC", roleZh: "加拿大皇家银行 股票衍生品交易员" },
  { tier: "credit", name: "Aquid Fiaz", role: "Senior Manager at Scotiabank", roleZh: "加拿大丰业银行 高级经理" },
  { tier: "credit", name: "Yanxing (Jason) Chen", role: "Commodity Trader at Gent Commodity", roleZh: "Gent Commodity 大宗商品交易员" },
  { tier: "credit", name: "Yifu Du", role: "Debt Capital Market Analyst at China CITIC Bank", roleZh: "中信银行 债务资本市场分析师" },
  { tier: "credit", name: "Ning Xuan Pek", role: "Trading Analyst at Sinochem International Oil", roleZh: "中化国际石油 交易分析师" },
  { tier: "credit", name: "I-Hsuan (Yvonne) Ku", role: "Loan Distribution Specialist at Cathay United Bank", roleZh: "国泰世华银行 贷款分销专员" },
  { tier: "credit", name: "Victoria Lin", role: "Portfolio Management Analyst at Vita Group", roleZh: "Vita Group 投资组合管理分析师" },
  { tier: "credit", name: "Cameron Melville", role: "Fixed Income Risk Manager at LMR Partners", roleZh: "LMR Partners 固定收益风险经理" },
  { tier: "credit", name: "Bolun Cui", role: "Investment Banking Intern at Changjiang Securities", roleZh: "长江证券 投资银行实习生" },
  { tier: "credit", name: "Wenting Wei", role: "Equity Research Intern at Tianhong Asset Management", roleZh: "天弘资产管理 股票研究实习生" },
  { tier: "credit", name: "Alessandro Tardella", role: "Off-Cycle Intern at Blackstone", roleZh: "黑石 非暑期实习生" },
  { tier: "credit", name: "Zhenbang (Tom) Zhang", role: "Macro Sales at CLSA", roleZh: "中信里昂 宏观销售" },
  { tier: "credit", name: "Jing Yuan", role: "Strategy Analyst at Capital One", roleZh: "第一资本 战略分析师" },
  { tier: "credit", name: "Hazel (Fangyuan) Jiang", role: "Business Analyst at Tencent", roleZh: "腾讯 商业分析师" },
  { tier: "credit", name: "Evans Nimako", role: "Workplace Operations Intern at Landsec", roleZh: "Landsec 职场运营实习生" },
  { tier: "credit", name: "Yuchun (Nancy) Huang", role: "Investment Banking Analyst at Guotai Junan International", roleZh: "国泰君安国际 投资银行分析师" },
  { tier: "credit", name: "Douglas Ancell", role: "Investment Bank Graduate at Berenberg", roleZh: "贝伦贝格 投资银行培训生" },
  { tier: "credit", name: "Christia Kyriacou", role: "Treasury Intern at ASBIS", roleZh: "ASBIS 财资实习生" },
  { tier: "credit", name: "Imran Visram", role: "Consultant at KPMG", roleZh: "毕马威 顾问" },
  { tier: "credit", name: "Stephen (Wenyu) Yan", role: "Senior Fund Accountant at The Citco Group", roleZh: "Citco 集团 高级基金会计" },
  { tier: "credit", name: "Rorey Rose", role: "Senior Manager at BMO", roleZh: "蒙特利尔银行 高级经理" },
  { tier: "credit", name: "Jinyu (Ingrid) Zhang", role: "Senior Credit Risk Analyst at BMO", roleZh: "蒙特利尔银行 高级信用风险分析师" },
  { tier: "credit", name: "Sarah Hsu", role: "Compliance Summer Consultant at CIBC", roleZh: "加拿大帝国商业银行 合规暑期顾问" },
  { tier: "credit", name: "Anthony Zhang", role: "Senior Manager at CIBC", roleZh: "加拿大帝国商业银行 高级经理" },
  { tier: "credit", name: "Nicole Xie", role: "Risk Analyst at BMO", roleZh: "蒙特利尔银行 风险分析师" },
  { tier: "credit", name: "Alicia Damley", role: "Sessional Instructor at McMaster University", roleZh: "麦克马斯特大学 兼职讲师" },
  { tier: "credit", name: "Nan Nan Li", role: "Curator of Dedao Headlines", roleZh: "得到头条主理人" },
  { tier: "credit", name: "Xiaoyu Zhang", role: "Instructor of Classic Business Case Studies", roleZh: "经典商业案例课程导师" },
  { tier: "credit", name: "Dr. Ya Tang", role: "Associate Professor of Finance at Peking University", roleZh: "北京大学 金融学副教授" },
  { tier: "credit", name: "Dr. Qin Liu", role: "Professor of the Philosophy Department of East China Normal University", roleZh: "华东师范大学哲学系 教授" },
  { tier: "credit", name: "Zhenyu Luo", role: "Founder of Dedao", roleZh: "得到创始人" },
];

const titlePattern = /^(Dr\.|Mr\.|Ms\.|Mrs\.|Prof\.)\s+/i;

function toAscii(text: string) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function firstNameOf(name: string) {
  return name.replace(titlePattern, "").trim().split(/\s+/)[0] ?? name;
}

function organizationOf(role: string) {
  if (role.startsWith("My ") || role.startsWith("A Life") || role.startsWith("Instructor in")) {
    return "Personal";
  }

  const marker = " at ";
  const index = role.toLowerCase().lastIndexOf(marker);
  if (index === -1) {
    return "Independent";
  }
  return role.slice(index + marker.length);
}

function sortKeyOf(name: string) {
  return toAscii(`${firstNameOf(name)} ${name}`).toLowerCase();
}

export const creditEntries: CreditEntry[] = rawCreditEntries
  .map((entry, index) => {
    const firstName = firstNameOf(entry.name);
    const initial = toAscii(firstName).match(/[A-Za-z]/)?.[0]?.toUpperCase() ?? "#";

    return {
      ...entry,
      index: String(index + 1).padStart(2, "0"),
      firstName,
      initial,
      sortKey: sortKeyOf(entry.name),
      organization: organizationOf(entry.role),
    };
  })
  .sort((left, right) => {
    if (left.tier !== right.tier) {
      return left.tier === "huge" ? -1 : 1;
    }
    return left.sortKey.localeCompare(right.sortKey, "en");
  });
