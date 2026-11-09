
;(() => {
  function updateQuotePrivacyName(){
    document.querySelectorAll('#quote .privacy-notice p').forEach(p=>{
      const walker=document.createTreeWalker(p,NodeFilter.SHOW_TEXT);let node;
      while(node=walker.nextNode())node.nodeValue=node.nodeValue.replace(/Ricardo Duarte,\s*Biochip\s*-\s*Infordomicilio/g,'Biochip - Infordomicilio');
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',updateQuotePrivacyName);else updateQuotePrivacyName();
})();
