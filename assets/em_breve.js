/* Versão provisória da página: os materiais aparecem com "em breve" e só abrem no dia da oficina.
   Usada apenas por index_em_breve.html. Para mudar os horários, edite as duas linhas abaixo. */
const LIBERA_DIA = CONFIG.dataOficina + "T00:00";      // pastas da escola, roteiros e materiais da manhã
const LIBERA_PRATICAS = CONFIG.dataOficina + "T11:40";  // blocos a partir das 11h40
const BLOCOS_ABERTOS = ["09:30", "10:20", "11:10"];      // fundamentos, ética e matriz, documento da escola: já abertos

(function(){
  const agora = new Date();
  const dia = new Date(LIBERA_DIA), praticas = new Date(LIBERA_PRATICAS);
  const [a, m, d] = CONFIG.dataOficina.split("-");
  const rotulo = t => `Disponível em ${d}/${m}` + (t === praticas ? " a partir das 11h40" : "");
  let proxima = null;

  function liberacao(el){
    const href = el.getAttribute("href") || "";
    if (!href || href.startsWith("#") || /^(mailto:|https?:)/i.test(href)) return null;   // âncoras e links externos
    if (/normativas_leis\//.test(href)) return null;                                      // leis públicas, usadas na preparação
    if (el.id === "link-zip" || el.id === "link-zip-prep") return null;                    // kit (ZIP) já liberado
    if (el.closest("#antes")) return null;                                                 // preparação continua aberta
    const bloco = el.closest("li.bloco");
    if (bloco){
      const b = BLOCOS[+bloco.id.slice(1)];
      if (b && BLOCOS_ABERTOS.includes(b.ini)) return null;
      return b && b.ini >= "11:40" ? praticas : dia;
    }
    return dia;                                                                            // pastas, produtos e demais materiais
  }

  document.querySelectorAll("main a[href]").forEach(el => {
    const t = liberacao(el);
    if (!t || agora >= t) return;
    if (!proxima || t < proxima) proxima = t;
    const s = document.createElement("span");
    s.className = "trancado" + (el.classList.contains("botao") ? " botao desativado" : "");
    s.title = rotulo(t);
    s.innerHTML = el.innerHTML + ' <span class="em-breve">em breve</span>';
    el.replaceWith(s);
  });

  const aviso = document.getElementById("aviso-em-breve");
  if (aviso){
    if (agora >= praticas) aviso.hidden = true;
    else aviso.innerHTML = `<strong>Materiais em breve.</strong> Já estão disponíveis a preparação (aba "Antes da oficina"), o kit (ZIP) e os blocos Fundamentos, Ética e matriz de riscos e Documento da escola. Os demais materiais abrem no dia da oficina, ${d}/${m}; os das práticas, a partir das 11h40.`;
  }
  if (proxima) setInterval(() => { if (new Date() >= proxima) location.reload(); }, 30000);
})();
