import type { JlptLevel, Translations } from "./content-schema";

/**
 * Bài nghe thử xếp cấp ở onboarding: 3 câu thật trong kho truyện (audio có sẵn),
 * dễ dần lên. Người dùng nghe rồi tự chấm "Hiểu / Chưa hiểu"; cấp gợi ý = câu khó nhất còn hiểu.
 */
export interface PlacementItem {
  level: JlptLevel;
  storyId: string;
  ja: string;
  audio: string;
  translations: Translations;
}

export const PLACEMENT: PlacementItem[] = [
  {
    level: "N5",
    storyId: "akazukin",
    ja: "昔々、赤い頭巾の女の子がいました。",
    audio: "/audio/akazukin/001.mp3",
    translations: {
      vi: "Ngày xưa có một cô bé đội khăn trùm đầu màu đỏ.",
      en: "Once upon a time, there was a girl with a red hood.",
      "zh-Hans": "很久以前，有一个戴着红头巾的女孩。",
      "zh-Hant": "很久以前，有一個戴著紅頭巾的女孩。",
      ko: "옛날 옛적에 빨간 두건을 쓴 여자아이가 있었어요.",
      tl: "Noong unang panahon, may isang batang babae na may pulang talukbong.",
      ne: "धेरै पहिले, रातो टोपी लगाउने एउटी केटी थिई।",
      id: "Dahulu kala, ada seorang gadis berkerudung merah.",
      pt: "Era uma vez uma menina de capuz vermelho.",
      my: "ရှေးရှေးတုန်းက ခေါင်းစွပ်အနီဆောင်းထားတဲ့ ကောင်မလေးတစ်ယောက် ရှိခဲ့တယ်။",
      th: "กาลครั้งหนึ่ง มีเด็กหญิงคนหนึ่งสวมผ้าคลุมศีรษะสีแดง",
    },
  },
  {
    level: "N4",
    storyId: "baito-interview",
    ja: "私はコンビニのアルバイトの面接を受けました。",
    audio: "/audio/baito-interview/001.mp3",
    translations: {
      vi: "Tôi đã đi phỏng vấn làm thêm ở cửa hàng tiện lợi.",
      en: "I had an interview for a part-time job at a convenience store.",
      "zh-Hans": "我参加了便利店兼职的面试。",
      "zh-Hant": "我參加了便利商店打工的面試。",
      ko: "저는 편의점 아르바이트 면접을 봤어요.",
      tl: "Nag-interview ako para sa part-time na trabaho sa convenience store.",
      ne: "मैले कन्भिनियन्स स्टोरको पार्ट-टाइम कामको अन्तर्वार्ता दिएँ।",
      id: "Saya mengikuti wawancara kerja paruh waktu di minimarket.",
      pt: "Fiz uma entrevista para um trabalho de meio período numa loja de conveniência.",
      my: "ကျွန်တော် စတိုးဆိုင်မှာ အချိန်ပိုင်းအလုပ်အတွက် အင်တာဗျူး ဖြေခဲ့တယ်။",
      th: "ฉันไปสัมภาษณ์งานพาร์ทไทม์ที่ร้านสะดวกซื้อ",
    },
  },
  {
    level: "N3",
    storyId: "the-first-snow",
    ja: "南の国では、雪は降りません。",
    audio: "/audio/the-first-snow/002.mp3",
    translations: {
      vi: "Ở xứ phương nam, tuyết không rơi.",
      en: "In the southern country, it doesn't snow.",
      "zh-Hans": "在南方的国家，不会下雪。",
      "zh-Hant": "在南方的國家，不會下雪。",
      ko: "남쪽 나라에서는 눈이 내리지 않아요.",
      tl: "Sa bansa sa timog, hindi umuulan ng niyebe.",
      ne: "दक्षिणी देशमा हिउँ पर्दैन।",
      id: "Di negeri selatan, salju tidak turun.",
      pt: "No país do sul, não neva.",
      my: "တောင်ဘက်နိုင်ငံမှာ နှင်းမကျဘူး။",
      th: "ในดินแดนทางใต้ หิมะไม่ตก",
    },
  },
];
