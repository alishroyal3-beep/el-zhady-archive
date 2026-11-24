/* modern tech features: Web Audio synth + analyser, speech synthesis, city map, SHA-256 fixity, photo restoration, QR, command palette */
{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const EJ=window.EJ||{};

/* ---------- 1. audio engine: plucked dombra (Karplus-Strong) + analyser ---------- */
let ac=null,an=null,master=null,seqT=null,raf=0,voice=null;
const NOTES=[146.83,164.81,196,220,246.94,293.66,329.63,392];
const pluck=(f,t,g=.32)=>{const sr=ac.sampleRate,len=Math.floor(sr*1.6),buf=ac.createBuffer(1,len,sr),d=buf.getChannelData(0),N=Math.round(sr/f);
  for(let i=0;i<N;i++)d[i]=Math.random()*2-1;for(let i=N;i<len;i++)d[i]=(d[i-N]+d[i-N+1])*.4985;
  const s=ac.createBufferSource(),v=ac.createGain();s.buffer=buf;v.gain.value=g;s.connect(v);v.connect(master);s.start(t)};
const ensure=()=>{if(ac)return true;const A=window.AudioContext||window.webkitAudioContext;if(!A)return false;
  ac=new A();master=ac.createGain();master.gain.value=.55;an=ac.createAnalyser();an.fftSize=256;master.connect(an);an.connect(ac.destination);return true};
const bars=$$('#wave i'),fd=new Uint8Array(128);
const viz=()=>{raf=0;if(!an)return;an.getByteFrequencyData(fd);bars.forEach((b,i)=>{const v=fd[Math.floor(i/bars.length*90)]/255;b.style.transform=`scaleY(${.25+v*1.1})`});if(seqT)raf=requestAnimationFrame(viz)};
const pickVoice=()=>{const vs=speechSynthesis?.getVoices?.()||[];voice=vs.find(v=>/^kk/i.test(v.lang))||vs.find(v=>/^ru/i.test(v.lang))||null};
if('speechSynthesis'in window){pickVoice();speechSynthesis.onvoiceschanged=pickVoice}
window.EJA={
 start(){if(!ensure())return;ac.resume?.();if(seqT)return;let step=0;const beat=reduce?.5:.3;
  const tick=()=>{const t=ac.currentTime+.05;const n=NOTES[[0,2,4,3,2,0,5,4][step%8]+(step%16>7?1:0)]||NOTES[0];pluck(n,t,.28);if(step%4===0)pluck(NOTES[0]/2,t,.22);if(step%8===6)pluck(n*1.5,t+beat/2,.15);step++};
  tick();seqT=setInterval(tick,beat*1000);if(!raf)raf=requestAnimationFrame(viz)},
 stop(){clearInterval(seqT);seqT=null;try{speechSynthesis.cancel()}catch(e){}bars.forEach(b=>b.style.transform='')},
 say(text){if(!('speechSynthesis'in window))return;try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);if(voice){u.voice=voice;u.lang=voice.lang}else u.lang='kk-KZ';u.rate=.95;
  if(master){master.gain.setTargetAtTime(.25,ac.currentTime,.2);u.onend=()=>master&&master.gain.setTargetAtTime(.55,ac.currentTime,.4)}speechSynthesis.speak(u)}catch(e){}},
 loaded(i){qr();fixInit(i)}};

