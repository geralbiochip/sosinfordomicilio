/* Atualizacao incremental: imagens, bloco de servicos, privacidade e rodape. */
(()=>{
 function setup(){
  const lang=(document.documentElement.lang||'pt').slice(0,2);
  const header=document.querySelector('header');const top=document.querySelector('body>.top');
  const row=header&&header.querySelector('.navrow');const nav=row&&row.querySelector('nav');
  if(row&&nav&&!row.querySelector('.header-navigation-stack')){
   const stack=document.createElement('div');stack.className='header-navigation-stack';
   const langs=document.querySelector('.top .language-options')||header.querySelector('.language-options');const toggle=row.querySelector('#menu');row.appendChild(stack);
   if(langs)stack.appendChild(langs);if(toggle)stack.appendChild(toggle);stack.appendChild(nav);
  }
  if(header&&top&&!document.querySelector('.site-sticky-shell')){
   const shell=document.createElement('div');shell.className='site-sticky-shell';header.before(shell);shell.appendChild(header);
   const measure=()=>document.documentElement.style.setProperty('--site-sticky-height',shell.getBoundingClientRect().height+'px');
   if('ResizeObserver'in window)new ResizeObserver(measure).observe(shell);
   window.addEventListener('resize',measure);measure();
  }
  document.querySelectorAll('.pc-motion-controls').forEach(el=>el.remove());
  document.querySelectorAll('.servicos-apresentacao').forEach(block=>{
   const picture=block.querySelector(':scope>picture');if(picture)block.prepend(picture);
  });
  document.querySelectorAll('p').forEach(p=>{
   if(!/Formspree/i.test(p.textContent)||!/Biochip\s*[-–—]/i.test(p.textContent))return;
   const walker=document.createTreeWalker(p,NodeFilter.SHOW_TEXT);let text;
   while((text=walker.nextNode()))text.nodeValue=text.nodeValue.replace(/Biochip\s*[-–—]\s*/gi,'');
  });
  const footer=document.querySelector('footer');
  if(footer){
   footer.querySelectorAll('a[href^="mailto:"]').forEach(a=>{a.href='mailto:sosinfordomicilio@gmail.com';a.textContent='sosinfordomicilio@gmail.com';});
   const wrap=footer.querySelector('.wrap');
   if(wrap&&!wrap.dataset.footerOrganised){
    wrap.dataset.footerOrganised='true';
    const cols=Array.from(wrap.children).filter(el=>!el.classList.contains('footer-legal'));
    const brand=cols.find(el=>el.querySelector('a.brand'));const contacts=cols.find(el=>el.querySelector('a[href^="tel:"]'));
    const navigation=cols.find(el=>el!==brand&&el!==contacts);
    const labels={pt:['Contactos','Informações e navegação'],en:['Contact','Information and navigation'],es:['Contacto','Información y navegación'],fr:['Contact','Informations et navigation']}[lang]||['Contact','Information'];
    if(brand)brand.classList.add('footer-brand-column');
    [[contacts,'footer-contact-column',labels[0]],[navigation,'footer-navigation-column',labels[1]]].forEach(([el,cls,label])=>{
     if(!el)return;el.classList.add(cls);const h=document.createElement('h2');h.className='footer-column-title';h.textContent=label;el.prepend(h);
    });
   }
  }
  const script=document.querySelector('script[src*="banner-pc-movimento.js"]');if(!script)return;
  const base=script.src;
  const path=location.pathname.replace(/\/+$/,'');
  const leaf=(path.split('/').pop()||'').replace(/\.html$/i,'').toLowerCase();
  const isHome=!leaf||['index','pt','en','es','fr'].includes(leaf);
  const photos={experiencia:['sobre-nos-maquete-20261123.jpg',1408,768],contacto:['contactos-escritorio-20261120.jpg',1376,768],catalogo:['catalogo-maquete-20261123.jpg',1376,768],servicos:['servicos-escritorio-20261120.jpg',1376,768]};
  const alts={
   pt:{experiencia:'Maquete junto ao mar com computador em forma de casa e referência a mais de 25 anos de experiência',contacto:"Ilustração da área de contactos InforDomicílio com telefone, monitores e painel de localização e cobertura.",catalogo:'Maquete com portáteis, desktop, monitor e equipamentos recondicionados',servicos:"Ilustração dos serviços InforDomicílio com bancada de reparação, computadores e painéis de assistência informática."},
   en:{experiencia:'Seaside model with a house-shaped computer and a reference to over 25 years of experience',contacto:"Illustration of the InforDomicílio contact area with a telephone, monitors and a location and coverage panel.",catalogo:'Model with laptops, a desktop, monitor and refurbished IT equipment',servicos:"Illustration of InforDomicílio services with a repair bench, computers and IT support panels."},
   es:{experiencia:'Maqueta junto al mar con ordenador en forma de casa y referencia a más de 25 años de experiencia',contacto:"Ilustración del área de contacto InforDomicílio con teléfono, monitores y panel de ubicación y cobertura.",catalogo:'Maqueta con portátiles, ordenador de sobremesa, monitor y equipos reacondicionados',servicos:"Ilustración de los servicios InforDomicílio con banco de reparación, ordenadores y paneles de asistencia informática."},
   fr:{experiencia:'Maquette en bord de mer avec ordinateur en forme de maison et mention de plus de 25 ans d’expérience',contacto:"Illustration de l’espace de contact InforDomicílio avec téléphone, écrans et panneau de localisation et de couverture.",catalogo:'Maquette avec ordinateurs portables, ordinateur fixe, écran et matériel reconditionné',servicos:"Illustration des services InforDomicílio avec établi de réparation, ordinateurs et panneaux d’assistance informatique."}
  };
  const hero=document.querySelector('.banner img.banner-image');
  if(hero&&(isHome||photos[leaf])){
   hero.dataset.siteStaticPhoto='true';
   if(isHome){hero.src=new URL('inicio-escritorio-20261120.jpg',base).href;}
   else{const photo=photos[leaf];hero.src=new URL(photo[0],base).href;hero.width=photo[1];hero.height=photo[2];hero.alt=(alts[lang]||alts.pt)[leaf];}
   hero.classList.remove('pc-motion-paused');['role','tabindex','aria-pressed','aria-label','title','data-controllable-animation'].forEach(a=>hero.removeAttribute(a));
  }
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const still=new URL('banner-pc-leds-estatico.jpg',base).href;const moving=new URL('banner-pc-leds-animado.webp',base).href;
  const words={pt:['Animação do computador: pausar','Animação do computador: retomar','Imagem estática: movimento reduzido'],en:['Computer animation: pause','Computer animation: resume','Still image: reduced motion'],es:['Animación del ordenador: pausar','Animación del ordenador: reanudar','Imagen estática: movimiento reducido'],fr:['Animation de l’ordinateur : mettre en pause','Animation de l’ordinateur : reprendre','Image fixe : mouvements réduits']}[lang]||['Pause animation','Resume animation','Reduced motion'];
  document.querySelectorAll('.banner img.banner-image:not([data-home-photo]):not([data-site-static-photo]),img[data-equipment-animation]').forEach(img=>{
   let paused=false;img.dataset.controllableAnimation='true';
   function render(){
    const stopped=paused||reduce.matches;
    if(img.hasAttribute('data-equipment-animation'))img.src=stopped?still:moving;else img.classList.toggle('pc-motion-paused',stopped);
    img.setAttribute('tabindex',reduce.matches?'-1':'0');img.setAttribute('role',reduce.matches?'img':'button');
    img.setAttribute('aria-label',reduce.matches?words[2]:words[paused?1:0]);img.title=reduce.matches?words[2]:words[paused?1:0];
    if(reduce.matches)img.removeAttribute('aria-pressed');else img.setAttribute('aria-pressed',String(paused));
   }
   const toggle=()=>{if(!reduce.matches){paused=!paused;render();}};
   img.addEventListener('click',toggle);img.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle();}});
   reduce.addEventListener('change',render);render();
  });
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
})();


