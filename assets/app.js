/* Página da oficina (v3). Para alterar a programação, edite apenas BLOCOS, PASTAS, NORMATIVAS e LISTAS.
   Roteiro: {t: título, c: caminho sem extensão (gera PDF e Word)}. Material: {t, c, tipo: "exemplo" | "modelo" | "outro"}.
   Os horários existem só aqui, na página; os roteiros em PDF não têm horários. */

const DATA_OFICINA = CONFIG.dataOficina;
const R = "roteiros/", EX = "materiais/escola_EXEMPLO_horizonte/", MO = "materiais/escola_MODELO_para_preencher/";

const NORMATIVAS = [
  ["ECA, Lei nº 8.069/1990", "apoio/normativas_leis/01_leis_federais/1990_lei_8069_ECA.pdf"],
  ["LDB, Lei nº 9.394/1996", "apoio/normativas_leis/01_leis_federais/1996_lei_9394_LDB.pdf"],
  ["Lei Brasileira de Inclusão, Lei nº 13.146/2015", "apoio/normativas_leis/01_leis_federais/2015_lei_13146_LBI.pdf"],
  ["LGPD, Lei nº 13.709/2018", "apoio/normativas_leis/01_leis_federais/2018_lei_13709_LGPD.pdf"],
  ["ECA Digital, Lei nº 15.211/2025", "apoio/normativas_leis/01_leis_federais/2025_lei_15211_ECA_Digital.pdf"],
  ["BNCC (Educação Infantil e Ensino Fundamental), 2018", "apoio/normativas_leis/02_normas_educacao/2018_BNCC_EI_EF.pdf"],
  ["Complemento à BNCC: Computação, 2022", "apoio/normativas_leis/02_normas_educacao/2022_BNCC_Computacao_complemento.pdf"],
  ["Referencial do MEC para uso responsável de IA na educação, 2026", "apoio/normativas_leis/03_dados_e_IA/2026_MEC_Referencial_uso_responsavel_IA_educacao.pdf"]
];

const PASTAS = [
  ["01_perfil_da_escola", "Missão, visão, valores, princípios pedagógicos, tecnologia", "perfil_da_escola", "perfil_da_escola", "Documento da escola; Práticas 1, 2 e 3"],
  ["02_tom_de_voz", "Tom, canais, tamanhos, exemplos", "tom_de_voz", "tom_de_voz", "Documento da escola; Práticas 1 e 2"],
  ["03_identidade_visual", "Cores, fontes, logotipo, imagens", "identidade_visual", "identidade_visual", "Documento da escola; Prática 1"],
  ["04_normas_internas", "Normas, dados e imagem, divulgação, perguntas frequentes", "normas_internas", "normas_internas", "Documento da escola; Práticas 1, 2 e 3"],
  ["05_projetos_e_acoes", "Projetos que podem ser divulgados", "projetos_e_acoes", "projetos_e_acoes", "Práticas 1, 2 e 3"],
  ["06_pedagogico", "Modelo de plano de aula da escola", "plano_de_aula_dados_da_horta", "modelo_plano_de_aula", "Práticas 2 e 3"],
  ["07_assistentes", "Instruções fixas de assistentes e revisores", "receitas_assistentes_horizonte", "receita_assistente_modelo", "Práticas 2 e 3; laboratório"],
  ["08_checklists_revisao", "Áreas de atenção, checklists, documentos de teste", "areas_de_atencao", "checklist_modelo", "Prática 3"],
  ["09_riscos_e_governanca", "Situações de risco, matriz, política, roadmap, contas, formação", "matriz_de_riscos", "matriz_de_riscos", "Ética e matriz; governança"],
  ["10_producoes", "Onde salvar os resultados (exemplos na versão EXEMPLO)", "pratica1A_carrossel_projetos", "", "Todas as práticas"],
  ["11_gestao_e_indicadores", "Indicadores agregados: matrículas, rematrícula, inadimplência, atendimento", "indicadores_horizonte_2026", "indicadores_modelo", "Prática 1, roteiro C"]
];

