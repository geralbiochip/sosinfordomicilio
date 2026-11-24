(()=>{
 'use strict';
 const self=document.currentScript||document.querySelector('script[src*="atualizacao-atendimento-3d.js"]');
 if(!self)return;
 const base=self.src;
 const ZONES={"pt": "<section aria-labelledby=\"zonas-contactos-titulo\" class=\"section zonas-inicio zonas-contacto\"><div class=\"wrap\"><h2 id=\"zonas-contactos-titulo\">Zonas de atendimento</h2><p>Deslocamo-nos a Cascais, Estoril, Parede, Carcavelos, Alcabideche, Manique, Tires, São Domingos de Rana, Sintra, Oeiras, Carnaxide, Algés e Lisboa. A disponibilidade e o atendimento são confirmados de acordo com a localização e o pedido. Para outras zonas, podemos avaliar apoio remoto.</p><a class=\"btn\" href=\"contacto.html#cobertura\">Consultar área de cobertura</a></div></section>", "en": "<section aria-labelledby=\"zonas-contactos-titulo\" class=\"section zonas-inicio zonas-contacto\"><div class=\"wrap\"><h2 id=\"zonas-contactos-titulo\">Areas we cover</h2><p>We arrange visits in Cascais, Estoril, Parede, Carcavelos, Alcabideche, Manique, Tires, São Domingos de Rana, Sintra, Oeiras, Carnaxide, Algés and Lisboa. Availability and service are confirmed according to the location and request. For other areas, remote support may be an option.</p><a class=\"btn\" href=\"contacto.html#cobertura\">Check service coverage</a></div></section>", "es": "<section aria-labelledby=\"zonas-contactos-titulo\" class=\"section zonas-inicio zonas-contacto\"><div class=\"wrap\"><h2 id=\"zonas-contactos-titulo\">Zonas de actuación</h2><p>Realizamos visitas en Cascais, Estoril, Parede, Carcavelos, Alcabideche, Manique, Tires, São Domingos de Rana, Sintra, Oeiras, Carnaxide, Algés y Lisboa. La disponibilidad y el servicio se confirman según la ubicación y la solicitud. Para otras zonas, podemos evaluar la asistencia remota.</p><a class=\"btn\" href=\"contacto.html#cobertura\">Consultar zona de cobertura</a></div></section>", "fr": "<section aria-labelledby=\"zonas-contactos-titulo\" class=\"section zonas-inicio zonas-contacto\"><div class=\"wrap\"><h2 id=\"zonas-contactos-titulo\">Zones d’intervention</h2><p>Nous nous déplaçons à Cascais, Estoril, Parede, Carcavelos, Alcabideche, Manique, Tires, São Domingos de Rana, Sintra, Oeiras, Carnaxide, Algés et Lisboa. La disponibilité et l’intervention sont confirmées selon le lieu et la demande. Pour les autres secteurs, une assistance à distance peut être envisagée.</p><a class=\"btn\" href=\"contacto.html#cobertura\">Consulter la zone couverte</a></div></section>"},TEXTS={"pt": ["Tecnologia que volta a ligar tudo", "Da análise do problema à solução, juntamos as peças para que volte a utilizar os seus equipamentos com confiança. Cada intervenção depende do diagnóstico e da sua aprovação.", "A casa do logótipo desfaz-se em fragmentos e volta a unir-se.", "Pausar animação", "Retomar animação", "Movimento reduzido ativo", "Ilustração de um espaço de assistência informática InforDomicílio com bancada técnica, portátil e casa eletrónica."], "en": ["Technology that reconnects everything", "From assessing the problem to finding a solution, we bring the pieces together so you can use your equipment with confidence. Each intervention depends on the diagnosis and your approval.", "The house from our logo breaks into fragments and comes back together.", "Pause animation", "Resume animation", "Reduced motion enabled", "Illustration of an InforDomicílio IT support workspace with a technical bench, laptop and electronic house."], "es": ["Tecnología que vuelve a conectarlo todo", "Desde la evaluación del problema hasta la solución, reunimos las piezas para que vuelva a utilizar sus equipos con confianza. Cada intervención depende del diagnóstico y de su aprobación.", "La casa del logotipo se divide en fragmentos y vuelve a unirse.", "Pausar animación", "Reanudar animación", "Movimiento reducido activado", "Ilustración de un espacio de asistencia informática InforDomicílio con banco técnico, portátil y casa electrónica."], "fr": ["La technologie qui reconnecte tout", "De l’évaluation du problème à la solution, nous réunissons les pièces pour vous aider à utiliser votre matériel en confiance. Chaque intervention dépend du diagnostic et de votre accord.", "La maison du logo se fragmente puis se reconstitue.", "Mettre en pause", "Reprendre l’animation", "Mouvement réduit activé", "Illustration d’un espace d’assistance informatique InforDomicílio avec établi technique, ordinateur portable et maison électronique."]};
 function setup(){
  if(document.documentElement.dataset.atendimento3d)return;document.documentElement.dataset.atendimento3d='true';
  const lang=(document.documentElement.lang||'pt').slice(0,2),words=TEXTS[lang]||TEXTS.pt;
  const css=document.createElement('link');css.rel='stylesheet';css.href=new URL('atendimento-servicos-casa-20261123.css?v=4',base).href;document.head.append(css);
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);const nodes=[];let t;
  while((t=walker.nextNode()))if(!t.parentElement.closest('script,style,textarea,noscript'))nodes.push(t);
  nodes.forEach(n=>{n.nodeValue=n.nodeValue.replace(/Zonas de atua[çc][ãa]o/gi,'Zonas de atendimento');});
  const raw=location.pathname.replace(/\/+$/,'').split('/').pop()||'';const page=document.documentElement.dataset.previewPage||raw.replace(/\.html$/i,'');
  if(!page||['index','pt','en','es','fr'].includes(page)){
   const img=document.querySelector('.banner img.banner-image');if(img){img.src=new URL('inicio-escritorio-20261120.jpg',base).href;img.alt=words[6];img.width=1376;img.height=768;}
  }
  if(page==='contacto'&&!document.querySelector('.zonas-contacto')){
   const template=document.createElement('template');template.innerHTML=ZONES[lang]||ZONES.pt;
   const coverageLink=template.content.querySelector('a[href]');if(coverageLink)coverageLink.setAttribute('href','#cobertura');
   const banner=document.querySelector('main>.banner');if(banner)banner.after(template.content);
  }
  if(page==='servicos')document.querySelectorAll('.service-card[id]').forEach(card=>{
   if(!['portateis','desktops','redes','software','seguranca','dados','sites'].includes(card.id)||card.querySelector('.service-3d-image'))return;
   const image=document.createElement('img');image.className='service-3d-image';image.src=new URL('servicos-3d/'+card.id+'.svg',base).href;image.alt='';image.width=360;image.height=250;image.loading='lazy';image.decoding='async';image.draggable=false;
   card.prepend(image);const old=card.querySelector('.service-heading img');if(old)old.remove();
  });
  if(page==='experiencia'&&!document.querySelector('.brand-rebuild')){
   const section=document.createElement('section');section.className='section brand-rebuild';section.setAttribute('aria-labelledby','brand-rebuild-title');
   const wrap=document.createElement('div');wrap.className='wrap brand-rebuild-grid';
   const text=document.createElement('div'),title=document.createElement('h2'),p=document.createElement('p');title.id='brand-rebuild-title';title.textContent=words[0];p.textContent=words[1];text.append(title,p);
   const fig=document.createElement('figure'),stage=document.createElement('div'),fallback=document.createElement('img'),canvas=document.createElement('canvas'),caption=document.createElement('figcaption'),button=document.createElement('button');
   stage.className='brand-rebuild-stage';fallback.src=new URL('animacao-casa/casa-logo-fragmentos.png',base).href;fallback.alt=words[2];fallback.width=800;fallback.height=800;
   canvas.width=800;canvas.height=800;canvas.hidden=true;canvas.setAttribute('role','img');canvas.setAttribute('aria-label',words[2]);
   button.type='button';button.textContent=words[3];button.hidden=true;button.setAttribute('aria-pressed','false');caption.textContent=words[2];stage.append(fallback,canvas);fig.append(stage,button,caption);wrap.append(text,fig);section.append(wrap);
   const intro=document.querySelector('main>.banner')?.nextElementSibling;if(intro)intro.after(section);else document.querySelector('main')?.append(section);
   initHouse(canvas,fallback,button,words);
  }
  function shieldImages(){document.querySelectorAll('img').forEach(i=>{i.draggable=false;});}
  shieldImages();
  new MutationObserver(shieldImages).observe(document.body,{childList:true,subtree:true});
  ['contextmenu','dragstart'].forEach(event=>document.addEventListener(event,e=>{if(e.target.closest&&e.target.closest('img,canvas'))e.preventDefault();},true));
 }
 
 function initHouse(canvas,image,button,words){
  const ctx=canvas.getContext('2d');if(!ctx)return;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const SIZE=800,tiles=[];let ready=false,paused=false,visible=typeof IntersectionObserver==='undefined',raf=0,last=0,elapsed=0,painted=0;
  function ease(v){v=Math.max(0,Math.min(1,v));return v*v*(3-2*v);}
  function amount(ms){const t=ms%10000;if(t<2000)return 0;if(t<4200)return ease((t-2000)/2200);if(t<5200)return 1;if(t<7800)return 1-ease((t-5200)/2600);return 0;}
  const w=480,h=480,x0=160,y0=160;
  function picture(target){const scale=Math.min(w/image.naturalWidth,h/image.naturalHeight),iw=image.naturalWidth*scale,ih=image.naturalHeight*scale;target.drawImage(image,x0+(w-iw)/2,y0+(h-ih)/2,iw,ih);}
  function mesh(){
   const n=12,step=w/n;
   for(let row=0;row<n;row++)for(let col=0;col<n;col++){
    const x=x0+col*step,y=y0+row*step;
    for(const points of [[[x,y],[x+step,y],[x+step,y+step]],[[x,y],[x+step,y+step],[x,y+step]]]){
     const cx=points.reduce((a,p)=>a+p[0],0)/3,cy=points.reduce((a,p)=>a+p[1],0)/3,minx=x-2,miny=y-2;
     const tile=document.createElement('canvas');tile.width=step+4;tile.height=step+4;const c=tile.getContext('2d');if(!c)continue;
     c.translate(-minx,-miny);c.beginPath();points.forEach((p,i)=>{const px=cx+(p[0]-cx)*1.006,py=cy+(p[1]-cy)*1.006;i?c.lineTo(px,py):c.moveTo(px,py);});c.closePath();c.clip();picture(c);
     const dx=cx-400,dy=cy-400,r=Math.hypot(dx,dy)||1,seed=Math.sin(cx*12.3+cy*7.1)*43758.54,f=seed-Math.floor(seed);
     tiles.push({image:tile,cx,cy,ox:minx-cx,oy:miny-cy,vx:dx/r*(35+45*f),vy:dy/r*(35+45*f),rot:(f-.5)*.9,phase:f*Math.PI*2});
    }
   }
  }
  function draw(q,time){
   ctx.clearRect(0,0,SIZE,SIZE);
   const shadow=ctx.createRadialGradient(400,674,6,400,674,185);shadow.addColorStop(0,'rgba(20,57,86,.15)');shadow.addColorStop(1,'rgba(20,57,86,0)');ctx.fillStyle=shadow;ctx.fillRect(180,640,440,70);
   if(q<.0001){picture(ctx);return;}
   const glow=ctx.createRadialGradient(400,400,30,400,400,330);glow.addColorStop(0,'rgba(40,190,220,'+(.12*Math.sin(q*Math.PI))+')');glow.addColorStop(1,'rgba(40,190,220,0)');ctx.fillStyle=glow;ctx.fillRect(50,50,700,700);
   for(const t of tiles){ctx.save();ctx.translate(t.cx+t.vx*q,t.cy+t.vy*q+Math.sin(time*.0018+t.phase)*3*q);ctx.rotate(t.rot*q);ctx.scale(1-.12*q,1-.12*q);ctx.drawImage(t.image,t.ox,t.oy);ctx.restore();}
  }
  function allowed(){return ready&&visible&&!document.hidden&&!paused&&!reduce.matches;}
  function sync(){
   button.hidden=!ready;button.disabled=reduce.matches;button.textContent=reduce.matches?words[5]:(paused?words[4]:words[3]);button.setAttribute('aria-pressed',String(paused));
   if(!allowed()){if(raf)cancelAnimationFrame(raf);raf=0;last=0;if(ready&&reduce.matches)draw(0,0);return;}
   if(!raf){last=0;raf=requestAnimationFrame(tick);}
  }
  function tick(now){raf=0;if(!allowed()){last=0;return;}if(last)elapsed+=Math.min(100,now-last);last=now;if(now-painted>=32){draw(amount(elapsed),elapsed);painted=now;}raf=requestAnimationFrame(tick);}
  function load(){if(ready||!image.naturalWidth)return;try{mesh();draw(0,0);ready=true;canvas.hidden=false;image.hidden=true;sync();}catch(e){canvas.hidden=true;image.hidden=false;button.hidden=true;}}
  image.addEventListener('load',load);if(image.complete)load();
  button.addEventListener('click',()=>{paused=!paused;sync();});document.addEventListener('visibilitychange',sync);reduce.addEventListener('change',sync);
  if(typeof IntersectionObserver!=='undefined'){const observer=new IntersectionObserver(entries=>{visible=entries.some(e=>e.isIntersecting);sync();},{threshold:.05});observer.observe(canvas.parentElement);}
 }

 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
})();