(()=>{
 if(location.protocol!=='file:')return;
 const script=document.querySelector('script[src*="banner-pc-movimento.js"]');if(!script)return;
 const root=new URL('../',script.src),pages=new Set(['index','servicos','contacto','catalogo','experiencia','privacidade','loja','404']);
 function localHref(href,baseURI){
  if(!href||href.trim().startsWith('#'))return href;
  const h=href.trim();if(/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(h)&&!h.startsWith('file:'))return href;
  let target;try{target=h.startsWith('/')&&!h.startsWith('//')?new URL(h.slice(1),root):new URL(h,baseURI);}catch(e){return href;}
  if(target.protocol!=='file:'||!target.href.startsWith(root.href))return href;
  const leaf=target.pathname.split('/').pop();if(target.pathname.endsWith('/'))target.pathname+='index.html';else if(['en','es','fr'].includes(leaf))target.pathname+='/index.html';else if(pages.has(leaf))target.pathname+='.html';return target.href;
 }
 function fix(a){const h=a.getAttribute('href'),next=localHref(h,document.baseURI);if(next!==h)a.setAttribute('href',next);}
 function repair(){document.querySelectorAll('a[href],area[href]').forEach(fix);}
 function setupLocal(){repair();['click','auxclick'].forEach(type=>document.addEventListener(type,e=>{const a=e.target.closest&&e.target.closest('a[href],area[href]');if(a)fix(a);},true));new MutationObserver(repair).observe(document.body,{childList:true,subtree:true});}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setupLocal);else setupLocal();
})();

(()=>{
 if(document.querySelector('script[data-atendimento-loader]'))return;
 const entry=document.currentScript||document.querySelector('script[src*="banner-pc-movimento.js"]');if(!entry)return;
 const extra=document.createElement('script');extra.src=new URL('atualizacao-atendimento-3d.js?v=20261123-7',entry.src).href;extra.dataset.atendimentoLoader='true';document.head.append(extra);
})();
