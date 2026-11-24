/* Kazakhstan archives map: real relief map, archive pins, memory pins, before/now comparison with shanyrak reveal */
{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const EJ=window.EJ||{},S=EJ.S||[];
const src=n=>{const s=S[n-1];return s?`<a class="src" href="${s[2]}" target="_blank" rel="noopener" title="${esc(s[0])}">${n}</a>`:''};
/* map bounds from Wikipedia location-map data: top 56, bottom 40, left 46, right 88 */
const X=lo=>(lo-46)/42*100,Y=la=>(56-la)/16*100;
const AR=[
 {n:'ҚР Орталық мемлекеттік архиві',c:'Алматы',la:43.24,lo:76.89,dx:-2.2,dy:-3,y0:'1921',y1:'2021',img:'kz_alm',cap:'«Архив ғимараты», Алматы, Абай даңғылы · Aray21212121, CC BY-SA 4.0',
  b:[['Құрылуы','1921 жылы 1 қыркүйекте Орынбор губерниялық архиві негізінде ашылды',8],['Қызметкерлер','Басында 5 адам: директор, екі архивші, хатшы, күзетші',8],['Алғашқы қор','1921 жылдың соңына дейін 19 мекеменің құжаты түсті',8]],
  a:[['Мерейтой','2021 жылы 100 жылдығы атап өтіліп, ескерткіш тақта орнатылды',9],['Бір шаңырақ астында','Ғимаратта ғылыми-техникалық құжаттама және кино-фото-дыбыс архивтері де орналасқан',10]]},
 {n:'Кино-фотоқұжаттар және дыбыс жазбалары архиві',c:'Алматы',la:43.24,lo:76.89,dx:2.4,dy:1.6,y0:'1943',y1:'Бүгін',img:'tape',cap:'Иллюстрация: магнитофон таспасы · touhotus, CC BY 2.0',
  b:[['Құрылуы','1943 жылдың көктемінде ашылды',10],['Жағдай','Соғыстың ең ауыр кезеңінде құрылған',10]],
  a:[['Қор','30 мыңнан астам кинодеректі, 200 мыңға жуық фото, 18 мыңнан астам дыбыс жазбасы',10],['Олжа','«Архив-2025» аясында Ысқақ Уәлиевтің «Естек» күйі табылды',11]]},
 {n:'ҚР Президентінің архиві',c:'Алматы',la:43.24,lo:76.89,dx:-.6,dy:4.4,y0:'1994',y1:'Бүгін',img:null,
  b:[['Негізі','Қазақ КСР Компартиясы архивінің мұрагері, ең ескі құжаттар 1917 жылғы',13],['Құрылуы','1994 жылы 14 қаңтарда Президент Жарлығымен құрылды',12]],
  a:[['Қор','1,5 млн құжат сақталады',13],['Цифрландыру','25 млн бет электрондық форматқа көшірілді, бұған 10 жыл кетті',13],['Технология','10 сканерлеу станциясы жұмыс істейді',13],['Ашықтық','Бұрын құпия болған арнаулы қызмет құжаттары архивке берілді',13]]},
 {n:'ҚР Ұлттық архиві',c:'Астана',la:51.17,lo:71.45,dx:0,dy:0,y0:'2006',y1:'2026',img:'kz_nat',cap:'Nikolay Olkhovoy, CC BY 3.0',
  b:[['Құрылуы','2006 жылы Астанада құрылды: 2026 жылы 20 жасқа толды',16],['Бастауы','Кәдімгі құжат қоймасы ретінде жұмыс істеді',16]],
  a:[['Қор','404 950 сақтау бірлігі, 16 млн кадрлық сақтандыру қоры',14],['Цифрландыру','110 млн беттен астам құжат цифрландырылды',14],['Жаңалық','Елдегі алғашқы автономды электрондық оқу залы; «Мәңгі жадымызда» порталында 705 мыңнан астам майдангер',15],['Бүгін','Ғылыми әрі цифрлық орталыққа айналды, «Ұлттық» мәртебесі берілмек',16]]}];
const MEM=[[0,44.85,65.51,'Қызылорда'],[1,49.80,73.10,'Қарағанды'],[2,51.17,71.45,'Ақмола'],[3,53.21,63.62,'Қостанай'],[4,43.65,51.17,'Ақтау']];
let mode='a',cur=0,view='a';
const pins=$('#pins'),card=$('#kzcard'),mapEl=$('#kzmap2');
if(pins&&card){
 const draw=()=>{pins.innerHTML=mode==='a'?AR.map((r,i)=>`<button class="pin arc${i===cur?' on':''}" data-i="${i}" style="left:${X(r.lo)+r.dx}%;top:${Y(r.la)+r.dy}%;--d:${i*.15}s" aria-label="${esc(r.n)}"><i></i><span>${esc(r.n.replace('ҚР ',''))}</span></button>`).join('')
   :MEM.map(([t,la,lo,c],i)=>`<button class="pin mem" data-t="${t}" style="left:${X(lo)}%;top:${Y(la)}%;--d:${i*.12}s" aria-label="${esc(c)}"><i></i><span>${esc(c)}: ${esc(EJ.TH?.[t]?.k||'')}</span></button>`).join('');
  $('#kzline').setAttribute('d',mode==='a'?`M${X(76.89)} ${Y(43.24)} Q ${X(75)} ${Y(49)} ${X(71.45)} ${Y(51.17)}`:'M'+MEM.map(m=>`${X(m[2])} ${Y(m[1])}`).join(' L'))};
 const facts=(list)=>`<ul class="cmp">${list.map(([k,v,s],i)=>`<li style="--i:${i}"><b>${esc(k)}</b><span>${esc(v)}${s?src(s):''}</span></li>`).join('')}</ul>`;
 const render=(fromPin)=>{const r=AR[cur];
  card.innerHTML=`<div class="kzph">${r.img?`<img src="${r.img}.jpg" alt="${esc(r.n)}"><small>${esc(r.cap)}</small>`:`<svg viewBox="-60 -60 120 120" class="emb"><circle r="50"/><circle r="40"/><path d="M-40 0A40 40 0 0 1 40 0M0-40A40 40 0 0 1 0 40M-28-28A40 40 0 0 1 28 28M28-28A40 40 0 0 1-28 28"/><text y="6">${esc(r.y0)}</text></svg>`}</div>
   <p class="kzc">${esc(r.c)}</p><h3>${esc(r.n)}</h3>
   <div class="bn" role="tablist"><button class="${view==='b'?'on':''}" data-v="b">Бұрын · ${esc(r.y0)}</button><button class="${view==='a'?'on':''}" data-v="a">Қазір · ${esc(r.y1)}</button><i class="bnind ${view}"></i></div>
   <div class="cmpw ${view}">${facts(view==='b'?r.b:r.a)}</div>
   <div class="kznav"><button class="btn" data-go="-1" aria-label="Алдыңғы архив">‹</button><span>${cur+1} / ${AR.length}</span><button class="btn" data-go="1" aria-label="Келесі архив">›</button></div>`;
  card.classList.remove('reveal');void card.offsetWidth;card.classList.add('reveal');
  if(fromPin){const pr=fromPin.getBoundingClientRect(),cr=card.getBoundingClientRect();card.style.setProperty('--rx',(pr.left+pr.width/2-cr.left)+'px');card.style.setProperty('--ry',(pr.top+pr.height/2-cr.top)+'px')}else{card.style.setProperty('--rx','50%');card.style.setProperty('--ry','30%')}};
 const swap=v=>{if(v===view)return;view=v;const w=card.querySelector('.cmpw'),ind=card.querySelector('.bnind');card.querySelectorAll('.bn button').forEach(b=>b.classList.toggle('on',b.dataset.v===v));ind.className='bnind '+v;
  w.classList.add('flip-out');setTimeout(()=>{w.innerHTML=facts(v==='b'?AR[cur].b:AR[cur].a);w.className='cmpw '+v+' flip-in'},380)};
 pins.addEventListener('click',e=>{const p=e.target.closest('.pin');if(!p)return;
  if(p.classList.contains('arc')){cur=+p.dataset.i;view='a';$$('.pin.arc').forEach(x=>x.classList.toggle('on',x===p));render(p)}
  else{const t=+p.dataset.t;EJ.load?.(t);EJ.transit?EJ.transit('#portal',()=>setTimeout(()=>EJ.start?.(),400),{x:e.clientX,y:e.clientY}):EJ.go?.('#portal')}});
 card.addEventListener('click',e=>{const b=e.target.closest('[data-v]');if(b)return swap(b.dataset.v);const g=e.target.closest('[data-go]');if(g){cur=(cur+ +g.dataset.go+AR.length)%AR.length;view='a';draw();render()}});
 $$('.kzm').forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.m;$$('.kzm').forEach(x=>x.classList.toggle('on',x===b));mapEl.classList.remove('drop');void mapEl.offsetWidth;mapEl.classList.add('drop');draw()}));
 new IntersectionObserver(es=>{if(es[0].isIntersecting){mapEl.classList.add('drop','live')}},{threshold:.3}).observe(mapEl);
 /* map tilt */
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches){mapEl.addEventListener('pointermove',e=>{const r=mapEl.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;mapEl.style.transform=`perspective(1400px) rotateX(${12-y*10}deg) rotateY(${x*12}deg)`});mapEl.addEventListener('pointerleave',()=>mapEl.style.transform='')}
 draw();render();
}
}
