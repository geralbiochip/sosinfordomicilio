(()=>{const img=document.querySelector('.banner img.banner-image');if(!img)return;
const lang=(document.documentElement.lang||'pt').slice(0,2);
const texts={pt:['Pausar animação','Ativar animação'],en:['Pause animation','Play animation'],es:['Pausar animación','Activar animación'],fr:["Mettre en pause l’animation","Activer l’animation"]}[lang]||['Pausar animação','Ativar animação'];
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const box=document.createElement('div');box.className='pc-motion-controls';const button=document.createElement('button');button.type='button';button.className='pc-motion-toggle';box.append(button);img.after(box);
let paused=reduce.matches;function render(){img.classList.toggle('pc-motion-paused',paused);button.textContent=texts[paused?1:0];button.disabled=reduce.matches;button.setAttribute('aria-label',button.textContent);}
button.addEventListener('click',()=>{paused=!paused;render()});reduce.addEventListener('change',()=>{paused=reduce.matches;render()});render();})();