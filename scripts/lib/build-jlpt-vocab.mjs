import fs from 'fs';
// parse simple CSV with quotes
function parse(t){const rows=[];let r=[],f='',q=false;for(let i=0;i<t.length;i++){const c=t[i];if(q){if(c=='"'&&t[i+1]=='"'){f+='"';i++}else if(c=='"')q=false;else f+=c}else if(c=='"')q=true;else if(c==','){r.push(f);f=''}else if(c=='\n'){r.push(f);rows.push(r);r=[];f=''}else if(c!='\r')f+=c}if(f||r.length){r.push(f);rows.push(r)}return rows}
const map={};
for(const n of [5,4,3,2,1]){const rows=parse(fs.readFileSync(`n${n}.csv`,'utf8')).slice(1);
 for(const [e,rd] of rows){ if(!e) continue; for(const raw of e.split(/[;；、,]/)){const k=raw.trim().replace(/[（(].*?[)）]/g,'');if(k&&!(k in map))map[k]=n} if(rd){for(const r of rd.split(/[;；、,]/)){const k=r.trim(); if(k && !(('kana:'+k) in map)) map['kana:'+k]=n}} }}
fs.writeFileSync('jlpt-vocab.json',JSON.stringify(map));
console.log(Object.keys(map).length, map['優しい'],map['笑う'],map['娘'],map['市役所'],map['説明'],map['勝つ'],map['人生']);
