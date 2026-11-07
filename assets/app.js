const menu=document.querySelector('#menu');menu.addEventListener('click',()=>{const open=document.querySelector('#nav').classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
const form=document.querySelector('#quote');if(form)form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const text=`Olá Infordomicílio!
Nome: ${d.get('nome')}
Localidade: ${d.get('local')}
Serviço: ${d.get('servico')}
Mensagem: ${d.get('mensagem')}`;window.open('https://wa.me/351926014310?text='+encodeURIComponent(text),'_blank','noopener');});