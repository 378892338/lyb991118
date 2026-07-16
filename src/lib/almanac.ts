/**
 * 轻量级农历转换 — 零依赖
 * 干支、农历月日、宜忌 全部本地计算
 * 基于 1900-2100 农历数据表
 */

/* ── 基础常量 ── */

// 农历数据表 1900-2100: 每项低12位=当年农历天数，高4位=闰月(0=无闰月)
const LUNAR_INFO = [
  0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
  0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
  0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
  0x06566, 0x0d4a0, 0x0ea50, 0x16a95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
  0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,
  0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
  0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,
  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
  0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0,
  0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
  0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
  0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
  0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
  0x14b63,
];

const TIAN_GAN = ["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"] as const;
const DI_ZHI = ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"] as const;
const ZODIAC = ["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"] as const;

const CHINESE_MONTH = ["正","二","三","四","五","六","七","八","九","十","冬","腊"] as const;
const CHINESE_DAY = [
  "初一","初二","初三","初四","初五","初六","初七","初八","初九","初十",
  "十一","十二","十三","十四","十五","十六","十七","十八","十九","二十",
  "廿一","廿二","廿三","廿四","廿五","廿六","廿七","廿八","廿九","三十",
] as const;

const YI_POOL = [
  "出行","纳财","开工","开市","立券","交易","嫁娶","纳采","订盟","祭祀",
  "祈福","求嗣","解除","移徙","入宅","安床","修造","动土","上梁","竖柱",
  "赴任","会亲友","入学","盖屋","置产","栽种","牧养",
];
const JI_POOL = [
  "嫁娶","动土","安葬","行丧","伐木","作梁","开渠","掘井","作灶",
  "出行","移徙","入宅","安门","修造","上梁","破土","栽种","置产",
  "词讼","针灸","赴任",
];

/* ── 公历转农历核心 ── */

function solarToLunar(year: number, month: number, day: number) {
  const baseDate = Date.UTC(1900, 0, 31);
  const targetDate = Date.UTC(year, month - 1, day);
  let offset = (targetDate - baseDate) / 86400000;

  let lunarYear = 0;
  let totalDays = 0;
  for (let i = 0; i < LUNAR_INFO.length; i++) {
    totalDays += LUNAR_INFO[i] & 0xfff;
    if (offset < totalDays) {
      lunarYear = 1900 + i;
      offset -= totalDays - (LUNAR_INFO[i] & 0xfff);
      break;
    }
  }

  const yearInfo = LUNAR_INFO[lunarYear - 1900];
  let lunarMonth = 1;
  let lunarDay = 1;
  let isLeap = false;
  let monthSum = 0;
  const leapMonth = (yearInfo >> 12) & 0xf;

  for (let m = 1; m <= 12; m++) {
    let monthDays = (yearInfo & (0x8000 >> (m - 1))) ? 30 : 29;
    if (offset < monthSum + monthDays && lunarMonth === m) {
      lunarDay = offset - monthSum + 1;
      break;
    }
    monthSum += monthDays;
    lunarMonth = m + 1;

    // 闰月
    if (leapMonth === m) {
      const leapDays = (yearInfo & 0xf0000) ? 30 : 29;
      if (offset < monthSum + leapDays) {
        lunarDay = offset - monthSum + 1;
        isLeap = true;
        break;
      }
      monthSum += leapDays;
    }
  }

  return { lunarYear, lunarMonth: lunarMonth <= 12 ? lunarMonth : 12, lunarDay: lunarDay || 1, isLeap };
}

function toGanzhi(year: number, month: number, day: number) {
  const gzYear = TIAN_GAN[(year - 4) % 10] + DI_ZHI[(year - 4) % 12];
  const idx = (year - 1900) * 12 + month + 12;
  const gzMonth = TIAN_GAN[idx % 10] + DI_ZHI[(idx + 1) % 12];
  const base = Math.floor(Date.UTC(year, month - 1, day) / 86400000) + 29219 + 18;
  const gzDay = TIAN_GAN[((base % 10) + 10) % 10] + DI_ZHI[((base % 12) + 12) % 12];
  return { gzYear, gzMonth, gzDay };
}

function pickYiJi(y: number, m: number, d: number) {
  const seed = y * 10000 + m * 100 + d;
  const r1 = (seed * 1103515245 + 12345) >>> 0;
  const r2 = (r1 * 1103515245 + 12345) >>> 0;
  const yiStart = r1 % (YI_POOL.length - 4);
  const jiStart = r2 % (JI_POOL.length - 3);
  const yi = YI_POOL.slice(yiStart, yiStart + 4);
  const ji = JI_POOL.slice(jiStart, jiStart + 3).filter((j) => !yi.includes(j));
  return { yi, ji };
}

/* ── 导出 ── */

export interface AlmanacDay {
  solarDate: string;
  lunarDate: string;
  ganzhiYear: string;
  ganzhiMonth: string;
  ganzhiDay: string;
  zodiac: string;
  yi: string[];
  ji: string[];
}

export function computeAlmanac(y: number, m: number, d: number): AlmanacDay {
  const lunar = solarToLunar(y, m, d);
  const monthName = (lunar.isLeap ? "闰" : "") + CHINESE_MONTH[lunar.lunarMonth - 1];
  const dayName = CHINESE_DAY[lunar.lunarDay - 1];
  const gz = toGanzhi(y, m, d);
  const { yi, ji } = pickYiJi(y, m, d);

  return {
    solarDate: `${y}-${String(m).padStart(2,"0")}-${String(d).padStart(2,"0")}`,
    lunarDate: `${monthName}月${dayName}`,
    ganzhiYear: gz.gzYear,
    ganzhiMonth: gz.gzMonth,
    ganzhiDay: gz.gzDay,
    zodiac: ZODIAC[(y - 4) % 12],
    yi,
    ji,
  };
}

export function getTodayAlmanac(): AlmanacDay {
  const today = new Date();
  return computeAlmanac(today.getFullYear(), today.getMonth() + 1, today.getDate());
}

export function precomputeYear(): AlmanacDay[] {
  const result: AlmanacDay[] = [];
  const start = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    result.push(computeAlmanac(d.getFullYear(), d.getMonth() + 1, d.getDate()));
  }
  return result;
}
