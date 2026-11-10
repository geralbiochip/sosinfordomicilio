const menu=document.querySelector('#menu');if(menu)menu.onclick=()=>{const open=document.querySelector('#nav').classList.toggle('open');menu.setAttribute('aria-expanded',String(open));};
const form=document.querySelector('#quote');if(form)form.addEventListener('submit',async e=>{e.preventDefault();const d=new FormData(form);const status=document.querySelector('#form-status');if(e.submitter?.value==='whatsapp'){const text=`Nome: ${d.get('nome')}
Email: ${d.get('email')}
Telefone: ${d.get('telefone')||'Não indicado'}
Localidade: ${d.get('local')}
Serviço: ${d.get('servico')}
Mensagem: ${d.get('mensagem')}`;window.open('https://wa.me/351926014310?text='+encodeURIComponent(text),'_blank','noopener');return;}status.textContent="Envoi en cours…";const buttons=form.querySelectorAll('button');buttons.forEach(b=>b.disabled=true);try{const r=await fetch(form.action,{method:'POST',body:d,headers:{Accept:'application/json'}});if(!r.ok)throw Error();status.textContent="Le service de formulaires a accepté la demande. Merci de nous avoir contactés.";form.reset();}catch(err){status.textContent="Impossible de confirmer l’envoi. Réessayez ou écrivez à geral.biochip@gmail.com.";}finally{buttons.forEach(b=>b.disabled=false);}});
const map=document.querySelector('.dynamic-map');if(map){const choices=[...document.querySelectorAll('[data-zone]')];let pinned=null;const coarse=matchMedia('(hover: none)').matches;

const revealStates=[];
map.querySelectorAll('.map-zone .route:not(.route-halo)').forEach((route,index)=>{
 const ns='http://www.w3.org/2000/svg',length=route.getTotalLength();let defs=map.querySelector('defs');
 if(!defs){defs=document.createElementNS(ns,'defs');map.prepend(defs);}
 const mask=document.createElementNS(ns,'mask');mask.id='coverage-reveal-'+index;
 for(const [k,v] of Object.entries({maskUnits:'userSpaceOnUse',x:'0',y:'0',width:'900',height:'590'}))mask.setAttribute(k,v);
 const brush=document.createElementNS(ns,'path');
 for(const [k,v] of Object.entries({d:route.getAttribute('d'),fill:'none',stroke:'white','stroke-width':'16'}))brush.setAttribute(k,v);
 brush.style.strokeDasharray=length+' '+length;brush.style.strokeDashoffset='0';mask.append(brush);defs.append(mask);route.setAttribute('mask','url(#'+mask.id+')');
 revealStates.push({route,brush,length,animation:null,zone:route.closest('[data-map-zone]').dataset.mapZone});
});
function restartCoverage(key){revealStates.forEach(s=>{
 if(s.animation){s.animation.onfinish=null;s.animation.cancel();s.animation=null;}
 s.brush.style.strokeDashoffset='0';s.route.style.removeProperty('animation');
 if(key&&s.zone!==key||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 s.route.style.setProperty('animation','none','important');s.brush.style.strokeDashoffset=String(s.length);
 s.animation=s.brush.animate([{strokeDashoffset:String(s.length)},{strokeDashoffset:'0'}],{duration:1000,easing:'ease-in-out',fill:'forwards'});
 s.animation.onfinish=()=>{s.brush.style.strokeDashoffset='0';s.animation.cancel();s.animation=null;s.route.style.removeProperty('animation');};
});}

function show(key){restartCoverage(key);map.classList.toggle('filtered',!!key);document.querySelectorAll('[data-map-zone]').forEach(g=>g.classList.toggle('selected',g.dataset.mapZone===key));choices.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.zone===key)));document.querySelector('#map-status').textContent=key?"Zone en évidence : "+choices.find(b=>b.dataset.zone===key).querySelector('.zone-title').textContent:"Toutes les zones sont visibles.";}
choices.forEach(b=>{b.addEventListener('pointerenter',()=>{if(!coarse)show(b.dataset.zone);});b.addEventListener('pointerleave',()=>{if(!coarse)show(null);});b.addEventListener('focus',()=>{if(!coarse)show(b.dataset.zone);});b.addEventListener('blur',()=>{if(!coarse)show(null);});b.addEventListener('click',()=>{if(coarse){pinned=pinned===b.dataset.zone?null:b.dataset.zone;show(pinned);}else show(b.dataset.zone);});});document.querySelector('#all-zones').onclick=()=>{pinned=null;show(null);};document.addEventListener('keydown',e=>{if(e.key==='Escape'){pinned=null;show(null);}});}

