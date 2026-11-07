const menu=document.querySelector('#menu');if(menu)menu.addEventListener('click',()=>{const open=document.querySelector('#nav').classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
const form=document.querySelector('#quote');if(form)form.addEventListener('submit',async e=>{e.preventDefault();const d=new FormData(form);let status=document.querySelector('#form-status');if(!status){status=document.createElement('p');status.id='form-status';status.setAttribute('role','status');form.append(status);}if(e.submitter?.value==='whatsapp'){const text=`Nome: ${d.get('nome')}
Email: ${d.get('email')}
Localidade: ${d.get('local')}
Serviço: ${d.get('servico')}
Mensagem: ${d.get('mensagem')}`;window.open('https://wa.me/351926014310?text='+encodeURIComponent(text),'_blank','noopener');return;}status.textContent='A enviar…';const buttons=form.querySelectorAll('button');buttons.forEach(b=>b.disabled=true);try{const r=await fetch('https://formspree.io/f/myeeanpv',{method:'POST',body:d,headers:{Accept:'application/json'}});if(!r.ok)throw Error();status.textContent='O serviço de formulário aceitou o pedido. Obrigado pelo contacto.';form.reset();}catch(err){status.textContent='Não foi possível confirmar o envio. Tenta novamente ou escreve para geral.biochip@gmail.com.';}finally{buttons.forEach(b=>b.disabled=false);}});
const load=document.querySelector('#load-map');if(load)load.onclick=()=>{const f=document.createElement('iframe');f.title='Mapa da região Cascais–Lisboa';f.src='https://www.openstreetmap.org/export/embed.html?bbox=-9.49%2C38.67%2C-9.08%2C38.82&layer=mapnik';f.referrerPolicy='no-referrer';document.querySelector('#map-panel').replaceChildren(f);};
// Mantém o endereço existente para não quebrar ligações antigas.
document.querySelectorAll('a[href="experiencia.html"]').forEach(a=>a.textContent='Sobre Nós');
const nav=document.querySelector('nav');if(nav){const about=nav.querySelector('a[href="experiencia.html"]');const contact=nav.querySelector('a[href="contacto.html"]');if(about&&contact)contact.after(about);}
if(location.pathname.split('/').pop()==='experiencia.html'){
 document.title='Sobre Nós | Infordomicílio';
 const heading=document.querySelector('h1');if(heading)heading.textContent='Sobre Nós';
 if(nav){nav.querySelectorAll('.active').forEach(a=>a.classList.remove('active'));nav.querySelector('a[href="experiencia.html"]')?.classList.add('active');}
 const section=document.createElement('section');section.className='section soft';
 const wrap=document.createElement('div');wrap.className='wrap';wrap.style.maxWidth='900px';
 const title=document.createElement('h2');title.textContent='A nossa história';
 const description=document.createElement('p');description.textContent='Um registo dos nossos materiais de divulgação, parte do percurso de 20 anos de apoio informático a clientes.';
 const figure=document.createElement('figure');figure.style.margin='24px 0 0';
 const image=document.createElement('img');image.src='assets/infordomicilio-historia.jpg';image.alt='Material de divulgação Infordomicílio: assistência técnica ao domicílio, hardware e software';image.loading='lazy';image.style.cssText='display:block;width:100%;height:auto;border:1px solid #d8dde3;border-radius:10px';
 const caption=document.createElement('figcaption');caption.style.cssText='font-size:13px;color:#66717e;margin-top:12px';caption.textContent='Imagem de divulgação fornecida pela Infordomicílio. As condições e os contactos que constam deste material não substituem os apresentados atualmente no site. Para pedidos atuais: geral.biochip@gmail.com · +351 926 014 310.';
 figure.append(image,caption);wrap.append(title,description,figure);section.append(wrap);document.querySelector('main')?.append(section);
}