const BLOCOS = [
  {ini:"09:00", fim:"09:30", titulo:"Acolhida e diagnóstico interativo", especial:"diagnostico",
   fazer:"Responder pelo celular a um questionário anônimo e ver o retrato do grupo.",
   roteiros:[{t:"Acolhida e diagnóstico", c:R+"01_acolhida_diagnostico"}]},
  {ini:"09:30", fim:"10:20", titulo:"Fundamentos, panorama e cultura de dados",
   fazer:"Apresentação dialogada: como a IA generativa funciona, as quatro plataformas e o gestor como curador de informação e decisor orientado a dados.",
   roteiros:[{t:"Fundamentos", c:R+"02_fundamentos"}],
   materiais:[{t:"Guia de introdução: a tela da IA e dicas de prompt", c:"apoio/fundamentos/guia_introducao_tela_da_ia.pdf"}, {t:"Slides", c:"apoio/fundamentos/slides_fundamentos.pdf"}, {t:"Quadro comparativo das plataformas", c:"apoio/quadro_comparativo_plataformas.pdf"}, {t:"Vídeo: como a IA funciona", c:"apoio/fundamentos/conceitos_parte1_como_a_ia_funciona.mp4"}, {t:"Vídeo: do assistente ao agente", c:"apoio/fundamentos/conceitos_parte2_do_assistente_ao_agente.mp4"}]},
  {ini:"10:20", fim:"10:50", titulo:"Ética, inclusão e matriz de riscos",
   fazer:"Em dupla, classificar situações por probabilidade e impacto em uma matriz 5 × 5 com cores (dados pessoais, vieses, equidade), consultar as normativas e configurar o monitoramento de notícias.",
   roteiros:[{t:"Ética, inclusão e matriz de riscos", c:R+"03_etica_matriz_de_riscos"}],
   materiais:[{t:"Situações de risco para inspirar", c:EX+"09_riscos_e_governanca/catalogo_situacoes_de_risco.pdf", tipo:"exemplo"}, {t:"Matriz de riscos para preencher", c:MO+"09_riscos_e_governanca/matriz_de_riscos.docx", tipo:"modelo"}, {t:"Matriz de riscos preenchida", c:EX+"09_riscos_e_governanca/matriz_de_riscos.pdf", tipo:"exemplo"}]},
  {ini:"10:50", fim:"11:10", titulo:"Coffee break", pausa:true},
  {ini:"11:10", fim:"11:40", titulo:"Documento da escola",
   fazer:"Edição colaborativa dos documentos que descrevem a escola: missão, visão, valores, princípios, tom de voz, identidade visual e normas internas.",
   roteiros:[{t:"Documento da escola", c:R+"04_documento_da_escola"}],
   materiais:[{t:"Pastas 01 a 04 preenchidas (Escola Horizonte)", c:EX, tipo:"exemplo"}, {t:"Pastas 01 a 04 para preencher", c:MO, tipo:"modelo"}]},
  {ini:"11:40", fim:"12:30", titulo:"Prática 1: engenharia de prompt e comparação entre IAs",
   fazer:"Escolha um roteiro, assuma o papel do seu perfil (marketing, pedagógico ou administrativo) e faça a sequência completa.",
   escolha:true,
   roteiros:[{t:"Roteiro A: carrossel para apresentar os projetos da escola", c:R+"05A_pratica1_carrossel_projetos", desc:"Instagram, banner ou slides, no tom e nas cores da escola. Indicado para marketing, comunicação e pedagógico."},
             {t:"Roteiro B: página de divulgação de palestra e formulário de inscrição", c:R+"05B_pratica1_pagina_e_formulario_palestra", desc:"Landing page, Google Formulários e análise das inscrições. Indicado para relacionamento e pedagógico."},
             {t:"Roteiro C: indicadores de gestão e relatório para a mantenedora", c:R+"05C_pratica1_indicadores_relatorio_mantenedora", desc:"Planilha de indicadores agregados e relatório de uma página. Indicado para direção, mantenedora, administrativo, financeiro, RH e TI."}],
   materiais:[{t:"Exemplo: carrossel de projetos", c:EX+"10_producoes/pratica1A_carrossel_projetos.pdf", tipo:"exemplo"}, {t:"Exemplo: página da palestra", c:EX+"10_producoes/pratica1B_landing_page_palestra.html", tipo:"exemplo"}, {t:"Exemplo: formulário de inscrição", c:EX+"10_producoes/pratica1B_formulario_inscricao.pdf", tipo:"exemplo"}, {t:"Inscrições fictícias para analisar (CSV)", c:EX+"10_producoes/pratica1B_inscricoes_exemplo.csv", tipo:"exemplo"}, {t:"Planilha de indicadores fictícios", c:EX+"11_gestao_e_indicadores/indicadores_horizonte_2026.xlsx", tipo:"exemplo"}, {t:"Planilha de indicadores para preencher", c:MO+"11_gestao_e_indicadores/indicadores_modelo.xlsx", tipo:"modelo"}, {t:"Exemplo: relatório para a mantenedora", c:EX+"10_producoes/pratica1C_relatorio_indicadores.pdf", tipo:"exemplo"}]},
  {ini:"12:30", fim:"14:00", titulo:"Almoço", pausa:true},
  {ini:"14:00", fim:"14:40", titulo:"Prática 2: assistentes institucionais e automação",
   fazer:"A escola vai integrar a BNCC Computação aos projetos, respeitando a LGPD e o ECA Digital. Escolha um roteiro: configure o assistente e produza o material. No fim, demonstração do agente autônomo.",
   escolha:true,
   roteiros:[{t:"Roteiro A: assistente de formação e material sobre BNCC Computação", c:R+"06A_pratica2_assistente_formacao_bncc_computacao", desc:"Oficina para professores em slides ou vídeo, com checagem LGPD e ECA Digital."},
             {t:"Roteiro B: assistente de comunicação e comunicado às famílias", c:R+"06B_pratica2_assistente_comunicacao_familias", desc:"E-mail institucional e post, com checagem LGPD e ECA Digital."},
             {t:"Demonstração: agente que executa tarefas com aprovação ◆", c:R+"06C_pratica2_demonstracao_agente", desc:"Para acompanhar; quem tem plano pago pode experimentar."}],
   materiais:[{t:"Receitas dos assistentes", c:EX+"07_assistentes/receitas_assistentes_horizonte.pdf", tipo:"exemplo"}, {t:"Receita em branco", c:MO+"07_assistentes/receita_assistente_modelo.docx", tipo:"modelo"}, {t:"BNCC Computação 6º ao 9º ano (planilha por ano)", c:"apoio/normativas_recortes/BNCC_Computacao_EF_II_6a9ano.xlsx"}, {t:"Exemplo: oficina BNCC Computação", c:EX+"10_producoes/pratica2A_oficina_bncc_computacao.pdf", tipo:"exemplo"}, {t:"Exemplo: comunicado às famílias", c:EX+"10_producoes/pratica2B_comunicado_familias.pdf", tipo:"exemplo"}]},
  {ini:"14:40", fim:"15:20", titulo:"Prática 3: validação e acompanhamento formativo",
   fazer:"Escolha o revisor que mais interessa: construa o checklist, transforme-o em agente revisor e teste com um documento que tem problemas de propósito.",
   escolha:true,
   roteiros:[{t:"Roteiro A: revisor LGPD e ECA Digital", c:R+"07A_pratica3_revisor_lgpd_eca_digital", desc:"Contratos-modelo, formulários e comunicação."},
             {t:"Roteiro B: revisor BNCC Computação", c:R+"07B_pratica3_revisor_bncc_computacao", desc:"Planos e projetos."},
             {t:"Roteiro C: revisor de princípios e regras da escola", c:R+"07C_pratica3_revisor_principios_escola", desc:"Comunicados e documentos."},
             {t:"Roteiro D: revisor de plano de aula", c:R+"07D_pratica3_revisor_plano_de_aula", desc:"Planos, com devolutiva formativa ao professor."}],
   materiais:[{t:"Áreas de atenção na conferência", c:EX+"08_checklists_revisao/areas_de_atencao.pdf", tipo:"exemplo"}, {t:"Checklists preenchidos (pasta 08)", c:EX+"08_checklists_revisao/", tipo:"exemplo"}, {t:"Checklist em branco", c:MO+"08_checklists_revisao/checklist_modelo.docx", tipo:"modelo"}, {t:"Documentos para testar", c:EX+"08_checklists_revisao/documentos_para_testar/", tipo:"exemplo"}, {t:"Gabarito dos documentos de teste", c:EX+"08_checklists_revisao/gabarito_documentos_teste.pdf", tipo:"exemplo"}, {t:"BNCC Computação 6º ao 9º ano (planilha por ano)", c:"apoio/normativas_recortes/BNCC_Computacao_EF_II_6a9ano.xlsx"}]},
  {ini:"15:20", fim:"15:45", titulo:"Laboratório individual",
   fazer:"Cada gestor refaz uma atividade com documentos públicos da própria escola, com acompanhamento da formadora.",
   roteiros:[{t:"Laboratório individual", c:R+"08_laboratorio_individual"}],
   materiais:[{t:"Pastas para preencher", c:MO, tipo:"modelo"}, {t:"Checklist de anonimização", c:"apoio/checklist_anonimizacao.pdf"}]},
  {ini:"15:45", fim:"16:00", titulo:"Coffee break", pausa:true},
  {ini:"16:00", fim:"16:40", titulo:"Governança e gestão de mudança",
   fazer:"Roadmap de implementação, contas corporativas, política de uso, formação do corpo docente e plano de ação de 30 dias.",
   roteiros:[{t:"Governança, política e plano de ação", c:R+"09_governanca_plano_de_acao"}],
   materiais:[{t:"Pasta 09 preenchida", c:EX+"09_riscos_e_governanca/", tipo:"exemplo"}, {t:"Pasta 09 para preencher", c:MO+"09_riscos_e_governanca/", tipo:"modelo"}, {t:"Política institucional completa (editável)", c:"apoio/politica_institucional_editavel/"}, {t:"Recortes das normativas para anexar à IA", c:"apoio/normativas_recortes/"}]},
  {ini:"16:40", fim:"17:00", titulo:"Fechamento e materiais de apoio", especial:"fechamento",
   fazer:"Diagnóstico final, avaliação da oficina e indicação dos materiais de apoio.",
   roteiros:[{t:"Fechamento e materiais de apoio", c:R+"10_fechamento_materiais_de_apoio"}],
   materiais:[{normativas:true}, {t:"Recortes das normativas para anexar à IA", c:"apoio/normativas_recortes/"}, {t:"Quadro comparativo das plataformas", c:"apoio/quadro_comparativo_plataformas.pdf"}]}
];

