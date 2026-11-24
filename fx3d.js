/* 3D effects: mosaic tile transitions, timeline 3D carousel, coverflow gallery, hero parallax, presentation mode */
{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const EJ=window.EJ||(window.EJ={});

/* ---------- 1. shanyrak iris transition ---------- */
const iris=$('#iris');
{const g=iris.querySelector('.uyk');let p='';for(let k=0;k<24;k++){const a=k/24*Math.PI*2;p+=`<line x1="${(Math.cos(a)*46).toFixed(1)}" y1="${(Math.sin(a)*46).toFixed(1)}" x2="${(Math.cos(a)*58).toFixed(1)}" y2="${(Math.sin(a)*58).toFixed(1)}"/>`}g.innerHTML=p}
let busy=false;
const label=sec=>sec?.querySelector('h2,h1')?.textContent?.trim()||'';
const transit=(target,after,pt)=>{const sec=typeof target==='string'?$(target):target;if(!sec)return;
  if(reduce||busy){sec.scrollIntoView();after?.();return}
  busy=true;iris.style.setProperty('--x',(pt?.x??innerWidth/2)+'px');iris.style.setProperty('--y',(pt?.y??innerHeight/2)+'px');
  $('#irisT').textContent=label(sec);iris.className='show in';
  setTimeout(()=>{const y=sec.getBoundingClientRect().top+scrollY-60;scrollTo({top:Math.max(0,y),behavior:'instant'});after?.();
    iris.style.setProperty('--x',innerWidth/2+'px');iris.style.setProperty('--y',innerHeight/2+'px');
    setTimeout(()=>{iris.className='show out';setTimeout(()=>{iris.className='';busy=false},800)},380)},760)};
EJ.go=sel=>transit(sel);EJ.transit=transit;
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a||a.classList.contains('src'))return;const t=$(a.getAttribute('href'));if(!t)return;e.preventDefault();transit(t,null,{x:e.clientX,y:e.clientY})});

/* ---------- 2. timeline -> 3D carousel ---------- */
const tl=$('.tline');
if(tl){const box=document.createElement('div');box.className='car3d';tl.before(box);box.appendChild(tl);tl.classList.add('ring');
  const items=[...tl.children],N=items.length,step=360/N;let ang=0,auto=!reduce,drag=null;
  const nav=document.createElement('div');nav.className='carnav';nav.innerHTML='<button class="btn" aria-label="Алдыңғы">‹</button><button class="btn" aria-label="Келесі">›</button>';box.after(nav);
  const R=()=>Math.max(220,Math.min(380,box.clientWidth*.32));
  const lay=()=>{const r=R();items.forEach((li,i)=>{li.style.transform=`rotateY(${i*step}deg) translateZ(${r}px)`});tl.style.transform=`translateZ(${-r}px) rotateY(${ang}deg)`;
    const front=((Math.round(-ang/step)%N)+N)%N;items.forEach((li,i)=>li.classList.toggle('front',i===front))};
  const go=d=>{ang-=d*step;lay()};
  nav.children[0].onclick=()=>{auto=false;go(-1)};nav.children[1].onclick=()=>{auto=false;go(1)};
  box.addEventListener('pointerdown',e=>{drag={x:e.clientX,a:ang};box.setPointerCapture(e.pointerId);tl.style.transition='none';auto=false});
  box.addEventListener('pointermove',e=>{if(!drag)return;ang=drag.a+(e.clientX-drag.x)*.3;lay()});
  box.addEventListener('pointerup',()=>{if(!drag)return;drag=null;tl.style.transition='';ang=Math.round(ang/step)*step;lay()});
  items.forEach((li,i)=>li.addEventListener('click',()=>{auto=false;ang=-i*step;lay()}));
  setInterval(()=>{if(auto&&!document.hidden)go(1)},3500);
  new ResizeObserver(lay).observe(box);lay()}

