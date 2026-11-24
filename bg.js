/* Byzantine night mosaic background: twinkling gold tesserae, constellation lines, rotating rosettes, meander bands */
{
const cv=document.getElementById('bgart');
if(cv&&cv.getContext){
const ctx=cv.getContext('2d');
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
let seed=11;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
let tiles=[],ros=[],W=0,H=0;
const build=()=>{seed=11;W=innerWidth;H=innerHeight;tiles=[];ros=[];
  const n=Math.round(W*H/5200);
  for(let i=0;i<n;i++)tiles.push({x:rnd()*W,y:rnd()*H*2.2,s:2+rnd()*4,r:rnd()*.8,c:rnd()<.72?0:rnd()<.6?1:2,p:rnd()*6.28,v:.4+rnd()*1.2,d:.15+rnd()*.5});
  for(let i=0;i<5;i++)ros.push({x:rnd()<.5?W*(.02+rnd()*.15):W*(.83+rnd()*.15),y:H*(.2+i*.45),r:80+rnd()*90,dir:rnd()<.5?1:-1})};
const COL=[[232,205,122],[176,85,143],[63,167,184]];
const rosette=(x,y,r,a)=>{ctx.save();ctx.translate(x,y);ctx.rotate(a);ctx.strokeStyle='rgba(232,205,122,.16)';ctx.lineWidth=1.2;
  ctx.beginPath();ctx.arc(0,0,r,0,7);ctx.stroke();ctx.beginPath();ctx.arc(0,0,r*.86,0,7);ctx.stroke();
  for(let k=0;k<12;k++){ctx.rotate(Math.PI/6);ctx.beginPath();ctx.ellipse(0,-r*.45,r*.13,r*.38,0,0,7);ctx.stroke()}
  ctx.beginPath();ctx.arc(0,0,r*.16,0,7);ctx.stroke();
  for(let k=0;k<48;k++){const a2=k/48*6.283;ctx.fillStyle='rgba(232,205,122,.22)';ctx.fillRect(Math.cos(a2)*r*.93-1.5,Math.sin(a2)*r*.93-1.5,3,3)}ctx.restore()};
let t0=performance.now(),last=0;
const draw=t=>{const dpr=Math.min(devicePixelRatio||1,2);
  if(cv.width!==W*dpr||cv.height!==H*dpr){cv.width=W*dpr;cv.height=H*dpr}
  ctx.setTransform(dpr,0,0,dpr,0,0);
  const g=ctx.createLinearGradient(0,0,W,H);g.addColorStop(0,'#0b1736');g.addColorStop(.55,'#13285c');g.addColorStop(1,'#2a1a4a');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  const sy=scrollY,time=(t-t0)/1000;
  for(const r of ros){const y=((r.y-sy*.25)%(H*2.25)+H*2.25)%(H*2.25)-H*.3;rosette(r.x,y,r.r,time*.05*r.dir+sy*.0008*r.dir)}
  ctx.strokeStyle='rgba(232,205,122,.06)';ctx.lineWidth=1;
  for(let i=0;i<tiles.length-1;i+=9){const a=tiles[i],b=tiles[i+4];const ya=((a.y-sy*a.d)%(H*2.2)+H*2.2)%(H*2.2)-H*.1,yb=((b.y-sy*b.d)%(H*2.2)+H*2.2)%(H*2.2)-H*.1;if(Math.abs(ya-yb)<180&&Math.abs(a.x-b.x)<220){ctx.beginPath();ctx.moveTo(a.x,ya);ctx.lineTo(b.x,yb);ctx.stroke()}}
  for(const p of tiles){const y=((p.y-sy*p.d)%(H*2.2)+H*2.2)%(H*2.2)-H*.1;if(y<-10||y>H+10)continue;
    const tw=reduce?.6:.35+.65*(.5+.5*Math.sin(time*p.v+p.p)),c=COL[p.c];
    ctx.save();ctx.translate(p.x,y);ctx.rotate(p.r);ctx.fillStyle=`rgba(${c[0]},${c[1]},${c[2]},${(.18+.5*tw)*(p.c?0.7:1)})`;ctx.fillRect(-p.s/2,-p.s/2,p.s,p.s);ctx.restore()}};
let raf=0,vis=true;
const loop=t=>{raf=0;if(t-last>40){last=t;draw(t)}if(!reduce&&vis)raf=requestAnimationFrame(loop)};
build();draw(performance.now());
if(!reduce)raf=requestAnimationFrame(loop);else addEventListener('scroll',()=>draw(performance.now()),{passive:true});
addEventListener('resize',()=>{build();draw(performance.now())});
document.addEventListener('visibilitychange',()=>{vis=!document.hidden;if(vis&&!raf&&!reduce)raf=requestAnimationFrame(loop)});
}
}
