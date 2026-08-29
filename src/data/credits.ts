export type CreditTier = "huge" | "credit";

export type CreditEntry = {
  index: string;
  tier: CreditTier;
  name: string;
  firstName: string;
  initial: string;
  sortKey: string;
  role: string;
  organization: string;
};

type RawCreditEntry = {
  name: string;
  role: string;
  tier: CreditTier;
};

export const creditPageSize: Record<CreditTier, number> = {
  huge: 12,
  credit: 24,
};

const rawCreditEntries: RawCreditEntry[] = [
  { tier: "huge", name: "Wenjing Ding", role: "My Significant Other" },
  { tier: "huge", name: "Anyu Luo", role: "My Dad" },
  { tier: "huge", name: "Liangyin Wu", role: "My Mom" },
  { tier: "huge", name: "Sorenia Chatzialexiou", role: "Manager at TD" },
  { tier: "huge", name: "Dr. Richard Hou", role: "Director at RBC" },
  { tier: "huge", name: "Walker Chau", role: "Supervisor at CIBC Mellon" },
  { tier: "huge", name: "Dr. Trevor William Chamberlain", role: "Professor at McMaster University" },
  { tier: "huge", name: "Dr. Anna Danielova", role: "Associate Professor at McMaster University" },
  { tier: "huge", name: "Dr. Nooshin Salari", role: "Assistant Professor at McMaster University" },
  { tier: "huge", name: "Dhama Ganesh", role: "Manager at TD Asset Management" },
  { tier: "huge", name: "Dr. Jun Wu", role: "A Life Instructor I Have Never Met" },
  { tier: "huge", name: "Dr. Zhaofeng Xue", role: "Instructor in Economic Thinking" },
  { tier: "huge", name: "Dr. Lingling Shi", role: "Assistant Professor at McMaster University" },
  { tier: "huge", name: "Dr. John Maheu", role: "Professor at McMaster University" },

  { tier: "credit", name: "Amy Mok", role: "AVP at TD Asset Management" },
  { tier: "credit", name: "Andrew Niyamuddin", role: "Manager at TD Asset Management" },
  { tier: "credit", name: "Jacky Yang", role: "Manager at TD Asset Management" },
  { tier: "credit", name: "Cynthia Nazareth", role: "Manager at TD Asset Management" },
  { tier: "credit", name: "Dr. Yoontae Jeon", role: "Associate Professor at McMaster University" },
  { tier: "credit", name: "Dr. Sudipto Sarkar", role: "Professor at McMaster University" },
  { tier: "credit", name: "Amar Sandher", role: "Relationship Manager at McMaster University" },
  { tier: "credit", name: "Yuming Sun", role: "CEO & Founder at RER-RECONOCER" },
  { tier: "credit", name: "Kshitij Gupta", role: "Senior Manager at RBC" },
  { tier: "credit", name: "Yukang (Dora) Duan", role: "Senior Manager at Scotiabank" },
  { tier: "credit", name: "Farzad Jafari", role: "Senior Risk Consultant at EY" },
  { tier: "credit", name: "Nihar Desai", role: "VP at Brookfield" },
  { tier: "credit", name: "Marzuka Mahmud", role: "Senior Analyst at TD Securities" },
  { tier: "credit", name: "Pouya Hosseini", role: "Senior Consultant at EY" },
  { tier: "credit", name: "René Javier Guzmán", role: "Director at BMO" },
  { tier: "credit", name: "Jiahe Deng", role: "Enterprise Market Risk Manager at RBC" },
  { tier: "credit", name: "Farrukh Mumtaz K.", role: "Audit Manager at CIBC" },
  { tier: "credit", name: "Shobhit Bajaj", role: "Finance Manager at TD" },
  { tier: "credit", name: "Ran Wang", role: "Senior Manager at CIBC" },
  { tier: "credit", name: "Xiaoyu Zhang", role: "Instructor of Classic Business Case Studies" },
  { tier: "credit", name: "Dr. Ya Tang", role: "Associate Professor of Finance at Peking University" },
  { tier: "credit", name: "Dr. Qin Liu", role: "Professor of the Philosophy Department of East China Normal University" },
];

const titlePattern = /^(Dr\.|Mr\.|Ms\.|Mrs\.|Prof\.)\s+/i;

function toAscii(text: string) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function creditEntryAnchor(name: string) {
  const slug = toAscii(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `credit-${slug}`;
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
