{
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let store=null;try{store=localStorage}catch(e){}

/* sources */
const S=[
 ['Oral History Centre (Singapore): мекеме тарихы','National Archives of Singapore','https://www.nas.gov.sg/archivesonline/government_records/agency-details/97'],
 ['Oral History Interviews: FAQ','National Archives of Singapore','https://www.nas.gov.sg/archivesonline/oral_history_interviews/faq'],
 ['Inside OHC: Who We Are','National Archives of Singapore','https://nas.gov.sg/archivesonline/insideohc_whoweare'],
 ['Oral History Centre: About Us','National Archives of Singapore','https://www.nas.gov.sg/archivesonline/oral_history_interviews/about-us'],
 ['Voices That Remain','BiblioAsia, 2017','https://biblioasia.nlb.gov.sg/vol-13/issue-1/apr-jun-2017/voices-that-remain/'],
 ['An Intimate Record Of History','Challenge, PSD','https://psdchallenge.psd.gov.sg/ideas/feature/an-intimate-record-of-history'],
 ['Singapore’s Oral History Project','Oral History Queensland','https://ohq.org.au/?p=526'],
 ['1921: Қазақстандағы алғашқы мемлекеттік архив','e-history.kz','https://e-history.kz/en/calendar/show/27402'],
 ['Орталық мемлекеттік архивтің 100 жылдығы','Әл-Фараби атындағы ҚазҰУ','https://farabi.university/news/26998?lang=en'],
 ['Кино-фотоқұжаттар мен дыбыс жазбалары архивінің қоры','Казахстанская правда','https://kazpravda.kz/n/svyshe-30-tys-unikalnyh-kinodokumentov-pochti-200-tys-fotografiy-i-bolee-18-tys-zvukozapisey-hranitsya-v-fonde-tsentralnogo-gosudarstvennogo-arhiva-kinofotodokumentov-i-zvukozapisi/'],
 ['Ресей архивінен табылған «Естек» күйі','24.kz','https://24.kz/ru/news/culture/731292-v-rossijskom-arkhive-najden-redkij-narodnyj-kyuj'],
 ['Президент архивін құру туралы Жарлық, 1994','zakon.uchet.kz','https://zakon.uchet.kz/rus/docs/U940001502_'],
 ['Президент архивінде 25 млн бет цифрландырылды','24.kz','https://24.kz/ru/news/culture/677669-25-mln-stranits-istoricheskikh-dokumentov-otsifrovali-v-arkhive-prezidenta'],
 ['Ұлттық архив 110 млн беттен астам құжатты цифрландырды','Kazinform','https://www.inform.kz/ru/natsionalniy-arhiv-kazahstana-otsifroval-svishe-110-millionov-stranits-10c7bf6e'],
 ['Ұлттық архивтің 20 жылдығы','Azattyq Rýhy','https://rus.azattyq-ruhy.kz/culture/112241-110-mln-stranits-otsifrovano-natsionalnyi-arkhiv-kazakhstana-otmechaet-20-letie'],
 ['Президент Ұлттық архивті 20 жылдығымен құттықтады','24.kz','https://24.kz/ru/news/social/784049-prezident-pozdravil-s-20-letiem-obrazovaniya-natsionalnogo-arkhiva'],
 ['Қазақстанда жаңа архивтер салынуда','ҚР Мәдениет және ақпарат министрлігі','https://www.gov.kz/memleket/entities/mam/press/news/details/1128697?lang=ru']];
$('#slist').innerHTML=S.map(s=>`<li><a href="${s[2]}" target="_blank" rel="noopener">${esc(s[0])}</a> · ${esc(s[1])}</li>`).join('');
$$('a.src[data-s]').forEach(a=>{const s=S[+a.dataset.s-1];if(!s)return;a.href=s[2];a.target='_blank';a.rel='noopener';a.textContent=a.dataset.s;a.title=s[0]});

/* photos */
const C='https://commons.wikimedia.org/wiki/File:';
const P=[
 ['nas','Сингапур Ұлттық архиві','Choo Yut Shing','CC BY 2.0','National_Archives_of_Singapore_(2).jpg'],
 ['skyline','Қазіргі Сингапур','Basile Morin','CC BY-SA 4.0','Skylines_of_the_Central_Business_District,_Singapore_at_dusk.jpg'],
 ['tape','Магнитофон таспасы','touhotus','CC BY 2.0','Revox_B77_reel-to-reel_audio_tape_recorder,_ca._1977_(cropped_and_edited).jpg',1],
 ['dombra','Домбыра, Алматы','Fotografka123','CC0','Dombra._Museum_of_musical_instruments,_Almaty.jpg',1],
 ['karlag','Қарлаг мұражайы','Yakov Fedorov','CC BY-SA 4.0','Dolinka_Museum_3.JPG'],
 ['alzhir','АЛЖИР мемориалы','Ninaras','CC BY 4.0','Gulag_ALZHIR_in_Astana,_Kazakhstan,_Monument_to_the_victims_03.jpg'],
 ['steppe','Қазақ даласы','Astrobond','CC BY-SA 4.0','Edrey_Mountains,_Karaganda_region,_Kazakhstan._May_2025_02.jpg'],
 ['kz_nat','ҚР Ұлттық архиві, Астана','Nikolay Olkhovoy','CC BY 3.0','Национальный_архив_Республики_Казахстан.jpg']];
$('#gal').innerHTML=P.map(p=>`<figure><div class="ph2"><img src="${p[0]}.jpg" alt="${esc(p[1])}" loading="lazy" class="${p[5]?'contain':''}"></div><figcaption><b>${esc(p[1])}</b><span class="cr">${esc(p[2])} · <a href="${C+p[4]}" target="_blank" rel="noopener">${esc(p[3])}</a></span></figcaption></figure>`).join('');
$('#plist').innerHTML=[...P,['kzmap','Қазақстанның рельеф картасы','NordNordWest және т.б.','CC BY-SA 3.0','Relief_Map_of_Kazakhstan.png'],['kz_alm','«Архив ғимараты», Алматы, Абай даңғылы','Aray21212121','CC BY-SA 4.0','Архив_ғимараты.jpg']].map(p=>`<li><a href="${C+p[4]}" target="_blank" rel="noopener">${esc(p[1])}</a> · ${esc(p[2])}, ${esc(p[3])}, Wikimedia Commons</li>`).join('');
const gal=$('#gal'),gstep=d=>gal.scrollBy({left:d*(gal.firstElementChild.offsetWidth+26),behavior:reduce?'auto':'smooth'});
$('#gprev').onclick=()=>gstep(-1);$('#gnext').onclick=()=>gstep(1);
gal.addEventListener('keydown',e=>{if(e.key==='ArrowRight')gstep(1);if(e.key==='ArrowLeft')gstep(-1)});

/* portal: themes + player */
const TH=[
 {k:'Жыраулар',i:'dombra',n:'Төлеген Әбдірахманұлы',m:'Қызылорда облысы · 1938 ж.т.',l:['Атам жыр айтқанда бүкіл ауыл жиналатын.','Әр жырдың өз тарихы, өз иесі болды.','Шежірені жатқа айту үлкен құрмет еді.']},
 {k:'Қуғын-сүргін',i:'karlag',n:'Мәрия Қасымқызы',m:'Қарағанды облысы · 1941 ж.т.',l:['Анам Долинкадағы жылдар туралы сирек айтатын.','Бір күні ол маған хаттарын көрсетті.','Сол хаттарды біз әлі күнге сақтаймыз.']},
 {k:'Мемориалдар',i:'alzhir',n:'Сәуле Ахметова',m:'Ақмола облысы · 1958 ж.т.',l:['Әжемнің атын ескерткіштен таптым.','Ол туралы құжат аз, бірақ естелік көп.','Енді оны балаларыма айтып беремін.']},
 {k:'Тың игеру',i:'steppe',n:'Бибігүл Сейітқызы',m:'Қостанай облысы · 1939 ж.т.',l:['1954 жылы ауылға алғаш жүк көліктері келді.','Жазға қарай алғашқы бидай егілді.','Бұл даланың тарихын адамдар жасады.']},
 {k:'Ескі таспалар',i:'tape',n:'Қуаныш Бекенов',m:'Маңғыстау облысы · 1947 ж.т.',l:['Әкемнің күйлері үйдегі таспада сақталған.','Таспа ескіріп, дыбысы әлсіреді.','Цифрландырылса, ұрпаққа жетеді.']}];
let cur=0,pos=0,tm=null;const DUR=60,BARS=80;
$('#themes').innerHTML=TH.map((t,i)=>`<button class="theme" data-i="${i}"><span class="ph"><img src="${t.i}.jpg" alt="" loading="lazy"></span><b>${esc(t.k)}</b></button>`).join('');
$('#wave').innerHTML=Array.from({length:BARS},(_,i)=>`<i style="height:${16+Math.abs(Math.sin(i*.42)*52+Math.sin(i*1.9)*20)}%"></i>`).join('');
const bars=$$('#wave i'),fmt=s=>Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0');
const T=()=>TH[cur].l.map((l,i)=>[i*20,l]);
let lastA=-1;const paint=()=>{bars.forEach((b,i)=>b.classList.toggle('p',i/BARS<pos/DUR));let a=-1;T().forEach(([t],i)=>{if(pos>=t&&pos>0)a=i});$$('#tr .tl').forEach((l,i)=>{l.classList.toggle('on',i===a);l.classList.toggle('done',i<a);l.style.setProperty('--k',i===a?Math.min(1,(pos-i*20)/20).toFixed(3):i<a?1:0)});if(a!==lastA){lastA=a;if(a>=0&&tm)window.EJA?.say(TH[cur].l[a])}};
const icon=p=>$('#pi').innerHTML=p?'<path d="M6 4h4v16H6zM14 4h4v16h-4z"/>':'<path d="M7 4v16l13-8z"/>';
const stop=()=>{clearInterval(tm);tm=null;icon(0);$('#play').classList.remove('playing');window.EJA?.stop()};
const start=()=>{if(tm)return;icon(1);$('#play').classList.add('playing');window.EJA?.start(cur);tm=setInterval(()=>{pos=Math.min(DUR,pos+.5);paint();if(pos>=DUR){stop();pos=0}},250)};
const load=i=>{cur=i;stop();pos=0;lastA=-1;const t=TH[i];$('#ptitle').textContent=t.n;$('#pmeta').textContent=t.k+' · '+t.m;
  $('#tr').innerHTML=T().map(([s,l])=>`<button class="tl" data-t="${s}"><code>${fmt(s)}</code><span>«${esc(l)}»</span></button>`).join('');
  $$('.theme').forEach((b,j)=>b.classList.toggle('sel',j===i));paint();window.EJA?.loaded?.(i)};
$('#themes').addEventListener('click',e=>{const b=e.target.closest('.theme');if(b){load(+b.dataset.i);start();paint()}});
$('#play').onclick=()=>{if(tm)stop();else{start();lastA=-1;paint()}};
$('#wave').addEventListener('click',e=>{const r=$('#wave').getBoundingClientRect();pos=Math.round((e.clientX-r.left)/r.width*DUR);paint();start()});
$('#tr').addEventListener('click',e=>{const l=e.target.closest('.tl');if(l){pos=+l.dataset.t;lastA=-1;start();paint()}});
load(0);
window.EJ={TH,load,start,stop,go:sel=>$(sel)?.scrollIntoView({behavior:reduce?'auto':'smooth'}),cite:()=>'«Ел жады» архиві, ЕЖ-'+String(210+cur).padStart(6,'0')+', 1-трек · '+TH[cur].n+', '+TH[cur].k,S,timer:()=>$('#tb').click()};

/* split headings into words */
$$('.split').forEach(h=>{let i=0;const walk=n=>[...n.childNodes].forEach(c=>{if(c.nodeType===3){const f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(t=>{if(!t)return;if(/^\s+$/.test(t))return f.appendChild(document.createTextNode(t));const s=document.createElement('span');s.className='w';s.style.setProperty('--i',i++);s.textContent=t;f.appendChild(s)});c.replaceWith(f)}else if(c.nodeType===1)walk(c)});walk(h)});

/* reveal, counters, nav */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
$$('.rv,.split,.tline').forEach(el=>io.observe(el));
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);const el=e.target,to=+el.dataset.to,yr=to===1979,from=yr?1900:0,st=performance.now(),f=v=>yr?String(v):v.toLocaleString('ru-RU');
  if(reduce)return el.textContent=f(to);const step=n=>{const k=Math.min((n-st)/1800,1);el.textContent=f(Math.round(from+(to-from)*(1-Math.pow(1-k,3))));if(k<1)requestAnimationFrame(step)};requestAnimationFrame(step)}),{threshold:.5});