const LISTAS = {
  antes:[["Contas criadas e login testado no Claude, no ChatGPT, no Gemini e no Manus",""],
    ["Aplicativo do Claude instalado e testado com um PDF","Peça: \"resuma este documento em cinco linhas\"."],
    ["Notebook \"Normativas da escola\" criado no Gemini Notebook e testado","Confira a citação clicando no número entre colchetes."],
    ["Pasta oficina_IA com as pastas EXEMPLO e MODELO","Baixe o kit (ZIP) e descompacte."],
    ["(Opcional) Pasta MODELO com dados públicos da sua escola","Documentos 01 a 05."],
    ["(Opcional) Extensão do Claude para o Chrome instalada ◆","Haverá demonstração."],
    ["Notebook e carregador separados para o dia 5/11","Tablet e celular não substituem o computador."]],
  produtos:[["Assistentes institucionais configurados e testados","Práticas 2 e 3; laboratório"],
    ["Instrumento de validação: checklist e agente revisor","Prática 3"],
    ["Matriz de riscos","Ética, inclusão e matriz de riscos"],
    ["Diretrizes iniciais de uso (política, seções 1 a 5)","Governança"],
    ["Roadmap de implementação","Governança"],
    ["Plano de ação de 30 dias","Governança"],
    ["Pastas da escola e uma produção (carrossel ou página com formulário)","Documento da escola; Prática 1"]]
};

