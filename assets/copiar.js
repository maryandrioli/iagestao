document.querySelectorAll('.copiar').forEach(function(b){
  b.addEventListener('click',function(){
    var el=document.getElementById(b.dataset.alvo), txt=el.innerText;
    var ok=function(){var o=b.textContent;b.textContent='Copiado';setTimeout(function(){b.textContent=o;},1800);};
    if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(txt).then(ok,fallback);}else{fallback();}
    function fallback(){var r=document.createRange();r.selectNodeContents(el);var s=window.getSelection();s.removeAllRanges();s.addRange(r);try{document.execCommand('copy');ok();}catch(e){}}
  });
});
