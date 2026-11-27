(function(){
var q='.service-card,.card:not(form):not(:has(input,textarea,select)),.steps>div,.seo-content-grid>article,.remote-card';
var items=document.querySelectorAll(q);
if(!items.length||!('IntersectionObserver'in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
document.documentElement.classList.add('fx-cards-js');
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in-view');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -30px 0px'});
items.forEach(function(el){var i=Array.prototype.indexOf.call(el.parentNode.children,el);el.style.setProperty('--d',(i%3)*.1+'s');io.observe(el)});
setTimeout(function(){items.forEach(function(i){i.classList.add('in-view')})},6000);
})();