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
  const photos={
   experiencia:['sobre-nos-maquete-20261123.jpg',1408,768],
   contacto:['contactos-escritorio-20261120.jpg',1376,768],
   catalogo:['catalogo-maquete-20261123.jpg',1376,768],
   servicos:['servicos-escritorio-20261120.jpg',1376,768]
  };
  const alts={
   pt:{experiencia:'Maquete junto ao mar com computador em forma de casa e referência a mais de 25 anos de experiência',contacto:'Maquete de assistência ao domicílio com carrinha, meios de contacto e telefone 926 014 310',catalogo:'Maquete com portáteis, desktop, monitor e equipamentos recondicionados',servicos:'Maquete dos serviços de informática: reparação, redes Wi-Fi, software, backups e sites'},
   en:{experiencia:'Seaside model with a house-shaped computer and a reference to over 25 years of experience',contacto:'Home IT support model with a van, contact methods and phone number 926 014 310',catalogo:'Model with laptops, a desktop, monitor and refurbished IT equipment',servicos:'IT services model: repairs, Wi-Fi networks, software, backups and websites'},
   es:{experiencia:'Maqueta junto al mar con ordenador en forma de casa y referencia a más de 25 años de experiencia',contacto:'Maqueta de asistencia a domicilio con furgoneta, medios de contacto y teléfono 926 014 310',catalogo:'Maqueta con portátiles, ordenador de sobremesa, monitor y equipos reacondicionados',servicos:'Maqueta de servicios informáticos: reparación, redes Wi-Fi, software, copias de seguridad y sitios web'},
   fr:{experiencia:'Maquette en bord de mer avec ordinateur en forme de maison et mention de plus de 25 ans d’expérience',contacto:'Maquette d’assistance à domicile avec véhicule, moyens de contact et téléphone 926 014 310',catalogo:'Maquette avec ordinateurs portables, ordinateur fixe, écran et matériel reconditionné',servicos:'Maquette des services informatiques : réparation, Wi-Fi, logiciels, sauvegardes et sites web'}
  };
  const hero=document.querySelector('.banner img.banner-image');
  if(hero&&(isHome||photos[leaf])){
   hero.dataset.siteStaticPhoto='true';
   if(isHome){hero.src=new URL('inicio-escritorio-20261120.jpg',base).href;}
   else{
    const photo=photos[leaf];hero.src=new URL(photo[0],base).href;hero.width=photo[1];hero.height=photo[2];
    hero.alt=(alts[lang]||alts.pt)[leaf];
   }
   hero.classList.remove('pc-motion-paused');
   ['role','tabindex','aria-pressed','aria-label','title','data-controllable-animation'].forEach(a=>hero.removeAttribute(a));
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