/* QR de contacto vetorial; integracao independente dos banners e animacoes. */
(()=>{
 const entry=document.currentScript||document.querySelector('script[src*="atualizacao-atendimento-3d.js"]');if(!entry)return;
 const base=entry.src;
 function setupQR(){
  if(document.querySelector('.header-contact-qr')){
 const b=document.querySelector('.header-qr-button'),d=document.querySelector('#contact-qr-dialog'),c=d&&d.querySelector('.qr-close');
 if(b&&d){b.addEventListener('click',()=>{if(d.showModal)d.showModal();});if(c)c.addEventListener('click',()=>{d.close();b.focus();});}return;}
  const brand=document.querySelector('header .navrow>.brand');if(!brand)return;
  const lang=(document.documentElement.lang||'pt').slice(0,2);
  const labels={pt:['Ler / ampliar','Guardar contacto','Leia o QR com a câmara de outro dispositivo ou guarde o contacto diretamente.','Guardar contacto (.vcf)','Fechar','Ampliar QR Code e guardar contacto'],en:['Scan / enlarge','Save contact','Scan the QR with another device or save the contact directly.','Save contact (.vcf)','Close','Enlarge QR code and save contact'],es:['Leer / ampliar','Guardar contacto','Lea el QR con otro dispositivo o guarde el contacto directamente.','Guardar contacto (.vcf)','Cerrar','Ampliar código QR y guardar contacto'],fr:['Lire / agrandir','Enregistrer le contact','Scannez le QR avec un autre appareil ou enregistrez directement le contact.','Enregistrer le contact (.vcf)','Fermer','Agrandir le QR et enregistrer le contact']}[lang]||['Ler / ampliar','Guardar contacto','Leia o QR com outro dispositivo ou guarde o contacto diretamente.','Guardar contacto (.vcf)','Fechar','Ampliar QR Code e guardar contacto'];
  const style=document.createElement('link');style.rel='stylesheet';style.href=new URL('qr-cabecalho.css?v=1',base).href;document.head.append(style);
  const group=document.createElement('div');group.className='header-brand-contact';brand.before(group);group.append(brand);
  const widget=document.createElement('div');widget.className='header-contact-qr';
  const button=document.createElement('button');button.type='button';button.className='header-qr-button';button.setAttribute('aria-label',labels[5]);button.setAttribute('aria-haspopup','dialog');
  const qr=document.createElement('img');qr.src=new URL('qr-contacto-infordomicilio.svg',base).href;qr.alt='';qr.width=114;qr.height=114;qr.draggable=false;
  const caption=document.createElement('span');caption.textContent=labels[0];button.append(qr,caption);widget.append(button);group.append(widget);
  const dialog=document.createElement('dialog');dialog.className='contact-qr-dialog';dialog.id='contact-qr-dialog';dialog.setAttribute('aria-labelledby','contact-qr-title');button.setAttribute('aria-controls',dialog.id);
  const title=document.createElement('h2');title.id='contact-qr-title';title.textContent=labels[1];
  const text=document.createElement('p');text.textContent=labels[2];
  const large=document.createElement('img');large.src=qr.src;large.alt=labels[5];large.className='qr-large';large.width=342;large.height=342;large.draggable=false;
  const info=document.createElement('p'),phone=document.createElement('a'),email=document.createElement('a');phone.href='tel:+351926014310';phone.textContent='+351 926 014 310';email.href='mailto:sosinfordomicilio@gmail.com';email.textContent='sosinfordomicilio@gmail.com';info.append(phone,document.createElement('br'),email);
  const download=document.createElement('a');download.href=new URL('contacto-infordomicilio.vcf',base).href;download.download='InforDomicilio.vcf';download.className='qr-download';download.textContent=labels[3];
  const close=document.createElement('button');close.type='button';close.className='qr-close';close.textContent=labels[4];
  dialog.append(title,text,large,info,download,close);document.body.append(dialog);
  button.addEventListener('click',()=>{if(typeof dialog.showModal==='function')dialog.showModal();else window.open(qr.src,'_blank','noopener');});
  close.addEventListener('click',()=>{dialog.close();button.focus();});
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setupQR);else setupQR();
})();