/* ---------- 2. memory map ---------- */
const LB={'Қарағанды':[0,20],'Шымкент':[0,20],'Өскемен':[18,16],'Семей':[-4,-12],'Түркістан':[-26,-6],'Астана':[-18,-12],'Павлодар':[8,-12]};
const CITY=[['Астана',51.17,71.45,2],['Алматы',43.24,76.89,-1,'Желтоқсан 1986'],['Қарағанды',49.80,73.10,1],['Қостанай',53.21,63.62,3],['Қызылорда',44.85,65.51,0],['Ақтау',43.65,51.17,4],['Атырау',47.11,51.88,-1,'Каспий балықшылары'],['Семей',50.41,80.25,-1,'Семей полигоны'],['Шымкент',42.32,69.59,-1,'Оңтүстік қолөнері'],['Өскемен',49.95,82.61,-1,'Алтай кеншілері'],['Ақтөбе',50.28,57.17,-1,'Темір жол тарихы'],['Павлодар',52.29,76.97,-1,'Ертіс өңірі'],['Түркістан',43.30,68.27,-1,'Қожа Ахмет Ясауи өңірі']];
const map=$('#kzmap');
if(map){const X=lo=>20+(lo-46)/(88-46)*560,Y=la=>20+(55.6-la)/(55.6-40.4)*300;
  let g='';for(let lo=46;lo<=88;lo+=1.5)for(let la=40.6;la<=55.6;la+=1)g+=`<circle cx="${X(lo).toFixed(1)}" cy="${Y(la).toFixed(1)}" r=".9" class="gd"/>`;
  const pts=CITY.map(c=>[X(c[2]),Y(c[1])]);let ln='';
  pts.forEach((p,i)=>pts.forEach((q,j)=>{if(j>i&&Math.hypot(p[0]-q[0],p[1]-q[1])<120)ln+=`<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" style="--d:${(i+j)*.12}s"/>`}));
  map.innerHTML=`<g class="grid">${g}</g><g class="lines">${ln}</g>`+CITY.map((c,i)=>{const[x,y]=pts[i];return `<g class="city${c[3]>=0?' has':''}" data-i="${i}" tabindex="0" role="button" aria-label="${esc(c[0])}"><circle class="halo" cx="${x}" cy="${y}" r="14"/><circle class="dot" cx="${x}" cy="${y}" r="${c[3]>=0?6:4}"/><text x="${x+(LB[c[0]]?.[0]||0)}" y="${y+(LB[c[0]]?.[1]??-12)}">${esc(c[0])}</text></g>`}).join('');
  const act=g=>{const c=CITY[+g.dataset.i];$$('#kzmap .city').forEach(x=>x.classList.toggle('on',x===g));
    if(c[3]>=0){const t=EJ.TH[c[3]];$('#mapinfo').innerHTML=`<b>${esc(c[0])}</b>: ${esc(t.k)}, ${esc(t.n)}. <button class="lnk" id="mapgo">Тыңдау</button>`;$('#mapgo').onclick=()=>{EJ.load(c[3]);EJ.go('#portal');setTimeout(()=>EJ.start(),500)}}
    else $('#mapinfo').innerHTML=`<b>${esc(c[0])}</b>: «${esc(c[4])}» жобасы жоспарда.`};
  map.addEventListener('click',e=>{const g=e.target.closest('.city');if(g)act(g)});
  map.addEventListener('keydown',e=>{const g=e.target.closest('.city');if(g&&(e.key==='Enter'||e.key===' ')){e.preventDefault();act(g)}})}