/* ------------------------------------------------------------------ utilidades */
const guardar = {
  ler(k){try{return JSON.parse(localStorage.getItem(k)||"{}")}catch(e){return {}}},
  gravar(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
};
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const fmt = h => {const [a,b]=h.split(":");return Number(a)+"h"+(b==="00"?"":b)};
const min = h => {const [a,b]=h.split(":").map(Number);return a*60+b};
const hoje = () => new Date().toLocaleDateString("sv-SE");
function formato(c){
  if(c.endsWith("/")) return ["Pasta","pasta"];
  const e=(c.split(".").pop()||"").toLowerCase();
  return {pdf:["PDF",""],docx:["Word","word"],pptx:["PowerPoint","word"],xlsx:["Planilha","xlsx"],csv:["Planilha","xlsx"],mp4:["Vídeo","video"],html:["Página","pasta"],md:["Texto","pasta"]}[e]||["Arquivo","pasta"];
}
function linkArquivo(t,c,alt){
  const [nome,cls]=formato(c);
  const alvo=/(\.(pdf|html|md|mp4)|\/)$/i.test(c)?' target="_blank" rel="noopener"':' download';
  const href=c.endsWith("/")?c+"index.html":c;
  let h=`<a href="${esc(href)}"${alvo}>${esc(t)} <span class="fmt ${cls}">${nome}</span></a>`;
  if(alt){const [n2]=formato(alt);h+=` <a class="alt" href="${esc(alt)}" download>${n2}</a>`;}
  return h;
}
function badge(tipo){return {guia:'<span class="badge guia">Roteiro</span>',modelo:'<span class="badge modelo">Modelo</span>',exemplo:'<span class="badge exemplo">Exemplo</span>'}[tipo]||'<span class="badge outro">Apoio</span>';}

/* ------------------------------------------------------------------ montagem */
function itemMaterial(m){
  if(m.normativas) return `<li>${badge("outro")}<strong>Normativas e leis</strong><span class="desc"><ul class="links">${NORMATIVAS.map(([t,c])=>`<li>${linkArquivo(t,c)}</li>`).join("")}</ul></span></li>`;
  return `<li>${badge(m.tipo)}${linkArquivo(m.t,m.c)}</li>`;
}
function itemRoteiro(r){
  return `<li>${badge("guia")}${linkArquivo(r.t,r.c+".pdf",r.c+".docx")}${r.desc?`<span class="desc">${esc(r.desc)}</span>`:""}</li>`;
}
function cartaoFormulario(titulo, link, texto, idQr){
  const tem=!!link;
  return `<div class="form-card"><div><h5>${esc(titulo)}</h5><p>${texto}</p>
    ${tem?`<a class="botao" href="${esc(link)}" target="_blank" rel="noopener">Abrir o formulário</a>`:`<span class="botao desativado">Link em breve</span> <span class="pendente">O link e o QR code aparecem aqui no dia.</span>`}</div>
    ${tem?`<div class="qr" id="${idQr}" aria-label="QR code do formulário"></div>`:""}</div>`;
}
function especial(b){
  const L=CONFIG.links;
  if(b.especial==="diagnostico") return cartaoFormulario("Diagnóstico: início da oficina", L.diagnostico, `Escolha <strong>Início da oficina</strong>. Cerca de 7 minutos, anônimo.<span class="codigo"><strong>Código pessoal:</strong> duas primeiras letras do nome da sua mãe + dia do seu nascimento com dois dígitos (exemplo: MA07). Anote: você vai usá-lo no fechamento.</span>`, "qr-diag-inicio");
  if(b.especial==="fechamento") return cartaoFormulario("1. Diagnóstico: fim da oficina", L.diagnostico, `Mesmo link da manhã. Escolha <strong>Fim da oficina</strong> e use o <strong>mesmo código pessoal</strong>.`, "qr-diag-fim")
      + cartaoFormulario("2. Avaliação da oficina", L.avaliacao, `Formulário separado, com o mesmo código pessoal. Cerca de 4 minutos.`, "qr-aval");
  return "";
}
function montarLinha(){
  const ol=document.getElementById("linha");
  BLOCOS.forEach((b,i)=>{
    const li=document.createElement("li"); li.className="bloco"+(b.pausa?" pausa":""); li.id="b"+i;
    if(b.pausa){li.innerHTML=`<details><summary class="cab"><span class="hora">${fmt(b.ini)} às ${fmt(b.fim)}</span><span class="titulo">${esc(b.titulo)}</span></summary></details>`;ol.appendChild(li);return;}
    const mats=(b.materiais||[]).map(itemMaterial).join("");
    li.innerHTML=`<details><summary class="cab"><span class="hora">${fmt(b.ini)} às ${fmt(b.fim)}</span><span class="titulo">${esc(b.titulo)}</span><span class="etiqueta agora-etiqueta" hidden>Em andamento</span></summary>
      <div class="corpo">
        <h4>O que você vai fazer</h4><p>${esc(b.fazer)}</p>
        ${especial(b)}
        <h4>${b.escolha?"Escolha um roteiro e faça a sequência completa":"Roteiro da atividade"}</h4><ul class="mats">${b.roteiros.map(itemRoteiro).join("")}</ul>
        ${mats?`<h4>Materiais</h4><ul class="mats">${mats}</ul>`:""}
      </div></details>`;
    ol.appendChild(li);
  });
}
function montarPastas(){
  const tb=document.querySelector("#tabela-pastas tbody");
  tb.innerHTML=PASTAS.map(([p,o,e,m,u])=>{
    const fe=e?`<a href="${EX}${p}/index.html" target="_blank" rel="noopener">abrir</a>`:"—";
    const fm=`<a href="${MO}${p}/index.html" target="_blank" rel="noopener">abrir</a>`;
    return `<tr><td><code>${p}</code></td><td>${esc(o)}</td><td>${fe}</td><td>${fm}</td><td>${esc(u)}</td></tr>`;
  }).join("");
}
function montarNormativas(){
  const el=document.getElementById("lista-normativas");
  if(el) el.innerHTML=NORMATIVAS.map(([t,c])=>`<li>${linkArquivo(t,c)}</li>`).join("");
}
function montarListas(){
  document.querySelectorAll("[data-lista]").forEach(ul=>{
    const k="oficina-ia-v3-"+ul.dataset.lista, est=guardar.ler(k);
    LISTAS[ul.dataset.lista].forEach(([t,sub],i)=>{
      const li=document.createElement("li");
      li.innerHTML=`<label><input type="checkbox" ${est[i]?"checked":""}><span>${esc(t)}${sub?`<small>${esc(sub)}</small>`:""}</span></label>`;
      li.querySelector("input").addEventListener("change",e=>{est[i]=e.target.checked;guardar.gravar(k,est);progresso();});
      ul.appendChild(li);
    });
  });
  progresso();
}
function progresso(){
  const est=guardar.ler("oficina-ia-v3-produtos"), n=LISTAS.produtos.filter((_,i)=>est[i]).length, t=LISTAS.produtos.length;
  const pct=Math.round(100*n/t);
  document.getElementById("barra").style.width=pct+"%";
  document.querySelector(".progresso").setAttribute("aria-valuenow",pct);
  document.getElementById("progresso-texto").textContent=`${n} de ${t} produtos prontos.`;
  const ea=guardar.ler("oficina-ia-v3-antes"), na=LISTAS.antes.filter((_,i)=>ea[i]).length;
  const pp=document.getElementById("prep-prog");
  if(pp) pp.textContent=na===LISTAS.antes.length?"Tudo pronto para o dia 5!":`${na} de ${LISTAS.antes.length} itens concluídos.`;
}
function atualizarAgora(){
  const el=document.getElementById("agora"), d=new Date(), h=hoje(), m=d.getHours()*60+d.getMinutes();
  document.querySelectorAll(".agora-bloco").forEach(x=>x.classList.remove("agora-bloco"));
  document.querySelectorAll(".agora-etiqueta").forEach(x=>x.hidden=true);
  if(h<DATA_OFICINA){const dias=Math.ceil((new Date(DATA_OFICINA+"T09:00")-d)/864e5);el.innerHTML=`Faltam <b>${dias} dia${dias>1?"s":""}</b> para a oficina. Comece pela aba "Antes da oficina".`;return;}
  if(h>DATA_OFICINA){el.innerHTML="Oficina realizada. Os materiais continuam disponíveis nesta página.";return;}
  const i=BLOCOS.findIndex(b=>m>=min(b.ini)&&m<min(b.fim));
  if(i<0){el.innerHTML=m<min("09:00")?"Hoje é o dia. Começamos às <b>9h</b>.":"Encerramos por hoje. Obrigada! Os materiais continuam aqui.";return;}
  const li=document.getElementById("b"+i); li.classList.add("agora-bloco");
  const et=li.querySelector(".agora-etiqueta"); if(et) et.hidden=false;
  el.innerHTML=`Agora: <b>${esc(BLOCOS[i].titulo)}</b> (até ${fmt(BLOCOS[i].fim)})`;
}
function abrirAba(id, foco){
  const bts=[...document.querySelectorAll(".abas button")];
  if(!bts.some(b=>b.dataset.aba===id)) return;
  bts.forEach(x=>{const sel=x.dataset.aba===id;x.setAttribute("aria-selected",sel);x.tabIndex=sel?0:-1;if(sel&&foco)x.focus();});
  document.querySelectorAll(".aba").forEach(s=>s.classList.toggle("ativa",s.id===id));
  if(history.replaceState) history.replaceState(null,"","#"+id);
}
function abas(){
  const bts=[...document.querySelectorAll(".abas button")];
  bts.forEach((b,i)=>{
    b.addEventListener("click",()=>abrirAba(b.dataset.aba));
    b.addEventListener("keydown",e=>{
      if(e.key==="ArrowRight"||e.key==="ArrowLeft"){e.preventDefault();const j=(i+(e.key==="ArrowRight"?1:-1)+bts.length)%bts.length;abrirAba(bts[j].dataset.aba,true);}
    });
  });
  document.querySelectorAll('a[href="#pastas"]').forEach(a=>a.addEventListener("click",e=>{e.preventDefault();abrirAba("pastas");}));
}
function rota(){
  const h=location.hash.replace("#","");
  if(/^b\d+$/.test(h)){abrirAba("programacao");const d=document.querySelector("#"+h+" details");if(d){d.open=true;document.getElementById(h).scrollIntoView();}return;}
  if(h&&document.getElementById(h)&&document.getElementById(h).classList.contains("aba")){abrirAba(h);return;}
  abrirAba(hoje()<DATA_OFICINA?"antes":"programacao");
}
function qr(){
  const alvos=[["qr-diag-inicio",CONFIG.links.diagnostico],["qr-diag-fim",CONFIG.links.diagnostico],["qr-aval",CONFIG.links.avaliacao]].filter(([id,l])=>l&&document.getElementById(id));
  if(!alvos.length) return;
  const s=document.createElement("script"); s.src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
  s.onload=()=>alvos.forEach(([id,l])=>{try{new QRCode(document.getElementById(id),{text:l,width:150,height:150,correctLevel:QRCode.CorrectLevel.M});}catch(e){}});
  s.onerror=()=>alvos.forEach(([id])=>{document.getElementById(id).remove();});
  document.head.appendChild(s);
}
function config(){
  ["link-zip","link-zip-prep"].forEach(id=>{const z=document.getElementById(id); if(!z) return;
    if(CONFIG.links.zip){z.href=CONFIG.links.zip;}else{z.classList.add("desativado");z.textContent="Kit (ZIP): em breve";}});
  const c=document.getElementById("contato"); if(c){c.href="mailto:"+CONFIG.contato;c.textContent=CONFIG.contato;}
  const p=document.getElementById("link-pagina"); if(p){p.href=CONFIG.pagina;p.textContent=CONFIG.pagina.replace(/^https?:\/\//,"").replace(/\/$/,"");}
  document.getElementById("expandir").addEventListener("click",()=>document.querySelectorAll("#linha details").forEach(d=>d.open=true));
  document.getElementById("recolher").addEventListener("click",()=>document.querySelectorAll("#linha details").forEach(d=>d.open=false));
  document.getElementById("imprimir").addEventListener("click",()=>{document.querySelectorAll("#linha details").forEach(d=>d.open=true);window.print();});
}
montarLinha(); montarPastas(); montarNormativas(); montarListas(); abas(); config(); rota(); atualizarAgora(); qr();
window.addEventListener("hashchange",rota);
setInterval(atualizarAgora,60000);