;(() => {
  function applyContactPolicy(){
    const file=location.pathname.split('/').pop().toLowerCase();
    const home=file===''||file==='index.html';
    let kept=false;
    document.querySelectorAll('a[href]').forEach(a=>{
      if(!/^(?:https?:\/\/)?(?:wa\.me\/|(?:api\.|web\.)?whatsapp\.com\/)|^whatsapp:/i.test(a.getAttribute('href')||''))return;
      if(home&&!kept){kept=true;return;}
      a.remove();
    });
    document.querySelectorAll('button[value="whatsapp"],input[type="submit"][value="whatsapp"]').forEach(b=>b.remove());
    document.querySelectorAll('.zone-title,.zone-desc,.zone-places,.dynamic-map title,.dynamic-map desc').forEach(el=>{
      const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let n;
      while(n=walker.nextNode())n.nodeValue=n.nodeValue.replace(/Alcabideche e envolvente/g,"Alcabideche et ses environs").replace(/Sintra e envolvente/g,"Sintra et ses environs");
    });
    document.querySelectorAll('[aria-label]').forEach(el=>el.setAttribute('aria-label',el.getAttribute('aria-label').replace(/Alcabideche e envolvente/g,"Alcabideche et ses environs").replace(/Sintra e envolvente/g,"Sintra et ses environs")));
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',applyContactPolicy);else applyContactPolicy();
})();

;(() => {
function improveForms(){
 document.querySelectorAll('#quote,#product-form').forEach(form=>{
  if(form.dataset.assistanceEnhanced)return;form.dataset.assistanceEnhanced='true';
  const message=form.querySelector('textarea[name="mensagem"]');
  if(message){
   message.placeholder=form.id==='quote'?"Ex. : HP 15 ; ne démarre plus depuis hier ; un message d’erreur apparaît. Indiquez aussi ce que vous avez essayé.":"Indiquez vos questions sur l’état, la batterie, les accessoires, la garantie ou la livraison de l’article.";
   const help=document.createElement('p');help.className='small';help.id=form.id+'-message-help';
   help.textContent=form.id==='quote'?"Indiquez la marque/modèle, les symptômes et les messages d’erreur. N’envoyez pas de mots de passe ni de coordonnées bancaires.":"La référence de l’article est déjà incluse. N’envoyez pas de mots de passe ni de coordonnées bancaires.";
   help.style.margin='5px 0 10px';message.insertAdjacentElement('afterend',help);
   message.setAttribute('aria-describedby',help.id);
  }
  const service=form.querySelector('select[name="servico"]');
  if(service&&!service.querySelector('option[value=""]')){
   const option=new Option("Sélectionnez le service",'',true,true);option.disabled=true;service.prepend(option);service.required=true;
  }
  const phone=form.querySelector('[name="telefone"]');if(phone){phone.type='tel';phone.inputMode='tel';}
  form.querySelectorAll('input:not([type="hidden"]),textarea,select').forEach(field=>{
   const clear=()=>{field.setCustomValidity('');field.removeAttribute('aria-invalid');};
   field.addEventListener('input',clear);field.addEventListener('change',clear);
   field.addEventListener('invalid',()=>{
    field.setAttribute('aria-invalid','true');
    let text='';
    if(field.validity.valueMissing){
     if(field.type==='checkbox')text="Confirmez avoir lu les informations sur la protection des données pour continuer.";
     else if(field.tagName==='SELECT')text="Sélectionnez le service souhaité.";
     else text=({nome:"Indiquez votre nom.",email:"Indiquez un e-mail pour recevoir la réponse.",local:"Indiquez la localité de l’intervention.",localidade:"Indiquez votre localité.",mensagem:"Décrivez brièvement votre demande."})[field.name]||"Remplissez ce champ.";
    }else if(field.type==='email'&&field.validity.typeMismatch)text="Vérifiez l’e-mail. Utilisez un format comme nom@exemple.fr.";
    if(text)field.setCustomValidity(text);
   });
  });
  const status=form.querySelector('[role="status"]');if(status){
   status.setAttribute('aria-live','polite');status.setAttribute('aria-atomic','true');
   new MutationObserver(()=>{
    const text=status.textContent;
    if(text.includes("Le service de formulaires a accepté la demande.")){
     const desired=form.id==='product-form'?"Le service de formulaires a accepté votre demande sur l’article. Attendez la confirmation de disponibilité et des conditions. Cet envoi ne confirme pas un achat.":"Le service de formulaires a accepté la demande. La réponse sera envoyée à votre e-mail sous 24 heures ouvrées.";
     if(text!==desired)status.textContent=desired;
    }
   }).observe(status,{childList:true,subtree:true,characterData:true});
  }
 });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',improveForms);else improveForms();
})();