/* ---------- 3. gallery -> 3D coverflow ---------- */
const gal=$('#gal');
if(gal){gal.classList.add('cf');const figs=[...gal.children];let cur=0,auto=!reduce,drag=null;
  const lay=()=>{const w=gal.clientWidth,sp=Math.min(230,w*.26);figs.forEach((f,i)=>{const o=i-cur,a=Math.abs(o);
    f.style.transform=`translateX(${o*sp}px) translateZ(${-a*170}px) rotateY(${Math.max(-55,Math.min(55,-o*38))}deg) scale(${o?1:1.08})`;
    f.style.zIndex=50-a;f.style.opacity=a>3?0:1-a*.18;f.classList.toggle('cur',!o)})};
  const go=d=>{cur=(cur+d+figs.length)%figs.length;lay()};
  const prev=$('#gprev'),next=$('#gnext');prev.onclick=()=>{auto=false;go(-1)};next.onclick=()=>{auto=false;go(1)};
  gal.onkeydown=e=>{if(e.key==='ArrowRight'){e.preventDefault();e.stopPropagation();auto=false;go(1)}if(e.key==='ArrowLeft'){e.preventDefault();e.stopPropagation();auto=false;go(-1)}};
  figs.forEach((f,i)=>f.addEventListener('click',e=>{if(e.target.closest('a'))return;auto=false;cur=i;lay()}));
  gal.addEventListener('pointerdown',e=>{if(e.target.closest('a'))return;drag=e.clientX});
  addEventListener('pointerup',e=>{if(drag==null)return;const dx=e.clientX-drag;drag=null;if(Math.abs(dx)>40){auto=false;go(dx<0?1:-1)}});
  let vis=false;new IntersectionObserver(es=>vis=es[0].isIntersecting).observe(gal);
  setInterval(()=>{if(auto&&vis&&!document.hidden)go(1)},4000);
  new ResizeObserver(lay).observe(gal);lay()}

/* ---------- 4. hero 3D parallax ---------- */
const hero=$('#hero'),ph=$('.photo-hero'),img=$('.arch-img img');
if(hero&&ph&&!reduce){hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  ph.style.transform=`perspective(1000px) rotateY(${x*18}deg) rotateX(${-y*12}deg) translateZ(20px)`;if(img)img.style.translate=`${-x*24}px ${-y*18}px`;
  const h1=$('#hero h1');if(h1)h1.style.transform=`translate3d(${x*-14}px,${y*-10}px,0)`});
  hero.addEventListener('pointerleave',()=>{ph.style.transform='';if(img)img.style.translate='';const h1=$('#hero h1');if(h1)h1.style.transform=''})}

/* ---------- 5. presentation mode ---------- */
const order=['hero','sg','portal','kz','lab','arch','gallery','src'].map(id=>document.getElementById(id)).filter(Boolean);
let pres=false,pi=0;
const curIdx=()=>{let k=0;order.forEach((s,i)=>{if(s.getBoundingClientRect().top<innerHeight*.45)k=i});return k};
const upd=()=>{$('#presn').textContent=`${pi+1} / ${order.length} · ${label(order[pi])}`};
const presGo=d=>{pi=Math.max(0,Math.min(order.length-1,curIdx()+d));transit(order[pi],upd)};
const presOn=()=>{pres=true;document.body.classList.add('pres');$('#presbar').hidden=false;pi=curIdx();upd();try{document.documentElement.requestFullscreen?.().catch(()=>{})}catch(e){}};
const presOff=()=>{pres=false;document.body.classList.remove('pres');$('#presbar').hidden=true;try{document.fullscreenElement&&document.exitFullscreen()}catch(e){}};
$('#presb')?.addEventListener('click',()=>pres?presOff():presOn());
$('#presx')?.addEventListener('click',presOff);
addEventListener('keydown',e=>{if(e.target.closest('input,textarea,select'))return;if(!$('#pal')?.hidden)return;
  if(pres&&(e.key==='ArrowRight'||e.key==='PageDown'||e.key===' ')){e.preventDefault();presGo(1)}
  else if(pres&&(e.key==='ArrowLeft'||e.key==='PageUp')){e.preventDefault();presGo(-1)}
  else if(pres&&e.key==='Escape')presOff()
  else if(!pres&&(e.key==='PageDown'||e.key==='PageUp')){e.preventDefault();presGo(e.key==='PageDown'?1:-1)}});
document.addEventListener('fullscreenchange',()=>{if(!document.fullscreenElement&&pres)presOff()});
EJ.pres=()=>pres?presOff():presOn();EJ.tour=()=>{transit('#arch',()=>setTimeout(()=>window.ARCH?.tour(),900))};
}
