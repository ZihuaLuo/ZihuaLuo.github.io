type DirectProjectPage = {
  title: string;
  description: string;
  url: string;
  kind: "dashboard" | "game";
  tags: string[];
  aliases: string[];
  content: string;
};

type SearchProject = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  aliases: string[];
  content: string;
  direct?: DirectProjectPage;
};

// Public search metadata only. Private source dashboards and research records
// must not be linked or copied into the index.
export const searchProjects: SearchProject[] = [
  {
    id: "canadian-electricity",
    title: "Canadian Electricity Research",
    description: "Research on electricity generation, consumption, and flows across Canadian provinces, with a public dashboard preview.",
    tags: ["Canada", "Electricity", "Research", "Dashboard"],
    aliases: ["Regional Electricity Generation and Consumption Patterns in Canada", "Canadian Electricity Dashboard", "Provincial Electricity", "加拿大电力"],
    content: "Statistics Canada provincial generation final-user consumption net electricity flows 2015 2024 research assistant",
    direct: {
      title: "Canadian Provincial Electricity Dashboard",
      description: "Open the interactive dashboard of provincial generation, final-user consumption, and electricity flows.",
      url: "/projects/canadian-provincial-electricity-dashboard.html",
      kind: "dashboard",
      tags: ["Canada", "Electricity", "Visualization", "Research"],
      aliases: ["Regional Electricity Generation and Consumption Patterns in Canada dashboard", "Canadian Electricity Research dashboard", "加拿大电力仪表盘"],
      content: "provincial electricity generation final-user consumption net flows 2015 2024 charts",
    },
  },
  {
    id: "retention-lab",
    title: "Volunteer Retention Lab",
    description: "A public overview of volunteer commitment, onboarding seasonality, and early engagement research. The underlying dashboard is private.",
    tags: ["Volunteer Research", "Retention", "Overview", "Private Data"],
    aliases: ["Volunteer Retention Dashboard", "Volunteer Project", "志愿者留存"],
    content: "volunteer retention lab overview volunteer commitment onboarding seasonality early engagement core volunteer group data privacy",
  },
  {
    id: "fund-similarity",
    title: "Fund Similarity Research",
    description: "Explore historical mutual fund and ETF similarity, cluster profiles, vehicle composition, and calendar sensitivity.",
    tags: ["Mutual Funds", "ETFs", "Research", "Dashboard"],
    aliases: ["RA5", "RA5 John", "John Maheu", "Historical Similarity among Mutual Funds and ETFs", "基金相似性", "共同基金与ETF"],
    content: "historical fund similarity research assistant RA5 John Maheu K-means clustering return volatility MVR mean to volatility ratio quantile shape calendar block resampling 6863 common window 120 months",
    direct: {
      title: "Fund Similarity Research Dashboard",
      description: "Compare aggregate fund clusters, historical return profiles, mutual fund and ETF composition, and resampling stability.",
      url: "/projects/fund-similarity-dashboard/",
      kind: "dashboard",
      tags: ["Mutual Funds", "ETFs", "Clustering", "Visualization"],
      aliases: ["RA5 Dashboard", "Fund Similarity Dashboard", "基金相似性仪表盘"],
      content: "historical similarity mutual funds ETFs dashboard return risk profiles monthly MVR calendar sensitivity 5980 mutual funds 883 ETFs",
    },
  },
  {
    id: "cloudline",
    title: "Cloudline",
    description: "A playable 3D tram game between floating seaside towns, with scenic autopilot and a workshop for upgrades.",
    tags: ["3D Game", "Tram", "Interactive", "Cloudline"],
    aliases: ["Cloudline Game", "The Slow Way Home", "Cloudline Tram Game", "电车游戏"],
    content: "Cloudline The Slow Way Home playable 3D aerial tram game Starlight Terminus Mango Tide scenic autopilot Oliver's Cloudworks workshop",
    direct: {
      title: "Play Cloudline",
      description: "Launch the self-contained tram game directly in the browser.",
      url: "/projects/cloudline.html",
      kind: "game",
      tags: ["Cloudline", "Playable Game", "Tram"],
      aliases: ["Open Cloudline Game", "Play Cloudline Tram Game", "直接玩 Cloudline"],
      content: "Cloudline The Slow Way Home playable self contained browser tram game",
    },
  },
  {
    id: "finance-phd-eda",
    title: "Finance PhD Time-to-Degree",
    description: "Explore Finance PhD graduation cohorts, time to degree, publications, placement, and supervision.",
    tags: ["Finance PhD", "Research", "EDA", "Dashboard"],
    aliases: ["Finance PhD EDA", "Finance PhD Time to Degree", "PhD Research Dashboard", "金融博士研究"],
    content: "finance phd doctoral research time to degree graduation cohort publication placement supervision exploratory data analysis",
    direct: {
      title: "Finance PhD Time-to-Degree Analysis",
      description: "Open the interactive aggregate analysis of Finance PhD outcomes and cohort trends.",
      url: "/projects/finance-phd-eda-report.html",
      kind: "dashboard",
      tags: ["Finance PhD", "Time to Degree", "EDA"],
      aliases: ["Finance PhD Dashboard", "Finance PhD EDA Report"],
      content: "finance phd graduation cohorts time to degree publication records placement supervision interactive analysis",
    },
  },
  {
    id: "corporate-scandal",
    title: "Corporate Scandal Research",
    description: "Explore coded scandal categories, research timelines, and organizational response actions across 130 cases.",
    tags: ["Corporate Scandal", "Research", "Visualization", "Dashboard"],
    aliases: ["Corporate Scandal Project", "Corporate Scandal Response", "公司丑闻"],
    content: "corporate scandal response coded cases categories research timeline organizational actions 130 cases 678 records",
    direct: {
      title: "Corporate Scandal Response Dashboard",
      description: "Open aggregate charts of coded cases, scandal categories, timelines, and response actions.",
      url: "/projects/corporate-scandal-dashboard/",
      kind: "dashboard",
      tags: ["Corporate Scandal", "Response", "Visualization"],
      aliases: ["Corporate Scandal Dashboard", "Corporate Scandal Research Dashboard", "公司丑闻仪表盘"],
      content: "corporate scandal 130 cases 678 coded records timeline categories response actions aggregate charts",
    },
  },
  {
    id: "noncompete-10k",
    title: "Non-Compete 10-K Research",
    description: "An overview of non-compete related annotations across 130 sampled 10-K filing snippets.",
    tags: ["Non-Compete", "10-K", "Research", "Dashboard"],
    aliases: ["Noncompete Project", "Non-Compete Research", "10-K Non-Compete", "竞业禁止"],
    content: "non compete 10 K research filing snippets clause annotations restriction duration geography type themes",
    direct: {
      title: "Non-Compete 10-K Coding Dashboard",
      description: "Open aggregate visualizations of filing years, coding features, and explicit type terms.",
      url: "/projects/noncompete-10k-dashboard/",
      kind: "dashboard",
      tags: ["Non-Compete", "10-K", "Coding", "Visualization"],
      aliases: ["Non-Compete Dashboard", "Noncompete 10K Dashboard", "竞业禁止仪表盘"],
      content: "non compete 10 K 130 filing snippets 1262 annotations sample timeline feature coverage type terms",
    },
  },
];
