const menu=document.querySelector('#menu');menu.addEventListener('click',()=>{const open=document.querySelector('#nav').classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
const form=document.querySelector('#quote');if(form)form.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const text=`Olá Infordomicílio!
Nome: ${d.get('nome')}
Localidade: ${d.get('local')}
Serviço: ${d.get('servico')}
Mensagem: ${d.get('mensagem')}`;window.open('https://wa.me/351926014310?text='+encodeURIComponent(text),'_blank','noopener');});
const loadMap=document.querySelector('#load-map');if(loadMap){loadMap.addEventListener('click',()=>{const iframe=document.createElement('iframe');iframe.title='Mapa da região entre Cascais e Lisboa';iframe.src='https://www.openstreetmap.org/export/embed.html?bbox=-9.49%2C38.64%2C-9.08%2C38.81&layer=mapnik';iframe.referrerPolicy='no-referrer';document.querySelector('#map-panel').replaceChildren(iframe);});}
