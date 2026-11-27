// usage: node furi.mjs <repoDir> <in.json: [ja,...]>  -> prints [{ja,furigana,romaji,tokens}]
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join, dirname } from "node:path";
const repo = process.argv[2];
const require = createRequire(join(repo, "package.json"));
const kuromoji = require("kuromoji");
const dicPath = join(dirname(require.resolve("kuromoji")), "..", "dict");
const KANJI = /[一-鿿㐀-䶿々]/;
const k2h = (s) => s.replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));
const T = {あ:"a",い:"i",う:"u",え:"e",お:"o",か:"ka",き:"ki",く:"ku",け:"ke",こ:"ko",さ:"sa",し:"shi",す:"su",せ:"se",そ:"so",た:"ta",ち:"chi",つ:"tsu",て:"te",と:"to",な:"na",に:"ni",ぬ:"nu",ね:"ne",の:"no",は:"ha",ひ:"hi",ふ:"fu",へ:"he",ほ:"ho",ま:"ma",み:"mi",む:"mu",め:"me",も:"mo",や:"ya",ゆ:"yu",よ:"yo",ら:"ra",り:"ri",る:"ru",れ:"re",ろ:"ro",わ:"wa",を:"o",ん:"n",が:"ga",ぎ:"gi",ぐ:"gu",げ:"ge",ご:"go",ざ:"za",じ:"ji",ず:"zu",ぜ:"ze",ぞ:"zo",だ:"da",ぢ:"ji",づ:"zu",で:"de",ど:"do",ば:"ba",び:"bi",ぶ:"bu",べ:"be",ぼ:"bo",ぱ:"pa",ぴ:"pi",ぷ:"pu",ぺ:"pe",ぽ:"po",ぁ:"a",ぃ:"i",ぅ:"u",ぇ:"e",ぉ:"o",ゔ:"vu"};
const Y = {ゃ:"a",ゅ:"u",ょ:"o"};
function romaji(h) {
  let o = "";
  for (let i = 0; i < h.length; i++) {
    const c = h[i], n = h[i + 1];
    if (c === "っ") { if (!n) { o += "Q"; continue; } const nx = T[n] || ""; o += nx.startsWith("ch") ? "t" : nx[0] || ""; continue; }
    if (c === "ー") { const v = o.slice(-1); o = o.slice(0, -1) + ({a:"ā",i:"ī",u:"ū",e:"ē",o:"ō"}[v] || v); continue; }
    if (Y[n] && T[c]) { const b = T[c]; o += (b.startsWith("sh")||b.startsWith("ch")||b==="ji" ? b.slice(0,-1) : b.slice(0,-1)+"y") + Y[n]; i++; continue; }
    if ("ぁぃぅぇぉ".includes(n||"#") && T[c] && c!=="ー") { o += T[c].slice(0,-1) + T[n]; i++; continue; }
    if (c === "ん" && /[aiueoy]/.test((T[n]||"#")[0])) { o += "n'"; continue; }
    o += T[c] ?? c;
  }
  return o.replace(/ou/g,"ō").replace(/oo/g,"ō").replace(/uu/g,"ū");
}
const PUNCT = { "。": ".", "、": ",", "？": "?", "?": "?", "！": "!", "!": "!", "「": '"', "」": '"', "…": "...", "—": " -" };
function furiOf(surface, reading) {
  // split okurigana: kanji core + kana tail/head
  if (!KANJI.test(surface)) return [{ surface, reading: "" }];
  const r = k2h(reading);
  let a = 0, b = 0;
  while (a < surface.length && !KANJI.test(surface[a]) && k2h(surface[a]) === r[a]) a++;
  while (b < surface.length - a && !KANJI.test(surface[surface.length-1-b]) && k2h(surface[surface.length-1-b]) === r[r.length-1-b]) b++;
  const out = [];
  if (a) out.push({ surface: surface.slice(0, a), reading: "" });
  out.push({ surface: surface.slice(a, surface.length - b), reading: r.slice(a, r.length - b) });
  if (b) out.push({ surface: surface.slice(surface.length - b), reading: "" });
  return out;
}
kuromoji.builder({ dicPath }).build((e, tk) => {
  const items = JSON.parse(readFileSync(process.argv[3], "utf8"));
  const res = items.map((ja) => {
    const toks = tk.tokenize(ja);
    let segs = [], words = [];
    for (const t of toks) {
      const rd = t.reading && t.reading !== "*" ? t.reading : t.surface_form;
      for (const s of furiOf(t.surface_form, rd)) {
        const last = segs[segs.length - 1];
        if (!s.reading && last && !last.reading) last.surface += s.surface; else segs.push({ ...s });
      }
      const p = PUNCT[t.surface_form];
      if (p) { words.push({ p }); continue; }
      let pron = t.pronunciation && t.pronunciation !== "*" ? t.pronunciation : rd;
      if (/[A-Za-z0-9]/.test(t.surface_form)) pron = t.surface_form;
      const prevPos = words.length && !words[words.length-1].p ? words[words.length-1].pos : null;
      const joinPrev = (t.pos === "助動詞" && ["動詞","助動詞","形容詞"].includes(prevPos)) || (t.pos === "動詞" && t.pos_detail_1 === "非自立") || t.pos_detail_1 === "接尾" || (t.pos==="助詞" && t.pos_detail_1==="接続助詞" && ["て","で"].includes(t.surface_form));
      words.push({ r: /[A-Za-z0-9]/.test(pron) ? pron : romaji(k2h(pron)), j: joinPrev, pos: t.pos });
    }
    let rom = "";
    for (const w of words) {
      if (w.p) { rom = rom.replace(/ $/, "") + w.p + " "; continue; }
      if (w.j) rom = rom.replace(/ $/, "") + w.r + " "; else rom += w.r + " ";
    }
    rom = rom.replace(/Q\s*(ch|[a-z])/g, (m, c) => (c === "ch" ? "t" : c[0]) + c).replace(/Q/g, "");
    rom = rom.trim().replace(/\s+([.,?!])/g, "$1");
    rom = rom.charAt(0).toUpperCase() + rom.slice(1);
    rom = rom.replace(/([.?!] )([a-zāīūēō])/g, (m, a, b) => a + b.toUpperCase());
    return { ja, furigana: segs, romaji: rom, tokens: toks.map((t) => `${t.surface_form}/${t.basic_form}/${t.reading}/${t.pos}`).join(" ") };
  });
  console.log(JSON.stringify(res, null, 1));
});
