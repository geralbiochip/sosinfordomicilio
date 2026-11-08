
/* Ajuste do esquema: origem Parede, cores e contraste. Colar no final de assets/zonas-sites.js. */
(()=>{
 const map=document.querySelector('.dynamic-map');if(!map)return;
 const NS='http://www.w3.org/2000/svg';
 const colors={linha:'#ba3440',interior:'#e66b17',sintra:'#b88a00',lisboa:'#238153'};
 const origin={x:285,y:355};
 map.querySelectorAll('[data-origin-marker]').forEach(n=>n.remove());
 const background=map.querySelector(':scope > rect');if(background)background.setAttribute('fill','#dce5e8');
 map.querySelectorAll('pattern circle').forEach(dot=>{dot.setAttribute('fill','#748b96');dot.setAttribute('r','1.55');});
 map.querySelectorAll(':scope > g:not([data-map-zone])').forEach(g=>g.setAttribute('stroke','#b4c3ca'));
 const groups=map.querySelectorAll('[data-map-zone]');
 groups.forEach(group=>{
  const color=colors[group.dataset.mapZone];group.style.setProperty('--zone',color);
  group.querySelectorAll('path.route').forEach(path=>{
   const old=path.getAttribute('d');const m=old.match(/^M\s*([\d.]+)[ ,]+([\d.]+)/);if(!m)return;
   const x=Number(m[1]),y=Number(m[2]);
   if(x===origin.x&&y===origin.y){path.remove();return;}
   const cx=(origin.x+x)/2,cy=Math.min(origin.y,y)-35;
   path.setAttribute('d',`M${origin.x} ${origin.y} Q${cx} ${cy} ${x} ${y}`);
   path.setAttribute('stroke',color);
  });
  group.querySelectorAll('circle').forEach(c=>{c.setAttribute('fill',color);c.setAttribute('r','6');});
 });
 // A rota de Lisboa passa a partir da Parede, como as restantes.
 const lisboa=map.querySelector('[data-map-zone="lisboa"]');
 if(lisboa){const path=document.createElementNS(NS,'path');path.setAttribute('class','route');path.setAttribute('d',`M${origin.x} ${origin.y} Q485 170 685 240`);path.setAttribute('fill','none');path.setAttribute('stroke',colors.lisboa);path.setAttribute('stroke-width','2.4');lisboa.prepend(path);}
 document.querySelectorAll('[data-zone]').forEach(card=>{const color=colors[card.dataset.zone];if(color)card.style.setProperty('--zone',color);});
 const marker=document.createElementNS(NS,'g');marker.setAttribute('data-origin-marker','true');
 const halo=document.createElementNS(NS,'circle');halo.setAttribute('cx',origin.x);halo.setAttribute('cy',origin.y);halo.setAttribute('r','15');halo.setAttribute('fill','white');halo.setAttribute('stroke','#26313c');halo.setAttribute('stroke-width','2');
 const center=document.createElementNS(NS,'circle');center.setAttribute('cx',origin.x);center.setAttribute('cy',origin.y);center.setAttribute('r','6');center.setAttribute('fill','#26313c');
 const badge=document.createElementNS(NS,'rect');badge.setAttribute('x','191');badge.setAttribute('y','392');badge.setAttribute('width','188');badge.setAttribute('height','26');badge.setAttribute('rx','6');badge.setAttribute('fill','#26313c');
 const label=document.createElementNS(NS,'text');label.setAttribute('x','285');label.setAttribute('y','409');label.setAttribute('text-anchor','middle');label.setAttribute('fill','white');label.setAttribute('font-family','Arial,sans-serif');label.setAttribute('font-size','12');label.setAttribute('font-weight','bold');label.textContent='PAREDE · PONTO DE PARTIDA';
 marker.append(halo,center,badge,label);map.append(marker);
 const title=map.querySelector('title');if(title)title.textContent='Esquema de deslocações com origem na Parede para todas as zonas de atendimento. Sem escala geográfica.';
 const section=map.closest('section');const intro=section?.querySelector(':scope > .wrap > p.muted');if(intro)intro.textContent='Deslocações com partida da Parede para as zonas indicadas. Atendimento, disponibilidade e condições de deslocação mediante confirmação.';
 const style=document.createElement('style');style.textContent='.zone-choice[data-zone="sintra"] .zone-title i{box-shadow:0 0 0 1px #8f6a00}.dynamic-map{background:#dce5e8}.dynamic-map .route{stroke-width:2.8}';document.head.append(style);
})();
