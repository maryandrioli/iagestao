/* Painel da oficina. Para complementar, edite apenas a lista BLOCOS abaixo.
   materiais: [texto, caminho] ; caminho vazio = "aguarde". */
const DATA_OFICINA = "2026-11-05";
const BLOCOS = [
  {ini:"09:00", fim:"09:30", titulo:"Acolhida e diagnóstico interativo",
   objetivo:"Levantar conhecimentos prévios e expectativas sobre IA.",
   fazer:["Responder às perguntas pelo celular (Mentimeter ou Kahoot).","Ver o retrato do grupo e os ajustes do dia."],
   materiais:[["Link do diagnóstico",""]]},
  {ini:"09:30", fim:"10:20", titulo:"Fundamentos, panorama e cultura de dados",
   objetivo:"Entender como a IA generativa produz respostas, por que erra e o que isso muda nas decisões.",
   fazer:["Discussão dialogada.","Comparação das lógicas de Claude, ChatGPT, Gemini e Manus.","O gestor como curador de informação."],
   materiais:[["Slides da parte 2","02_fundamentos/slides_parte2_fundamentos.pdf"]]},
  {ini:"10:20", fim:"10:50", titulo:"Ética, inclusão e matriz de riscos",
   objetivo:"Classificar situações concretas por probabilidade e gravidade.",
   fazer:["Em duplas, posicionar casos na matriz.","Consolidar a matriz do grupo, que acompanha o restante do dia."],
   materiais:[["Matriz de riscos (modelo)","03_etica_matriz_riscos/matriz_riscos_modelo.pdf"]]},
  {ini:"10:50", fim:"11:10", titulo:"Coffee break", pausa:true},
  {ini:"11:10", fim:"11:40", titulo:"Documento da escola fictícia",
   objetivo:"Construir coletivamente a escola que servirá de base para os testes.",
   fazer:["Editar missão, visão, valores, princípios, tom de voz, identidade visual e normas."],
   materiais:[["Documento da escola fictícia (modelo)","04_escola_ficticia/escola_ficticia_modelo.pdf"]]},
  {ini:"11:40", fim:"12:30", titulo:"Prática 1: engenharia de prompt e comparação entre IAs",
   objetivo:"Estruturar comandos, criar personas e comparar plataformas.",
   fazer:["Criar a pasta de projeto em cada IA.","Construir três personas.","Executar a mesma tarefa em plataformas distintas e comparar."],
   materiais:[["Fichas de personas e prompts","05_pratica1_prompts_personas/fichas_personas_e_prompts.pdf"],["Quadro comparativo das plataformas",""]]},
  {ini:"12:30", fim:"14:00", titulo:"Almoço", pausa:true},
  {ini:"14:00", fim:"14:40", titulo:"Prática 2: assistentes institucionais e automação",
   objetivo:"Criar assistentes para proposta pedagógica, comunicação e rotinas administrativas.",
   fazer:["Configurar um assistente a partir da receita.","Assistir à demonstração de agente autônomo."],
   materiais:[["Receitas de assistentes","06_pratica2_assistentes/receitas_assistentes.pdf"]]},
  {ini:"14:40", fim:"15:20", titulo:"Prática 3: validação e acompanhamento formativo",
   objetivo:"Transformar um instrumento de conferência em agente revisor.",
   fazer:["Construir o checklist coletivo.","Converter o checklist em agente revisor.","Socializar acertos, erros da IA e ajustes."],
   materiais:[["Instrumento de conferência e roteiro de observação","07_pratica3_validacao/instrumento_conferencia_base.pdf"]]},
  {ini:"15:20", fim:"15:45", titulo:"Laboratório individual",
   objetivo:"Aplicar o que foi aprendido aos documentos da própria escola.",
   fazer:["Trocar o material fictício pelos seus documentos não confidenciais.","Comparar o resultado com o da escola fictícia."],
   materiais:[["Passo a passo do laboratório","08_laboratorio_individual/laboratorio_passo_a_passo.pdf"]]},
  {ini:"15:45", fim:"16:00", titulo:"Coffee break", pausa:true},
  {ini:"16:00", fim:"16:40", titulo:"Governança e gestão de mudança",
   objetivo:"Esboçar o roadmap, a política de uso e o plano de capacitação docente.",
   fazer:["Completar o modelo de política.","Escrever o plano de ação de 30 dias."],
   materiais:[["Modelo de política de uso","09_governanca_mudanca/politica_uso_modelo.pdf"],["Roadmap e plano de 30 dias","09_governanca_mudanca/roadmap_e_plano_30_dias.pdf"]]},
  {ini:"16:40", fim:"17:00", titulo:"Fechamento e materiais de apoio",
   objetivo:"Retomar os produtos do dia e indicar caminhos de continuidade.",
   fazer:["Avaliação da oficina.","Acesso ao kit de apoio."],
   materiais:[["Normativas e leis (PDFs para o NotebookLM)","10_kit_apoio/normativas_leis/"],["Demais itens do kit de apoio",""]]}
];
const LISTAS = {
  antes:["Notebook e carregador separados","Pasta oficina_IA criada com documentos não confidenciais","Login testado no Claude, ChatGPT, Gemini e Manus","Aplicativo do Claude instalado e testado com um PDF","NotebookLM acessado com conta Gmail e notebook \"Normativas da escola\" testado","(Opcional) Extensão do Chrome instalada","(Opcional) Drive, Gmail ou Agenda conectados"],
  produtos:["Assistentes institucionais configurados e testados","Instrumento de validação de documentos","Matriz de riscos consolidada","Esboço do roadmap de implementação","Plano de ação de 30 dias"]
};
const guardar = {
  ler(k){try{return JSON.parse(localStorage.getItem(k)||"{}")}catch(e){return {}}},
  gravar(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
};
const fmt = h => {const [a,b]=h.split(":");return Number(a)+"h"+(b==="00"?"":b)};
const min = h => {const [a,b]=h.split(":").map(Number);return a*60+b};
function montarLinha(){
  const ol=document.getElementById("linha");
  BLOCOS.forEach((b,i)=>{
    const li=document.createElement("li"); li.className="bloco"+(b.pausa?" pausa":""); li.id="b"+i;
    if(b.pausa){li.innerHTML=`<details><summary><span class="hora">${fmt(b.ini)} às ${fmt(b.fim)}</span><span class="titulo">${b.titulo}</span></summary></details>`;ol.appendChild(li);return;}
    const mats=(b.materiais||[]).map(([t,c])=>c?`<li><a href="${c}">${t}</a></li>`:`<li>${t} <span class="etiqueta prep">aguarde</span></li>`).join("");
    const pronto=(b.materiais||[]).every(m=>m[1]);
    li.innerHTML=`<details><summary><span class="hora">${fmt(b.ini)} às ${fmt(b.fim)}</span><span class="titulo">${b.titulo}</span>${pronto?"":'<span class="etiqueta prep">aguarde</span>'}</summary>
      <div class="corpo"><h4>Objetivo</h4><p>${b.objetivo}</p><h4>O que faremos</h4><ul>${b.fazer.map(f=>`<li>${f}</li>`).join("")}</ul><h4>Materiais</h4><ul>${mats}</ul></div></details>`;
    ol.appendChild(li);
  });
}
function atualizarAgora(){
  const el=document.getElementById("agora"), d=new Date();
  const hoje=d.toLocaleDateString("sv-SE"), m=d.getHours()*60+d.getMinutes();
  document.querySelectorAll(".agora-bloco").forEach(x=>x.classList.remove("agora-bloco"));
  if(hoje<DATA_OFICINA){const dias=Math.ceil((new Date(DATA_OFICINA+"T09:00")-d)/864e5);el.innerHTML=`Faltam <b>${dias} dia${dias>1?"s":""}</b>. Confira a aba "Antes da oficina".`;return;}
  if(hoje>DATA_OFICINA){el.innerHTML="Oficina realizada. Os materiais seguem disponíveis abaixo.";return;}
  const i=BLOCOS.findIndex(b=>m>=min(b.ini)&&m<min(b.fim));
  if(i<0){el.innerHTML=m<min("09:00")?"Começamos às <b>9h</b>.":"Encerramos por hoje. Obrigada!";return;}
  const li=document.getElementById("b"+i); li.classList.add("agora-bloco");
  el.innerHTML=`Agora: <b>${BLOCOS[i].titulo}</b> (até ${fmt(BLOCOS[i].fim)})`;
}
function montarListas(){
  document.querySelectorAll("[data-lista]").forEach(ul=>{
    const k="oficina-ia-"+ul.dataset.lista, est=guardar.ler(k);
    LISTAS[ul.dataset.lista].forEach((t,i)=>{
      const li=document.createElement("li");
      li.innerHTML=`<label><input type="checkbox" ${est[i]?"checked":""}><span>${t}</span></label>`;
      li.querySelector("input").addEventListener("change",e=>{est[i]=e.target.checked;guardar.gravar(k,est);progresso();destaque();});
      ul.appendChild(li);
    });
  });
  progresso(); destaque();
}
function progresso(){
  const est=guardar.ler("oficina-ia-produtos"), n=LISTAS.produtos.filter((_,i)=>est[i]).length, t=LISTAS.produtos.length;
  document.getElementById("barra").style.width=(100*n/t)+"%";
  document.getElementById("progresso-texto").textContent=`${n} de ${t} produtos prontos.`;
}
function destaque(){
  const box=document.getElementById("prep"); if(!box) return;
  const hoje=new Date().toLocaleDateString("sv-SE");
  if(hoje>=DATA_OFICINA){box.hidden=true;return;}
  const est=guardar.ler("oficina-ia-antes"), n=LISTAS.antes.filter((_,i)=>est[i]).length;
  document.getElementById("prep-prog").textContent=`${n} de ${LISTAS.antes.length} itens concluídos`;
}
function abrirAba(id){
  document.querySelectorAll(".abas button").forEach(x=>x.setAttribute("aria-selected",x.dataset.aba===id));
  document.querySelectorAll(".aba").forEach(s=>s.classList.toggle("ativa",s.id===id));
}
function abas(){
  const bts=document.querySelectorAll(".abas button");
  bts.forEach(b=>b.addEventListener("click",()=>{
    bts.forEach(x=>x.setAttribute("aria-selected",x===b));
    document.querySelectorAll(".aba").forEach(s=>s.classList.toggle("ativa",s.id===b.dataset.aba));
  }));
}
montarLinha(); montarListas(); abas(); atualizarAgora();
document.querySelectorAll("[data-ir]").forEach(b=>b.addEventListener("click",()=>{abrirAba(b.dataset.ir);document.querySelector(".abas").scrollIntoView({behavior:"smooth"});}));
if(new Date().toLocaleDateString("sv-SE")<DATA_OFICINA) abrirAba("antes"); setInterval(atualizarAgora,60000);
