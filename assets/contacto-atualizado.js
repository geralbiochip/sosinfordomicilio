const menu=document.querySelector('#menu');if(menu)menu.onclick=()=>{const open=document.querySelector('#nav').classList.toggle('open');menu.setAttribute('aria-expanded',String(open));};
const form=document.querySelector('#quote');form.addEventListener('submit',async e=>{e.preventDefault();const d=new FormData(form);const status=document.querySelector('#form-status');if(e.submitter?.value==='whatsapp'){const text=`Nome: ${d.get('nome')}
Email: ${d.get('email')}
Telefone: ${d.get('telefone')||'Não indicado'}
Localidade: ${d.get('local')}
Serviço: ${d.get('servico')}
Mensagem: ${d.get('mensagem')}`;window.open('https://wa.me/351926014310?text='+encodeURIComponent(text),'_blank','noopener');return;}status.textContent='A enviar…';const buttons=form.querySelectorAll('button');buttons.forEach(b=>b.disabled=true);try{const response=await fetch(form.action,{method:'POST',body:d,headers:{Accept:'application/json'}});if(!response.ok)throw Error();status.textContent='O serviço de formulário aceitou o pedido. Obrigado pelo contacto.';form.reset();}catch(err){status.textContent='Não foi possível confirmar o envio. Tenta novamente ou escreve para geral.biochip@gmail.com.';}finally{buttons.forEach(b=>b.disabled=false);}});
