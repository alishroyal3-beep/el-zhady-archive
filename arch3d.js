/* 3D architecture model of the proposed "Ел жады" archive building */
{
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const SRC=['https://www.nas.gov.sg/archivesonline/government_records/agency-details/97','https://www.nas.gov.sg/archivesonline/oral_history_interviews/faq','https://nas.gov.sg/archivesonline/insideohc_whoweare','https://www.nas.gov.sg/archivesonline/oral_history_interviews/about-us','','https://psdchallenge.psd.gov.sg/ideas/feature/an-intimate-record-of-history','https://www.nas.gov.sg/archivesonline/ohyeah'];
const sa=n=>`<a class="src" href="${SRC[n-1]}" target="_blank" rel="noopener">${n}</a>`;
const Z=[
 {k:'Кіреберіс пен амфитеатр',lvl:'Сыртқы алаң',d:'Ашық алаң мен тас сатылы амфитеатр. Мұнда дыбыстық көрмелер, «Атамның дауысы» кештері, мектеп оқушыларына арналған сабақтар өтеді.',sg:'Сингапур орталығы ауызша тарихты семинарлар, көрмелер мен басылымдар арқылы насихаттайды'+sa(2)+'.'},
 {k:'Оқу залы',lvl:'Батыс қанат',d:'Зерттеушілер жабық немесе онлайн жарияланбаған жазбаларды тыңдайтын зал. Транскрипттер мен каталог осында.',sg:'Онлайн жоқ ашық жазбаларды Сингапур архивінің оқу залында тыңдауға болады'+sa(2)+'.'},
 {k:'Дыбыстық көрме залы',lvl:'Шығыс қанат',d:'Жыраулар, куәгерлер мен шеберлердің дауысы естілетін тұрақты экспозиция; құлаққап, интерактивті карталар.',sg:'Сингапур ауызша тарихты көрмелер мен басылымдар арқылы насихаттайды'+sa(2)+'.'},
 {k:'Сұхбат студиялары',lvl:'1-қабат',d:'Дыбыс оқшауланған жайлы жазба бөлмелері. Ауылдарға баратын мобильді студия да осы жерден басқарылады.',sg:'Сингапурда сұхбаттар арнайы жазба бөлмелерінде өтеді'+sa(6)+', маман жайлы жазба ортасын жасайды'+sa(3)+'.'},
 {k:'Цифрлық зертхана',lvl:'2-қабат',d:'Ескі таспаларды цифрландыру, қазақ тіліндегі сөйлеуді тану, транскрипцияны тексеру, метадерек беру.',sg:'Сингапур аудиосын әлі де цифрландырып келеді, уақыт белгілерін бағдарлама жасайды'+sa(2)+'.'},
 {k:'Шаңырақ: «Ел жады» порталы',lvl:'Күмбез',d:'Шаңырақ астындағы портал орталығы мен серверлер. Жарық шаңырақ арқылы барлық қабатқа түседі: ел жадының символы.',sg:'Archives Online іздеуі сегіз дерекқорды қамтиды, транскрипт мәтінін OCR арқылы іздейді'+sa(2)+'.'},
 {k:'Жерасты қоймасы',lvl:'−1 қабат',d:'Түпнұсқа жазбалар мен ескі таспалардың тұрақты температурадағы қоймасы, оффлайн сақтық көшірме.',sg:'Ұлттық архив мемлекеттік және жеке құжаттармен қатар ауызша тарихты сақтайды'+sa(1)+'.'}];
const info=$('#ainfo');let sel=-1;
const renderInfo=()=>{if(!info)return;
  const head=sel<0?`<span class="lvl">Тұжырымдама</span><h3>Шаңырақ пен жасыл бақ</h3><p>Қазақтың шаңырағы мен керегесі Сингапурдың жасыл қала идеясымен бір ғимаратта: дөңгелек корпус, шаңырақ күмбез, айналасында бақ. Екі қанатта оқу залы мен көрме, астында қойма. Сингапур орталығының барлық қызметі бір кешенге жиналған.</p>`
   :`<span class="lvl">${esc(Z[sel].lvl)}</span><h3>${esc(Z[sel].k)}</h3><p>${esc(Z[sel].d)}</p><div class="sg"><b>Сингапур тәжірибесі:</b> ${Z[sel].sg}</div>`;
  info.innerHTML=head+`<div class="legend">${Z.map((z,i)=>`<button data-i="${i}" class="${i===sel?'on':''}"><i>${i+1}</i>${esc(z.k)}</button>`).join('')}</div>`};
renderInfo();
const cv=$('#arch3d'),stage=$('#stage');
if(window.THREE&&cv&&stage){try{
 const T=THREE;
 const r=new T.WebGLRenderer({canvas:cv,antialias:true,alpha:true});r.setPixelRatio(Math.min(devicePixelRatio,2));
 r.shadowMap.enabled=true;r.toneMapping=T.ACESFilmicToneMapping;r.toneMappingExposure=.85;r.outputEncoding=T.sRGBEncoding;r.shadowMap.type=T.PCFSoftShadowMap;
 const sc=new T.Scene();sc.fog=new T.Fog(0x0b1736,30,60);
 const cam=new T.PerspectiveCamera(36,1,.1,200);
 const hemi=new T.HemisphereLight(0xf2f4ff,0x13285c,.55);sc.add(hemi);
 const sun=new T.DirectionalLight(0xffe0b0,1.25);sun.position.set(9,16,10);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);
 Object.assign(sun.shadow.camera,{left:-10,right:10,top:10,bottom:-10,near:1,far:40});sc.add(sun);
 const rim=new T.DirectionalLight(0xb0558f,.5);rim.position.set(-10,6,-8);sc.add(rim);
 const glows=[];[[0,1.4,0],[0,2.9,0],[0,4.2,0],[-6.1,1.2,.4],[6.1,1.2,.4]].forEach(p=>{const l=new T.PointLight(0xffc870,0,9,2);l.position.set(...p);sc.add(l);glows.push(l)});
 const M=(c,o={})=>new T.MeshStandardMaterial(Object.assign({color:c,roughness:.85,metalness:.05},o));
 const stone=M(0xefe9dc,{roughness:.6}),stone2=M(0xd9d1c0,{roughness:.6}),bronze=M(0xd9b44a,{metalness:.85,roughness:.28}),felt=M(0x24489c,{roughness:.55,metalness:.2,side:T.DoubleSide}),
  glass=M(0x7fd0dc,{transparent:true,opacity:.42,metalness:.3,roughness:.1}),dark=M(0x13285c),slab=M(0xf1ece0,{roughness:.5});
 const root=new T.Group();sc.add(root);
 const mesh=(g,m,p)=>{const o=new T.Mesh(g,m);o.castShadow=o.receiveShadow=true;if(p)o.position.set(...p);return o};
 /* plaza */
 const plaza=mesh(new T.CylinderGeometry(8.5,8.7,.3,72),M(0xe3dccb,{transparent:true,opacity:1,roughness:.7}),[0,-.15,0]);root.add(plaza);
 const pave=new T.Group();root.add(pave);
 for(let i=0;i<36;i++){const a=i/36*Math.PI*2,b=new T.Mesh(new T.BoxGeometry(.04,.02,3.6),M(0xc9a43a,{metalness:.6}));b.position.set(Math.cos(a)*6.4,.01,Math.sin(a)*6.4);b.rotation.y=-a+Math.PI/2;pave.add(b)}
 for(let s=0;s<4;s++)root.add(mesh(new T.CylinderGeometry(7.6-s*.5,7.6-s*.5,.16+s*.16,64,1,false,-0.9,1.8),stone2,[0,(.16+s*.16)/2,0]));
 /* vault */
 const vault=new T.Group();root.add(vault);
 vault.add(mesh(new T.CylinderGeometry(3.4,3.4,1.4,48),M(0x55606a,{transparent:true,opacity:.85}),[0,-.9,0]));
 for(let i=0;i<10;i++){const a=i/10*Math.PI*2;vault.add(mesh(new T.BoxGeometry(.5,1,1.2),dark,[Math.cos(a)*2.3,-.9,Math.sin(a)*2.3]))}
 /* plinth */
 root.add(mesh(new T.CylinderGeometry(4.7,4.9,.35,64),stone,[0,.17,0]));
 root.add(mesh(new T.CylinderGeometry(4.4,4.6,.3,64),stone2,[0,.5,0]));
 /* kerege lattice */
 const kerege=(R,y0,h,n)=>{const pts=[],sub=8,da=Math.PI*2/n*1.6;for(let i=0;i<n;i++){const a=i/n*Math.PI*2;
   for(const dir of[1,-1])for(let s=0;s<sub;s++){const t0=s/sub,t1=(s+1)/sub,a0=a+dir*da*t0,a1=a+dir*da*t1;pts.push(Math.cos(a0)*R,y0+h*t0,Math.sin(a0)*R,Math.cos(a1)*R,y0+h*t1,Math.sin(a1)*R)}}
   const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pts,3));return new T.LineSegments(g,new T.LineBasicMaterial({color:0xd9a952}))};
 const floor=(R,y,h,wallMat,lat)=>{const g=new T.Group();g.add(mesh(new T.CylinderGeometry(R,R,h,64,1,true),wallMat,[0,y+h/2,0]));
   if(lat)g.add(kerege(R+.03,y,h,48));g.add(mesh(new T.CylinderGeometry(R+.15,R+.15,.12,64),slab,[0,y+h,0]));
   const tr=mesh(new T.TorusGeometry(R+.15,.05,8,80),bronze,[0,y+h+.06,0]);tr.rotation.x=Math.PI/2;g.add(tr);return g};
 const L0=floor(4,.65,1.5,M(0x1d3d86,{side:T.DoubleSide}),true),L1=floor(3.75,2.27,1.2,glass,false),L2=floor(3.5,3.59,1.15,M(0x7a2e63,{side:T.DoubleSide}),true);
 for(let i=0;i<24;i++){const a=i/24*Math.PI*2;if(Math.abs(Math.atan2(Math.sin(a),Math.cos(a))-Math.PI/2)<.2)continue;const x=Math.cos(a)*4.5,z=Math.sin(a)*4.5;L0.add(mesh(new T.CylinderGeometry(.12,.15,1.36,12),stone,[x,1.33,z]));L0.add(mesh(new T.BoxGeometry(.38,.12,.38),stone2,[x,2.06,z]));L0.add(mesh(new T.BoxGeometry(.38,.1,.38),stone2,[x,.7,z]))}
 {const ent=mesh(new T.CylinderGeometry(4.75,4.75,.22,64,1,true),stone,[0,2.22,0]);ent.material=M(0xefe9dc,{side:T.DoubleSide,roughness:.6});L0.add(ent)}
 L1.add(kerege(3.78,2.27,1.2,30));
 [L0,L1,L2].forEach(g=>root.add(g));
 /* entrance portal */
 const portal=new T.Group();portal.add(mesh(new T.BoxGeometry(1.8,1.6,.6),dark,[0,1.45,4.05]));
 portal.add(mesh(new T.BoxGeometry(2.1,.18,.7),bronze,[0,2.3,4.05]));
 [-1,1].forEach(s=>portal.add(mesh(new T.BoxGeometry(.16,1.6,.7),bronze,[s*.98,1.45,4.05])));L0.add(portal);
 /* dome + shanyrak */
 const dome=new T.Group();dome.position.y=4.74;root.add(dome);
 const dg=new T.SphereGeometry(3.5,64,24,0,Math.PI*2,0,Math.PI/2);dg.scale(1,.62,1);
 const dm=mesh(dg,felt);dome.add(dm);
 for(let k=0;k<28;k++){const a=k/28*Math.PI*2,pts=[];for(let t=0;t<=12;t++){const th=t/12*1.32;pts.push(new T.Vector3(Math.cos(a)*Math.cos(th)*3.53,Math.sin(th)*3.5*.62+.02,Math.sin(a)*Math.cos(th)*3.53))}
   dome.add(mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts),24,.035,5),bronze))}
 const shan=new T.Group();shan.position.y=2.1;dome.add(shan);
 {const tr=mesh(new T.TorusGeometry(.92,.09,10,48),bronze);tr.rotation.x=Math.PI/2;shan.add(tr)}
 for(const rot of[0,Math.PI/2]){const arc=mesh(new T.TorusGeometry(.92,.05,8,32,Math.PI),bronze);arc.rotation.y=rot;shan.add(arc)}
 shan.add(mesh(new T.CylinderGeometry(.9,.9,.02,32),glass));
 const beam=new T.Mesh(new T.ConeGeometry(.9,6,32,1,true),new T.MeshBasicMaterial({color:0xf0cf8a,transparent:true,opacity:.12,blending:T.AdditiveBlending,depthWrite:false,side:T.DoubleSide}));
 beam.position.y=3.2;beam.rotation.x=Math.PI;shan.add(beam);
 const core=mesh(new T.CylinderGeometry(.5,.5,4,24),M(0xf6e3a1,{emissive:0x9c7a22,emissiveIntensity:.7}),[0,2.6,0]);root.add(core);
 /* wings */
 const wing=s=>{const g=new T.Group();g.position.set(s*6.1,0,-.6);g.rotation.y=-s*.18;
   g.add(mesh(new T.BoxGeometry(2.8,1.7,3.4),M(0xf1ece0,{roughness:.6}),[0,.85,0]));{const pg=new T.CylinderGeometry(1.79,1.79,3.7,3);pg.rotateX(-Math.PI/2);pg.scale(1,.3,1);g.add(mesh(pg,stone,[0,2.13,0]))}
   g.add(mesh(new T.BoxGeometry(3.1,.16,3.7),bronze,[0,1.78,0]));
   for(let i=0;i<5;i++)g.add(mesh(new T.CylinderGeometry(.09,.11,1.6,10),stone,[-1.1+i*.55,.88,1.95]));
   g.add(mesh(new T.BoxGeometry(2.6,.9,.05),glass,[0,.85,1.73]));
   g.add(mesh(new T.BoxGeometry(1.7,.5,.9),stone2,[-s*1.85,.45,.4]));root.add(g);return g};
 const WL=wing(-1),WR=wing(1);
 /* garden trees: Singapore green-city idea */
 {const leaf=M(0x2f7d4f,{roughness:.8}),leaf2=M(0x3f9a5e,{roughness:.8}),trunk=M(0x6b4a2b);
  for(let i=0;i<22;i++){const a=i/22*Math.PI*2;if(Math.abs(Math.atan2(Math.sin(a-Math.PI/2),Math.cos(a-Math.PI/2)))<.62)continue;
   const rr=7.3+(i%2)*.6,x=Math.cos(a)*rr,z=Math.sin(a)*rr,h=.9+(i%3)*.25;
   root.add(mesh(new T.CylinderGeometry(.06,.09,h,6),trunk,[x,h/2,z]));
   root.add(mesh(new T.SphereGeometry(.45+(i%3)*.08,10,8),i%2?leaf:leaf2,[x,h+.25,z]))}}
 /* x-ray / night / tour */
 const shell=[];[L0,L2,dome,WL,WR].forEach(g=>g.traverse(o=>{if(o.isMesh&&o.material&&o.material!==glass&&o.material!==bronze)shell.push(o)}));
 let xr=false,night=false,tourT=null;
 const setX=v=>{xr=v;shell.forEach(o=>{o.material=o.material.clone?o.material:o.material;o.material.transparent=true;o.material.opacity=v?.18:(o.material.userData.op??1);o.material.depthWrite=!v});core.visible=true};
 shell.forEach(o=>{o.material=o.material.clone();o.material.userData.op=o.material.opacity});
 const setN=v=>{night=v;hemi.intensity=v?.12:.55;sun.intensity=v?.15:1.25;rim.intensity=v?.25:.5;glows.forEach(l=>l.intensity=v?2.2:0);stage.classList.toggle('night',v);r.toneMappingExposure=v?1.1:.85};
  /* hotspots */
 const anchors=[[root,[0,.4,6.2]],[WL,[0,2.2,0]],[WR,[0,2.2,0]],[L1,[0,2.9,3.8]],[L2,[0,4.15,3.55]],[shan,[0,.5,0]],[vault,[0,-.3,3.5]]].map(([p,v])=>{const o=new T.Object3D();o.position.set(...v);p.add(o);return o});
 const hots=$('#hots');hots.innerHTML=Z.map((z,i)=>`<button class="hot" data-i="${i}" aria-label="${esc(z.k)}">${i+1}</button><span class="hlbl" data-l="${i}">${esc(z.k)}</span>`).join('');
 const hb=[...hots.querySelectorAll('.hot')],hl=[...hots.querySelectorAll('.hlbl')];
 const pick=i=>{sel=sel===i?-1:i;renderInfo();hb.forEach((b,j)=>b.classList.toggle('on',j===sel));if(sel>=0){tgtYaw=focusYaw[sel]??yaw;auto=false;$('#aRot').textContent='Айналдыру';$('#aRot').classList.remove('act')}};
 hots.addEventListener('click',e=>{const b=e.target.closest('.hot');if(b)pick(+b.dataset.i)});
 info.addEventListener('click',e=>{const b=e.target.closest('.legend button');if(b)pick(+b.dataset.i)});
 const focusYaw=[0,.9,-.9,0,0,0,0];
 const tourStop=()=>{clearInterval(tourT);tourT=null;$('#aTour')?.classList.remove('act');$('#aTour')&&($('#aTour').textContent='Экскурсия')};
 const tourStep=k=>{sel=-1;pick(k);const v3=new T.Vector3();anchors[k].getWorldPosition(v3);tgtYaw=yaw+Math.atan2(Math.sin(Math.atan2(v3.x,v3.z)-yaw),Math.cos(Math.atan2(v3.x,v3.z)-yaw));tgtDist=k===5?22:17;tgtEx=[3,4,6].includes(k)?1:0;auto=false};
 window.ARCH={tour(){if(tourT)return tourStop();let k=0;tourStep(k);tourT=setInterval(()=>{k++;if(k>=Z.length){tourStop();tgtEx=0;tgtDist=27;return}tourStep(k)},3800);$('#aTour').classList.add('act');$('#aTour').textContent='Экскурсияны тоқтату';kick()},
  xray(){setX(!xr);$('#aXray')?.classList.toggle('act',xr);kick()},night(){setN(!night);$('#aNight')?.classList.toggle('act',night);kick()},stop:tourStop};
 $('#aTour')&&($('#aTour').onclick=()=>ARCH.tour());$('#aXray')&&($('#aXray').onclick=()=>ARCH.xray());$('#aNight')&&($('#aNight').onclick=()=>ARCH.night());
 /* controls */
 let yaw=-.5,tgtYaw=-.5,pitch=.36,dist=27,tgtDist=27,auto=!reduce,ex=0,tgtEx=0,drag=null;
 stage.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;window.ARCH?.stop();drag={x:e.clientX,y:e.clientY,yaw:tgtYaw,pitch};stage.setPointerCapture(e.pointerId)});
 stage.addEventListener('pointermove',e=>{if(!drag)return;tgtYaw=drag.yaw+(e.clientX-drag.x)*.008;pitch=Math.max(.08,Math.min(1.2,drag.pitch+(e.clientY-drag.y)*.005))});
 const end=()=>drag=null;stage.addEventListener('pointerup',end);stage.addEventListener('pointercancel',end);
 stage.addEventListener('wheel',e=>{e.preventDefault();tgtDist=Math.max(13,Math.min(38,tgtDist+e.deltaY*.012))},{passive:false});
 stage.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){tgtYaw-=.3;e.preventDefault()}if(e.key==='ArrowRight'){tgtYaw+=.3;e.preventDefault()}if(e.key==='ArrowUp'){tgtDist=Math.max(11,tgtDist-1.5);e.preventDefault()}if(e.key==='ArrowDown'){tgtDist=Math.min(30,tgtDist+1.5);e.preventDefault()}});
 $('#aRot').onclick=e=>{auto=!auto;e.currentTarget.textContent=auto?'Айналуды тоқтату':'Айналдыру';e.currentTarget.classList.toggle('act',auto)};
 $('#aExp').onclick=e=>{tgtEx=tgtEx?0:1;e.currentTarget.textContent=tgtEx?'Қабаттарды жабу':'Қабаттарды ашу';e.currentTarget.classList.toggle('act',!!tgtEx)};
 $('#aReset').onclick=()=>{tgtYaw=-.5;pitch=.36;tgtDist=27;tgtEx=0;$('#aExp').textContent='Қабаттарды ашу';$('#aExp').classList.remove('act');sel=-1;renderInfo();hb.forEach(b=>b.classList.remove('on'))};
 if(!auto){$('#aRot').textContent='Айналдыру';$('#aRot').classList.remove('act')}
 const size=()=>{const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()};
 const aro=new ResizeObserver(size);aro.observe(stage);size();
 const v=new T.Vector3(),c=new T.Vector3();let vis=true;
 let running=false;const kick=()=>{if(!running&&vis){running=true;requestAnimationFrame(frame)}};
 const vio=new IntersectionObserver(es=>{vis=es[0].isIntersecting;kick()});vio.observe(stage);
 let last=0;
 function frame(t){if(!vis){running=false;return}const dt=Math.min(.05,(t-last)/1000||0);last=t;
   if(auto&&!drag)tgtYaw+=dt*.18;
   yaw+=(tgtYaw-yaw)*.08;dist+=(tgtDist-dist)*.08;ex+=(tgtEx-ex)*.07;
   const tx=0,ty=2.4+ex*1.6,dd=dist+ex*7;cam.position.set(Math.sin(yaw)*Math.cos(pitch)*dd,ty+Math.sin(pitch)*dd,Math.cos(yaw)*Math.cos(pitch)*dd);cam.lookAt(tx,ty,0);
   L1.position.y=ex*1.3;L2.position.y=ex*2.6;dome.position.y=4.74+ex*4.2;vault.position.y=-ex*2.4;core.visible=ex<.5;
   WL.position.x=-6.1-ex*1.4;WR.position.x=6.1+ex*1.4;
   plaza.material.opacity=1-ex*.7;plaza.material.transparent=true;pave.visible=ex<.5;
   beam.material.opacity=.1+Math.sin(t*.002)*.04;
   r.render(sc,cam);
   const W=stage.clientWidth,H=stage.clientHeight;c.copy(cam.position).normalize();
   anchors.forEach((a,i)=>{a.getWorldPosition(v);const back=(v.x*c.x+v.z*c.z)<-1.5&&i!==5;v.project(cam);
     const x=(v.x*.5+.5)*W,y=(-v.y*.5+.5)*H;hb[i].style.left=x+'px';hb[i].style.top=y+'px';hl[i].style.left=x+'px';hl[i].style.top=y+'px';
     hb[i].classList.toggle('back',back);hl[i].style.opacity=back?0:(sel===i||sel<0?1:.25)});
   if(!reduce||drag||Math.abs(tgtYaw-yaw)>.001||Math.abs(tgtEx-ex)>.001||Math.abs(tgtDist-dist)>.01)requestAnimationFrame(frame);else running=false}
 kick();
 ['pointerdown','pointermove','wheel','keydown','click'].forEach(ev=>stage.addEventListener(ev,kick));
}catch(e){console.log('arch3d',e)}}
}
