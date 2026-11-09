const menu=document.querySelector('#menu');if(menu)menu.onclick=()=>{const open=document.querySelector('#nav').classList.toggle('open');menu.setAttribute('aria-expanded',String(open));};
const form=document.querySelector('#quote');if(form)form.addEventListener('submit',async e=>{e.preventDefault();const d=new FormData(form);const status=document.querySelector('#form-status');if(e.submitter?.value==='whatsapp'){const text=`Nome: ${d.get('nome')}
Email: ${d.get('email')}
Telefone: ${d.get('telefone')||'Não indicado'}
Localidade: ${d.get('local')}
Serviço: ${d.get('servico')}
Mensagem: ${d.get('mensagem')}`;window.open('https://wa.me/351926014310?text='+encodeURIComponent(text),'_blank','noopener');return;}status.textContent='A enviar…';const buttons=form.querySelectorAll('button');buttons.forEach(b=>b.disabled=true);try{const r=await fetch(form.action,{method:'POST',body:d,headers:{Accept:'application/json'}});if(!r.ok)throw Error();status.textContent='O serviço de formulário aceitou o pedido. Obrigado pelo contacto.';form.reset();}catch(err){status.textContent='Não foi possível confirmar o envio. Tenta novamente ou escreve para geral.biochip@gmail.com.';}finally{buttons.forEach(b=>b.disabled=false);}});
const map=document.querySelector('.dynamic-map');if(map){const choices=[...document.querySelectorAll('[data-zone]')];let pinned=null;const coarse=matchMedia('(hover: none)').matches;
function show(key){map.classList.toggle('filtered',!!key);document.querySelectorAll('[data-map-zone]').forEach(g=>g.classList.toggle('selected',g.dataset.mapZone===key));choices.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.zone===key)));document.querySelector('#map-status').textContent=key?'Zona em destaque: '+choices.find(b=>b.dataset.zone===key).querySelector('.zone-title').textContent:'Todas as zonas visíveis.';}
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
      while(n=walker.nextNode())n.nodeValue=n.nodeValue.replace(/Alcabideche e envolvente/g,'Alcabideche e zonas envolventes').replace(/Sintra e envolvente/g,'Sintra e zonas envolventes');
    });
    document.querySelectorAll('[aria-label]').forEach(el=>el.setAttribute('aria-label',el.getAttribute('aria-label').replace(/Alcabideche e envolvente/g,'Alcabideche e zonas envolventes').replace(/Sintra e envolvente/g,'Sintra e zonas envolventes')));
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',applyContactPolicy);else applyContactPolicy();
})();

;(() => {
function improveForms(){
 document.querySelectorAll('#quote,#product-form').forEach(form=>{
  if(form.dataset.assistanceEnhanced)return;form.dataset.assistanceEnhanced='true';
  const message=form.querySelector('textarea[name="mensagem"]');
  if(message){
   message.placeholder=form.id==='quote'?'Ex.: HP 15; não arranca desde ontem; aparece uma mensagem de erro. Indica também o que já tentaste.':'Indica as tuas dúvidas sobre estado, bateria, acessórios, garantia ou entrega do artigo.';
   const help=document.createElement('p');help.className='small';help.id=form.id+'-message-help';
   help.textContent=form.id==='quote'?'Indica a marca/modelo, os sintomas e eventuais mensagens de erro. Não envies palavras-passe nem dados bancários.':'A referência do artigo já segue no pedido. Não envies palavras-passe nem dados bancários.';
   help.style.margin='5px 0 10px';message.insertAdjacentElement('afterend',help);
   message.setAttribute('aria-describedby',help.id);
  }
  const service=form.querySelector('select[name="servico"]');
  if(service&&!service.querySelector('option[value=""]')){
   const option=new Option('Seleciona o serviço','',true,true);option.disabled=true;service.prepend(option);service.required=true;
  }
  const phone=form.querySelector('[name="telefone"]');if(phone){phone.type='tel';phone.inputMode='tel';}
  form.querySelectorAll('input:not([type="hidden"]),textarea,select').forEach(field=>{
   const clear=()=>{field.setCustomValidity('');field.removeAttribute('aria-invalid');};
   field.addEventListener('input',clear);field.addEventListener('change',clear);
   field.addEventListener('invalid',()=>{
    field.setAttribute('aria-invalid','true');
    let text='';
    if(field.validity.valueMissing){
     if(field.type==='checkbox')text='Confirma que leste a informação de proteção de dados para continuar.';
     else if(field.tagName==='SELECT')text='Seleciona o serviço que procuras.';
     else text=({nome:'Indica o teu nome.',email:'Indica um email para receberes a resposta.',local:'Indica a localidade onde precisas de assistência.',localidade:'Indica a tua localidade.',mensagem:'Escreve uma breve descrição do pedido.'})[field.name]||'Preenche este campo.';
    }else if(field.type==='email'&&field.validity.typeMismatch)text='Verifica o email. Usa um formato como nome@exemplo.pt.';
    if(text)field.setCustomValidity(text);
   });
  });
  const status=form.querySelector('[role="status"]');if(status){
   status.setAttribute('aria-live','polite');status.setAttribute('aria-atomic','true');
   new MutationObserver(()=>{
    const text=status.textContent;
    if(text.includes('O serviço de formulário aceitou o pedido.')){
     const desired=form.id==='product-form'?'O serviço de formulário aceitou o pedido sobre o artigo. Aguarda a confirmação de disponibilidade e condições. Este envio não confirma uma compra.':'O serviço de formulário aceitou o pedido. A resposta será enviada para o email indicado, no prazo de 24 horas úteis.';
     if(text!==desired)status.textContent=desired;
    }
   }).observe(status,{childList:true,subtree:true,characterData:true});
  }
 });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',improveForms);else improveForms();
})();
