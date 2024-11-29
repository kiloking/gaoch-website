export interface Work {
  id: number;
  title: string;
  category: WorkCategory;
  image: string;
  bgimg: string;
  year: string;
  location: string;
  description?: string;
  images?: string[];
  ytVideoUrl?: string;
  details?: {
    address: string;
    area: string;
    units?: string;
    floors: string;
    houseTypes?: string;
    parkingSpaces?: string;
    architect: string;
    constructor: string;
  };
}

export type WorkCategory = "住宅設計" | "豪宅設計" | "商業設計";

export const WORK_CATEGORIES: string[] = [
  "全部作品",
  "住宅設計",
  "豪宅設計",
  "商業設計",
];

export const WORKS: Work[] = [
  {
    id: 1,
    title: "高誠帝景",
    category: "住宅設計",
    image: "w01.png",
    bgimg: "w01_bg.png",
    year: "2007",
    location: "中壢區",
    description: "位於中壢青埔地區的精緻住宅，提供舒適的生活空間。",
    ytVideoUrl: "https://www.youtube.com/watch?v=XXXXX1",
    details: {
      address: "桃園市中壢區青埔五街138號",
      area: "920坪",
      units: "9棟",
      floors: "地上5層",
      architect: "康文在建築師事務所",
      constructor: "人才營造股份有限公司",
    },
  },
  {
    id: 2,
    title: "高誠富築",
    category: "住宅設計",
    image: "w02.png",
    bgimg: "w02_bg.png",
    year: "2009",
    location: "中壢區",
    description: "大規模的住宅開發案，打造優質的居住環境。",
    ytVideoUrl: "https://www.youtube.com/watch?v=XXXXX2",
    details: {
      address: "桃園市中壢區龍川五街108號",
      area: "1,860坪",
      units: "22棟",
      floors: "地上5層，地下1層",
      architect: "康文在建築師事務所",
      constructor: "長佑營造股份有限公司",
    },
  },
  {
    id: 3,
    title: "高誠湖悅一/二期",
    category: "住宅設計",
    image: "w03.png",
    bgimg: "w03_bg.png",
    year: "2011",
    location: "中壢區",
    description: "分期開發的優質住宅，環境清幽寧靜。",
    ytVideoUrl: "https://www.youtube.com/watch?v=XXXXX3",
    details: {
      address: "桃園市中壢區松平二街28號/松信二街25號",
      area: "557坪/817坪",
      units: "4棟/7棟",
      floors: "地上4層",
      architect: "康文在建築師事務所",
      constructor: "人才營造股份有限公司",
    },
  },
  {
    id: 4,
    title: "高誠首耀",
    category: "豪宅設計",
    image: "w04.png",
    bgimg: "w04_bg.png",
    year: "2013",
    location: "八德區",
    description: "豪華住宅大樓，提供多元的居住空間。",
    ytVideoUrl: "https://www.youtube.com/watch?v=XXXXX4",
    details: {
      address: "桃園市八德區豐田一路38號",
      area: "496坪",
      units: "47戶49車",
      floors: "地上13層，地下12層",
      houseTypes: "40.08-95.24坪",
      architect: "康文在建築師事務所",
      constructor: "長佑營造股份有限公司",
    },
  },
  {
    id: 5,
    title: "高誠森仰",
    category: "住宅設計",
    image: "w05.png",
    bgimg: "w05_bg.png",
    year: "2016",
    location: "中壢區",
    description: "現代都會住宅，規劃完善的生活機能。",
    ytVideoUrl: "https://www.youtube.com/watch?v=XXXXX5",
    details: {
      address: "桃園市中壢區松勇一街65號",
      area: "800坪",
      units: "99戶105車",
      floors: "地上13層，地下12層",
      houseTypes: "33-42坪",
      architect: "康文在建築師事務所",
      constructor: "長佑營造股份有限公司",
    },
  },
  {
    id: 6,
    title: "高誠好時代",
    category: "住宅設計",
    image: "w06.png",
    bgimg: "w06_bg.png",
    year: "2018",
    location: "楊梅區",
    description: "大型住宅社區，提供多元的居住選擇。",
    ytVideoUrl: "https://www.youtube.com/watch?v=XXXXX6",
    details: {
      address: "桃園市楊梅區瑞坪路276巷2號",
      area: "1,831坪",
      units: "198戶212車",
      floors: "地上7層，地下2層",
      houseTypes: "22-70坪",
      architect: "康文在建築師事務所",
      constructor: "高華營造股份有限公司",
    },
  },
  {
    id: 7,
    title: "高誠君臨",
    category: "豪宅設計",
    image: "w07.png",
    bgimg: "w07_bg.png",
    year: "2021",
    location: "大園區",
    description: "精緻豪宅，打造尊榮的居住體驗。",
    ytVideoUrl: "https://www.youtube.com/watch?v=XXXXX7",
    details: {
      address: "桃園市大園區園學路173號",
      area: "648坪",
      units: "51戶58車",
      floors: "地上13層，地下2層",
      houseTypes: "39.58~43.28坪",
      architect: "康文在建築師事務所",
      constructor: "高華營造股份有限公司",
    },
  },
  {
    id: 8,
    title: "高誠君閱",
    category: "住宅設計",
    image: "w08.png",
    bgimg: "w08_bg.png",
    year: "2022",
    location: "大園區",
    description: "科技園區優質住宅，便利的生活機能。",
    ytVideoUrl: "https://www.youtube.com/watch?v=XXXXX8",
    details: {
      address: "桃園市大園區科一街、科三街",
      area: "954坪",
      units: "85戶84車",
      floors: "地上11層，地下2層",
      houseTypes: "31-47坪",
      architect: "康文在建築師事務所",
      constructor: "高華營造股份有限公司",
    },
  },
  {
    id: 9,
    title: "高誠君壐",
    category: "住宅設計",
    image: "w09.png",
    bgimg: "w09_bg.png",
    year: "2023",
    location: "大園區",
    description: "結合大樓與透天的多元住宅規劃。",
    ytVideoUrl: "https://www.youtube.com/watch?v=XXXXX9",
    details: {
      address: "桃園市大園區文興街20巷1號斜對面",
      area: "761坪",
      units: "70戶56車/8戶",
      floors: "地上15層，地下2層/地上3層",
      houseTypes: "31-47坪",
      architect: "康文在建築師事務所",
      constructor: "高華營造股份有限公司",
    },
  },
  {
    id: 10,
    title: "高誠君品",
    category: "住宅設計",
    image: "w10.png",
    bgimg: "w10_bg.png",
    year: "2024",
    location: "大園區",
    description: "最新住宅規劃，打造現代化的生活空間。",
    ytVideoUrl: "https://www.youtube.com/watch?v=XXXXX10",
    details: {
      address: "桃園市大園區園學路與文治路附近",
      area: "752坪",
      units: "78戶79車",
      floors: "地上14層，地下2層",
      houseTypes: "26-39坪",
      architect: "康文在建築師事務所",
      constructor: "規劃中",
    },
  },
];
