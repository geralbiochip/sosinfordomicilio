(function(){
var d=document,r=d.documentElement;
var items=d.querySelectorAll('.web-feature-grid article,.web-process>*,.web-three>*');
if(!items.length)return;
if(!('IntersectionObserver'in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
r.classList.add('web-cards-js');
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in-view');io.unobserve(e.target)}})},{threshold:.15,rootMargin:'0px 0px -40px 0px'});
d.querySelectorAll('.web-feature-grid,.web-process,.web-three').forEach(function(g){Array.prototype.forEach.call(g.children,function(c,i){c.style.setProperty('--d',(i%3)*.12+'s')})});
items.forEach(function(i){io.observe(i)});
setTimeout(function(){items.forEach(function(i){i.classList.add('in-view')})},6000);
})();