export const frontNavLinks = [
  {
    label: "務實理念",
    route: "/brand",
    sub: [
      {
        label: "企業精神",
        route: "/brand",
      },
      {
        label: "關係企業",
        route: "/history",
      },
      {
        label: "協力廠商",
        route: "/partners",
      },
    ],
  },
  {
    label: "精彩力作",
    route: "/works",
  },
  {
    label: "新案鑑賞",
    route: "/projects",
  },
  {
    label: "聯絡我們",
    route: "/contact",
  },
];

// 合作關係建築師或企業
export const RELATED_COMPANIES = [
  {
    name: "高誠實業",
    img: "kong.jpg",
    link: "https://www.kao-cheng.com.tw/",
  },
  {
    name: "高誠建設",
    img: "lin.jpg",
    link: "",
  },
  {
    name: "高華建設",
    img: "bo.jpg",
    link: "",
  },
  {
    name: "高華營造",
    img: "bo.jpg",
    link: "",
  },
  {
    name: "高誠開發建設",
    img: "bo.jpg",
    link: "",
  },
];

export const RELATED_PARTNERS = [
  {
    name: "康文在建築師事務所",
    img: "kong.jpg",
    educational: ["逢甲大學建築系"],
    projects: [
      "大矩聯合建築師事務所",
      "亞洲聯合建築師事務所",
      "1999 民國八十八年”建築師”高考及格",
      "2000.06 康文在建築師事務所辦理開業",
      "2000.07 康文在建築師事務所主持建築師",
    ],
    link: "https://www.facebook.com/kongwenjianzhu",
  },
  {
    name: "林國棟建築師事務所",
    img: "lin.jpg",
    educational: ["國立台北科技大學建築及都市計畫研究所"],
    projects: [
      "羅興華建築師事務所",
      "沈祖海建築師事務所",
      "君行室內裝修有限公司",
      "林國棟建築師事務所",
    ],
    link: "https://www.facebook.com/lin.guodong.5030",
  },
  {
    name: "柏恩設計團隊",
    img: "bo.jpg",
    description:
      "柏恩室內裝修重視人與空間之間的互動。我們想以最親近的方式與您建立更近距離的舒適生活。我們專營代銷、實品屋、建案公設、商業空間、住宅設計，本身代銷出身，甲方出發，透過溝通探索居住者的需求輪廓，採用簡約的線條比例，最自然的材質切割，勾勒空間怖局，呈現具有獨到品味的質感居所",
    educational: [],
    projects: [],
    link: "https://www.facebook.com/profile.php?id=100063808000000",
  },
];

// A 高誠-森仰	桃園市中壢區松勇一街65-75號
// B 高誠-首耀	桃園市八德區豐田一路32號
// C 高誠-好時代	桃園市楊梅區瑞坪路266號
// D 高誠君臨	桃園市大園區園學路173號
// E 高誠君閱	桃園市大園區科一街165號
// F 高誠W	桃園市平鎮區廣達街10號1樓
// G 高誠君壐	桃園市大園區文興街
// H 高誠君品	桃園市大園區園學路
export const COMMUNITY_LIST = [
  {
    code: "A",
    name: "高誠-森仰",
    address: "桃園市中壢區松勇一街65-75號",
  },
  {
    code: "B",
    name: "高誠-首耀",
    address: "桃園市八德區豐田一路32號",
  },
  {
    code: "C",
    name: "高誠-好時代",
    address: "桃園市楊梅區瑞坪路266號",
  },
  {
    code: "D",
    name: "高誠君臨",
    address: "桃園市大園區園學路173號",
  },
  {
    code: "E",
    name: "高誠君閱",
    address: "桃園市大園區科一街165號",
  },
  {
    code: "F",
    name: "高誠W",
    address: "桃園市平鎮區廣達街10號1樓",
  },
  {
    code: "G",
    name: "高誠君壐",
    address: "桃園市大園區文興街",
  },
  {
    code: "H",
    name: "高誠君品",
    address: "桃園市大園區園學路",
  },
];

// 聯絡時間
export const CONTACT_TIME_LIST = [
  { name: "10:00-11:00", value: "10:00-11:00" },
  { name: "11:00-12:00", value: "11:00-12:00" },
  { name: "14:00-15:00", value: "14:00-15:00" },
  { name: "15:00-16:00", value: "15:00-16:00" },
  { name: "16:00-17:00", value: "16:00-17:00" },
  { name: "以上時段皆可", value: "以上時段皆可" },
];

// 修繕區域
export const REPAIR_AREA_LIST = [
  { name: "玄關", value: "玄關" },
  { name: "客廳", value: "客廳" },
  { name: "陽台", value: "陽台" },
  { name: "廚房", value: "廚房" },
  { name: "主衛浴", value: "主衛浴" },
  { name: "次衛浴", value: "次衛浴" },
  { name: "臥室", value: "臥室" },
  { name: "其他", value: "其他" },
];
// 修繕類別
export const REPAIR_CLASS_LIST = [
  { name: "水電", value: "水電" },
  { name: "防水", value: "防水" },
  { name: "弱電", value: "弱電" },
  { name: "磁磚", value: "磁磚" },
  { name: "廚具", value: "廚具" },
  { name: "衛浴", value: "衛浴" },
  { name: "設備", value: "設備" },
  { name: "門窗", value: "門窗" },
  { name: "其他", value: "其他" },
];
/**
 * 
 * 
 高誠君壐-大樓區https://market.591.com.tw/5917412
高誠君壐-透天區 https://market.591.com.tw/5933702
高誠君品https://newhouse.591.com.tw/136741
 * 
 *  */