/* ---------- 3. SHA-256 fixity ---------- */
let orig='',fxi=0;
const hex=async s=>{const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')};
const fxt=$('#fxt'),fxh=$('#fxh'),fxs=$('#fxs');
const fxUpd=async()=>{if(!crypto?.subtle){fxh.textContent='Бұл браузерде SubtleCrypto жоқ';return}const h=await hex(fxt.value);fxh.innerHTML=h.match(/.{1,8}/g).map((c,i)=>`<span class="${orig&&orig.slice(i*8,i*8+8)!==c?'chg':''}">${c}</span>`).join(' ');
  const ok=h===orig;fxs.textContent=ok?'Түпнұсқа: өзгермеген':'Ескерту: мәтін өзгертілген';fxs.className='fxs '+(ok?'ok':'bad')};
const fixInit=async i=>{if(!fxt||!EJ.TH)return;fxi=i??0;fxt.value=EJ.TH[i??0].l.join(' ');if(crypto?.subtle)orig=await hex(fxt.value);fxUpd()};
if(fxt){fxt.addEventListener('input',fxUpd);$('#fxr').onclick=()=>fixInit(fxi);fixInit(0)}

/* ---------- 4. before/after restoration ---------- */
const bac=$('#bac'),bar=$('#bar');
if(bac){const img=new Image();img.src='karlag.jpg';let old=null;
  const draw=()=>{if(!img.complete||!img.naturalWidth)return;const w=bac.clientWidth,h=bac.clientHeight,dpr=Math.min(devicePixelRatio||1,2);bac.width=w*dpr;bac.height=h*dpr;const c=bac.getContext('2d');c.setTransform(dpr,0,0,dpr,0,0);
    const s=Math.max(w/img.naturalWidth,h/img.naturalHeight),iw=img.naturalWidth*s,ih=img.naturalHeight*s,ox=(w-iw)/2,oy=(h-ih)/2;
    c.drawImage(img,ox,oy,iw,ih);
    if(!old||old.width!==bac.width){old=document.createElement('canvas');old.width=bac.width;old.height=bac.height;const o=old.getContext('2d');o.setTransform(dpr,0,0,dpr,0,0);o.filter='sepia(.9) contrast(.75) brightness(.9) blur(1.2px)';o.drawImage(img,ox,oy,iw,ih);o.filter='none';
      let sd=3;const r=()=>(sd=(sd*16807)%2147483647)/2147483647;for(let i=0;i<w*h/40;i++){o.fillStyle=`rgba(${r()<.5?20:240},${r()<.5?15:230},10,${r()*.35})`;o.fillRect(r()*w,r()*h,1.5,1.5)}
      o.strokeStyle='rgba(250,240,220,.5)';for(let i=0;i<9;i++){o.lineWidth=.5+r();o.beginPath();const x=r()*w;o.moveTo(x,0);o.bezierCurveTo(x+r()*20-10,h*.3,x+r()*30-15,h*.7,x+r()*20-10,h);o.stroke()}
      const v=o.createRadialGradient(w/2,h/2,h*.2,w/2,h/2,w*.75);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(40,20,5,.65)');o.fillStyle=v;o.fillRect(0,0,w,h)}
    const k=bar.value/100;c.save();c.beginPath();c.rect(0,0,w*k,h);c.clip();c.setTransform(1,0,0,1,0,0);c.drawImage(old,0,0);c.restore();c.setTransform(dpr,0,0,dpr,0,0);
    c.fillStyle='#e8cd7a';c.fillRect(w*k-1,0,2,h);c.beginPath();c.arc(w*k,h/2,16,0,7);c.fill();c.fillStyle='#17213f';c.font='700 14px Onest';c.textAlign='center';c.fillText('‹ ›',w*k,h/2+5)};
  img.onload=draw;bar.addEventListener('input',draw);new ResizeObserver(()=>{old=null;draw()}).observe(bac);
  let swept=false;new IntersectionObserver(es=>{if(es[0].isIntersecting&&!swept&&!reduce){swept=true;let t=0;const an=()=>{t+=.02;bar.value=50+Math.sin(t*3)*40*(1-t);draw();if(t<1)requestAnimationFrame(an);else{bar.value=50;draw()}};requestAnimationFrame(an)}},{threshold:.5}).observe(bac)}

/* ---------- 5. QR citation ---------- */
const qr=()=>{const box=$('#qr');if(!box)return;const txt=EJ.cite?EJ.cite():'«Ел жады» архиві';$('#qrt').textContent=txt;box.innerHTML='';
  if(window.QRCode){try{new QRCode(box,{text:'https://alishroyal3-beep.github.io/el-zhady-archive/#portal',width:168,height:168,colorDark:'#17213f',colorLight:'#fffdf8',correctLevel:QRCode.CorrectLevel.M})}catch(e){box.textContent='QR жасалмады'}}else box.textContent='QR кітапханасы жүктелмеді'};
qr();

/* ---------- 6. command palette (Ctrl/Cmd+K or /) ---------- */
const pal=$('#pal'),pq=$('#palq'),pl=$('#pall');
const ITEMS=[...[['#sg','Сингапур тәжірибесі'],['#portal','Портал: тақырыптар мен тыңдау'],['#lab','Технологиялар зертханасы'],['#kz','Қазақстан архивтері: бұрын және қазір'],['#arch','3D архив ғимараты'],['#gallery','Фотолар'],['#src','Дереккөздер']].map(([h,t])=>({t,g:'Бөлім',f:()=>EJ.go(h)})),
 ...(EJ.TH||[]).map((t,i)=>({t:t.k+': '+t.n,g:'Сұхбат',f:()=>{EJ.load(i);EJ.go('#portal');setTimeout(()=>EJ.start(),500)}})),
 ...(EJ.S||[]).map(s=>({t:s[0],g:'Дереккөз',f:()=>{const a=document.createElement('a');a.href=s[2];a.target='_blank';a.rel='noopener';document.body.appendChild(a);a.click();a.remove()}})),
 {t:'Таймерді қосу немесе тоқтату',g:'Әрекет',f:()=>EJ.timer()},{t:'Презентация режимі',g:'Әрекет',f:()=>EJ.pres?.()},{t:'3D экскурсия',g:'Әрекет',f:()=>EJ.tour?.()},{t:'Рентген режимі (3D)',g:'Әрекет',f:()=>{EJ.go('#arch');setTimeout(()=>window.ARCH?.xray(),900)}},{t:'Түнгі жарық (3D)',g:'Әрекет',f:()=>{EJ.go('#arch');setTimeout(()=>window.ARCH?.night(),900)}},{t:'Қабаттарды ашу (3D)',g:'Әрекет',f:()=>{EJ.go('#arch');$('#aExp')?.click()}}];
let sel=0,list=[];
const rp=()=>{const q=pq.value.trim().toLowerCase();list=ITEMS.filter(x=>!q||(x.t+' '+x.g).toLowerCase().includes(q));sel=Math.min(sel,Math.max(0,list.length-1));
  pl.innerHTML=list.length?list.map((x,i)=>`<li class="${i===sel?'on':''}" data-i="${i}"><span>${esc(x.t)}</span><em>${esc(x.g)}</em></li>`).join(''):'<li class="none">Ештеңе табылмады</li>'};
const openP=()=>{pal.hidden=false;requestAnimationFrame(()=>pal.classList.add('show'));pq.value='';sel=0;rp();pq.focus()};
const closeP=()=>{pal.classList.remove('show');setTimeout(()=>pal.hidden=true,250)};
const run=i=>{const x=list[i];if(!x)return;closeP();setTimeout(x.f,120)};
$('#kopen')?.addEventListener('click',openP);
addEventListener('keydown',e=>{if((e.key==='k'||e.key==='K'||e.key==='л'||e.key==='Л')&&(e.ctrlKey||e.metaKey)){e.preventDefault();pal.hidden?openP():closeP()}
  else if(e.key==='/'&&pal.hidden&&!e.target.closest('input,textarea')){e.preventDefault();openP()}
  else if(!pal.hidden){if(e.key==='Escape')closeP();if(e.key==='ArrowDown'){e.preventDefault();sel=Math.min(list.length-1,sel+1);rp()}if(e.key==='ArrowUp'){e.preventDefault();sel=Math.max(0,sel-1);rp()}if(e.key==='Enter'){e.preventDefault();run(sel)}}});
pq.addEventListener('input',()=>{sel=0;rp()});
pl.addEventListener('click',e=>{const li=e.target.closest('li[data-i]');if(li)run(+li.dataset.i)});
pal.addEventListener('click',e=>{if(e.target===pal)closeP()});
}