$$('.cnt').forEach(el=>co.observe(el));
const links=$$('.links a'),secs=links.map(a=>$(a.getAttribute('href')));
addEventListener('scroll',()=>{const h=document.documentElement;$('#prog').style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';let c=-1;secs.forEach((s,i)=>{if(s&&s.getBoundingClientRect().top<innerHeight*.4)c=i});links.forEach((a,i)=>a.classList.toggle('on',i===c))},{passive:true});

/* buttons, flips, timer */
document.addEventListener('pointerdown',e=>{const b=e.target.closest('.btn');if(!b||reduce)return;const r=b.getBoundingClientRect(),s=Math.max(r.width,r.height),sp=document.createElement('span');sp.className='rip';sp.style.cssText=`width:${s}px;height:${s}px;left:${e.clientX-r.left-s/2}px;top:${e.clientY-r.top-s/2}px`;b.appendChild(sp);setTimeout(()=>sp.remove(),700)});
$$('.flip').forEach(f=>f.addEventListener('click',e=>{if(!e.target.closest('a'))f.classList.toggle('on')}));
let sec=0,ti=null;const show=()=>{$('#tt').textContent=fmt(sec);$('#timer').classList.toggle('over',sec>=420)};
$('#tb').onclick=()=>{if(ti){clearInterval(ti);ti=null;$('#tb').textContent='▶'}else{ti=setInterval(()=>{sec++;show()},1000);$('#tb').textContent='❚❚'}};
$('#trs').onclick=()=>{sec=0;show()};

/* hero 3D mosaic wave */
const fb=$('#fb');fb.innerHTML=Array.from({length:60},(_,i)=>`<i style="height:${30+Math.abs(Math.sin(i*.35))*60}%;animation-delay:${-i*.07}s"></i>`).join('');
const cv=$('#gl');
if(window.THREE&&cv){try{
  const r=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true});r.setPixelRatio(Math.min(devicePixelRatio,2));
  const sc=new THREE.Scene();sc.fog=new THREE.Fog(0x0b1736,13,28);
  const cam=new THREE.PerspectiveCamera(38,1,.1,100);cam.position.set(0,6.5,14);cam.lookAt(0,0,0);
  sc.add(new THREE.HemisphereLight(0xdfe8ff,0x13285c,.9));const dl=new THREE.DirectionalLight(0xffe2a8,.9);dl.position.set(-6,10,5);sc.add(dl);
  const CX=60,CZ=16,G=.42,n=CX*CZ,mesh=new THREE.InstancedMesh(new THREE.BoxGeometry(.36,1,.36),new THREE.MeshStandardMaterial({roughness:.4,metalness:.15}),n);sc.add(mesh);
  const dm=new THREE.Object3D(),col=new THREE.Color(),c0=new THREE.Color('#1d3d86'),c1=new THREE.Color('#3fa7b8'),c2=new THREE.Color('#e8cd7a'),c3=new THREE.Color('#f4f0e7');
  let mx=0,mz=0,tmx=0,tmz=0,en=0;
  addEventListener('pointermove',e=>{const b=cv.getBoundingClientRect();if(e.clientY<b.top-300||e.clientY>b.bottom)return;tmx=((e.clientX-b.left)/b.width-.5)*CX*G;tmz=Math.max(-3,Math.min(3,((e.clientY-b.top)/b.height-.5)*CZ*G));en=1});
  const size=()=>{const w=cv.clientWidth,h=cv.clientHeight;if(!w||!h)return;r.setSize(w,h,false);cam.aspect=w/h;cam.position.z=w<600?20:14;cam.updateProjectionMatrix();fb.style.display='none'};
  const ro=new ResizeObserver(size);ro.observe(cv);size();
  let vis=true,run=false;new IntersectionObserver(es=>{vis=es[0].isIntersecting;if(vis&&!run){run=true;requestAnimationFrame(frame)}}).observe(cv);
  function frame(t){if(!vis){run=false;return}t*=.001;mx+=(tmx-mx)*.08;mz+=(tmz-mz)*.08;en*=.985;let k=0;
    for(let i=0;i<CX;i++)for(let j=0;j<CZ;j++){const x=(i-CX/2)*G,z=(j-CZ/2)*G,dx=x-mx,dz=z-mz,d=Math.sqrt(dx*dx+dz*dz);
      const h=.2+.7*(Math.sin(x*.7+t*1.6)*.5+.5)*(Math.cos(z*.9-t*1.1)*.5+.5)+.95*Math.exp(-d*d*.08)*(1+Math.sin(d*2.2-t*6)*.5)*(.4+en);
      dm.position.set(x,h/2-1,z);dm.scale.set(1,Math.max(.08,h),1);dm.updateMatrix();mesh.setMatrixAt(k,dm.matrix);
      const m=Math.min(1,h/2.2);col.copy(c0).lerp(c1,Math.min(1,m*1.7));if(m>.55)col.lerp(c2,Math.min(1,(m-.55)*2.6));if(m>.85)col.lerp(c3,(m-.85)*3);mesh.setColorAt(k,col);k++}
    mesh.instanceMatrix.needsUpdate=true;if(mesh.instanceColor)mesh.instanceColor.needsUpdate=true;r.render(sc,cam);if(!reduce)requestAnimationFrame(frame);else run=false}
}catch(e){}}
}
