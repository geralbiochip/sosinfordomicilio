const menu=document.querySelector('#menu');if(menu)menu.onclick=()=>{const open=document.querySelector('#nav').classList.toggle('open');menu.setAttribute('aria-expanded',String(open));};
const form=document.querySelector('#quote');if(form)form.addEventListener('submit',async e=>{e.preventDefault();const d=new FormData(form);const status=document.querySelector('#form-status');if(e.submitter?.value==='whatsapp'){const text=`Nome: ${d.get('nome')}
Email: ${d.get('email')}
Telefone: ${d.get('telefone')||'Não indicado'}
Localidade: ${d.get('local')}
Serviço: ${d.get('servico')}
Mensagem: ${d.get('mensagem')}`;window.open('https://wa.me/351926014310?text='+encodeURIComponent(text),'_blank','noopener');return;}status.textContent='A enviar…';const buttons=form.querySelectorAll('button');buttons.forEach(b=>b.disabled=true);try{const r=await fetch(form.action,{method:'POST',body:d,headers:{Accept:'application/json'}});if(!r.ok)throw Error();status.textContent='O serviço de formulário aceitou o pedido. Obrigado pelo contacto.';form.reset();}catch(err){status.textContent='Não foi possível confirmar o envio. Tenta novamente ou escreve para geral.biochip@gmail.com.';}finally{buttons.forEach(b=>b.disabled=false);}});
const map=document.querySelector('.dynamic-map');if(map){const choices=[...document.querySelectorAll('[data-zone]')];let pinned=null;const coarse=matchMedia('(hover: none)').matches;

// Rejoue chaque trajet depuis son premier point (Parede), puis rend la main au tracejado existant.
const coverageNS='http://www.w3.org/2000/svg';
const routeStates=[];
map.querySelectorAll('.map-zone .route:not(.route-halo)').forEach((route,index)=>{
  let defs=map.querySelector('defs');
  if(!defs){defs=document.createElementNS(coverageNS,'defs');map.prepend(defs);}
  const length=route.getTotalLength();
  const mask=document.createElementNS(coverageNS,'mask');
  mask.id='coverage-reveal-'+index;
  mask.setAttribute('maskUnits','userSpaceOnUse');
  mask.setAttribute('x','0');mask.setAttribute('y','0');mask.setAttribute('width','900');mask.setAttribute('height','590');
  const brush=document.createElementNS(coverageNS,'path');
  brush.setAttribute('d',route.getAttribute('d'));brush.setAttribute('fill','none');
  brush.setAttribute('stroke','white');brush.setAttribute('stroke-width','16');
  brush.style.strokeDasharray=length+' '+length;brush.style.strokeDashoffset='0';
  mask.append(brush);defs.append(mask);route.setAttribute('mask','url(#'+mask.id+')');
  routeStates.push({route,brush,length,animation:null,zone:route.closest('[data-map-zone]').dataset.mapZone});
});
function restartCoverage(key){
  routeStates.forEach(state=>{
    if(state.animation){state.animation.onfinish=null;state.animation.cancel();state.animation=null;}
    state.brush.style.strokeDashoffset='0';
    state.route.style.removeProperty('animation');
    if(key&&state.zone!==key)return;
    if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    state.route.style.setProperty('animation','none','important');
    state.brush.style.strokeDashoffset=String(state.length);
    state.animation=state.brush.animate([{strokeDashoffset:String(state.length)},{strokeDashoffset:'0'}],{duration:1000,easing:'ease-in-out',fill:'forwards'});
    state.animation.onfinish=()=>{
      state.brush.style.strokeDashoffset='0';
      state.animation.cancel();state.animation=null;
      state.route.style.removeProperty('animation');
    };
  });
}

function show(key){restartCoverage(key);map.classList.toggle('filtered',!!key);document.querySelectorAll('[data-map-zone]').forEach(g=>g.classList.toggle('selected',g.dataset.mapZone===key));choices.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.zone===key)));document.querySelector('#map-status').textContent=key?'Zona em destaque: '+choices.find(b=>b.dataset.zone===key).querySelector('.zone-title').textContent:'Todas as zonas visíveis.';}
choices.forEach(b=>{b.addEventListener('pointerenter',()=>{if(!coarse)show(b.dataset.zone);});b.addEventListener('pointerleave',()=>{if(!coarse)show(null);});b.addEventListener('focus',()=>{if(!coarse)show(b.dataset.zone);});b.addEventListener('blur',()=>{if(!coarse)show(null);});b.addEventListener('click',()=>{if(coarse){pinned=pinned===b.dataset.zone?null:b.dataset.zone;show(pinned);}else show(b.dataset.zone);});});document.querySelector('#all-zones').onclick=()=>{pinned=null;show(null);};document.addEventListener('keydown',e=>{if(e.key==='Escape'){pinned=null;show(null);}});}
