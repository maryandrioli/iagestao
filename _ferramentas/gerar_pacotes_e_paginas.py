#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Gera, a partir das pastas de atividade da v4: o zip de cada atividade, a página index.html de cada atividade
(com prompts copiáveis) e a página inicial. Requer python-docx. Uso: python3 _ferramentas/gerar_pacotes_e_paginas.py
Os PDFs de visualização (pastas visualizar_pdf) e os PDFs dos roteiros são gerados à parte (LibreOffice)."""
import os, re, sys, glob, html, zipfile, json
from docx import Document

RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
os.chdir(RAIZ)
CFG = json.load(open("config.json", encoding="utf-8"))

BUCKETS = [("guias_de_apoio","Guias de apoio"),("exemplo_preenchido","Exemplo preenchido (Escola Horizonte)"),
 ("para_preencher","Para preencher com a sua escola"),("fontes_para_anexar","Fontes para anexar à IA"),
 ("documentos_de_teste","Documentos de teste (com problemas de propósito)"),("normativas_para_o_notebook","Normas para o notebook do Gemini"),
 ("para_levar_para_a_escola","Para levar para a escola")]
BLOCOS = [
 ("09:30","10:20","Fundamentos, panorama e cultura de dados","Apresentação dialogada sobre como a IA generativa funciona, as quatro plataformas e o papel do gestor como curador de informação e decisor orientado por dados.",["02_fundamentos"],False),
 ("10:20","10:50","Ética, inclusão e matriz de riscos","Em dupla, classificar situações por probabilidade e impacto em uma matriz 5 × 5, consultar as normativas e configurar o monitoramento de notícias.",["03_etica_matriz_riscos"],False),
 ("10:50","11:10","Coffee break","",[],False),
 ("11:10","11:40","Documento da escola","Edição colaborativa dos documentos que descrevem a escola: perfil, tom de voz, identidade visual e normas internas.",["04_documento_da_escola"],False),
 ("11:40","12:30","Prática 1: engenharia de prompt e comparação entre IAs","Escolha um roteiro, assuma o papel do seu perfil (comunicação, pedagógico ou administrativo) e faça a sequência completa.",["05A_carrossel_projetos","05B_pagina_formulario_palestra","05C_indicadores_relatorio","05D_painel_indicadores"],True),
 ("12:30","14:00","Almoço","",[],False),
 ("14:00","14:40","Prática 2: assistentes institucionais e automação","A escola integra a BNCC Computação aos projetos, respeitando a LGPD e o ECA Digital. Escolha um roteiro; no fim, demonstração de um agente.",["06A_assistente_formacao_bncc","06B_assistente_comunicacao","06C_demonstracao_agente"],True),
 ("14:40","15:20","Prática 3: validação e acompanhamento formativo","Escolha o revisor que mais interessa: construa o checklist, transforme-o em revisor e teste com um documento que tem problemas de propósito.",["07A_revisor_lgpd_eca_digital","07B_revisor_bncc_computacao","07C_revisor_principios_escola","07D_revisor_plano_aula"],True),
 ("15:20","15:45","Laboratório individual","Refazer uma atividade com documentos públicos da própria escola, ou usar a receita de ata de reunião.",["08_laboratorio_individual"],False),
 ("15:45","16:00","Coffee break","",[],False),
 ("16:00","16:40","Governança e gestão de mudança","Roadmap, contas, política de uso, formação docente e plano de ação de 30 dias.",["09_governanca_plano_acao"],False),
 ("16:40","17:00","Fechamento e materiais de apoio","Materiais de continuidade para levar para a escola e orientações para refazer as atividades com a equipe.",["10_fechamento"],False),
]
esc = html.escape

def atividades():
    return sorted(d for d in os.listdir(".") if re.match(r"^\d\d[A-D]?_", d) and os.path.isdir(d))

def titulo(p):
    d = Document(glob.glob(f"_ferramentas/roteiros_fonte/roteiro_{p}.docx")[0])
    return d.paragraphs[0].text.strip()

def resumo(p):
    d = Document(glob.glob(f"_ferramentas/roteiros_fonte/roteiro_{p}.docx")[0]); out = {}
    for t in d.tables:
        for r in t.rows:
            if len(r.cells) == 2 and r.cells[0].text.strip() in ("Nesta atividade você vai", "Você vai aprender a", "Ao final, você terá"):
                out[r.cells[0].text.strip()] = [x.strip().lstrip("• ").strip() for x in r.cells[1].text.split("\n") if x.strip()]
    ent = ""
    for t in d.tables:
        tx = t.cell(0, 0).text
        m = re.search(r"Você entrega:\s*(.+)", tx)
        if m: ent = m.group(1).strip(); break
    return out, ent

def prompts(p):
    d = Document(glob.glob(f"_ferramentas/roteiros_fonte/roteiro_{p}.docx")[0]); res = []
    for t in d.tables:
        ps = t.cell(0, 0).paragraphs
        if not ps or not ps[0].text.strip().startswith("▶ "): continue
        head = ps[0].text.strip()[2:].strip().capitalize() if False else ps[0].text.strip()[2:].strip()
        obter = anexe = ""; lines = []; on = False
        for q in ps[1:]:
            tx = q.text.strip()
            if tx.startswith("O que você vai obter:"): obter = tx.split(":", 1)[1].strip()
            elif tx.startswith("Anexe ou cite:"): anexe = tx.split(":", 1)[1].strip()
            elif tx == "Prompt:": on = True
            elif on and tx: lines.append(tx)
        res.append((head, obter, anexe, lines))
    return res

def tamanho(f):
    n = os.path.getsize(f)
    return f"{n/1024/1024:.1f} MB" if n > 1024*1024 else f"{max(1,round(n/1024))} KB"

def zips(p):
    out = []
    ro = glob.glob(f"_ferramentas/roteiros_fonte/roteiro_{p}.docx")[0]
    if p.startswith("00_"):
        for nome, bucket in (("pacote_00a_guias_de_apoio.zip", "guias_de_apoio"), ("pacote_00b_normativas_para_o_notebook.zip", "normativas_para_o_notebook")):
            z = f"{p}/{nome}"
            with zipfile.ZipFile(z, "w", zipfile.ZIP_DEFLATED) as zf:
                for f in sorted(glob.glob(f"{p}/arquivos/{bucket}/**/*", recursive=True)):
                    if os.path.isfile(f): zf.write(f, os.path.relpath(f, p))
            out.append((nome, bucket))
        return out
    nome = f"pacote_{p}.zip"; z = f"{p}/{nome}"
    with zipfile.ZipFile(z, "w", zipfile.ZIP_DEFLATED) as zf:
        zf.write(ro[:-5].replace("_ferramentas/roteiros_fonte/",p+"/")+".pdf", f"roteiro_{p}.pdf")
        for f in sorted(glob.glob(f"{p}/arquivos/**/*", recursive=True)):
            if os.path.isfile(f): zf.write(f, os.path.relpath(f, p))
    out.append((nome, None)); return out

def arquivos(p):
    res = {}
    for b, rot in BUCKETS:
        base = f"{p}/arquivos/{b}"
        if not os.path.isdir(base): continue
        itens = []
        for f in sorted(glob.glob(base + "/**/*", recursive=True)):
            if not os.path.isfile(f): continue
            rel = os.path.relpath(f, base)
            stem = os.path.splitext(rel)[0]
            pdf = f"{p}/visualizar_pdf/{b}/{stem}.pdf"
            itens.append((rel, f"arquivos/{b}/{rel}", f"visualizar_pdf/{b}/{stem}.pdf" if os.path.exists(pdf) else None, tamanho(f)))
        if itens: res[b] = (rot, itens)
    return res

CSS_LINK = '<link rel="stylesheet" href="{r}assets/estilo.css">'
def cabeca(tit, r=""):
    return f'<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{esc(tit)}</title>{CSS_LINK.format(r=r)}</head><body>'

def pagina_atividade(p):
    tit = titulo(p); res, ent = resumo(p); pr = prompts(p); ar = arquivos(p); zs = zips(p)
    ro = os.path.basename(glob.glob(f"_ferramentas/roteiros_fonte/roteiro_{p}.docx")[0])[:-5]
    h = [cabeca(tit + " | Humus", "../"), '<header class="topo"><a class="voltar" href="../index.html#programacao">&larr; Programação</a>',
         f'<h1>{esc(tit)}</h1>']
    if ent: h.append(f'<p class="entrega"><strong>Você entrega:</strong> {esc(ent)}</p>')
    h.append('</header><main>')
    if res:
        h.append('<section class="cartao"><h2>Sobre a atividade</h2>')
        for k, v in res.items():
            h.append(f'<h3>{esc(k)}</h3>' + ('<ul>' + ''.join(f'<li>{esc(x)}</li>' for x in v) + '</ul>' if len(v) > 1 else f'<p>{esc(v[0])}</p>'))
        h.append('</section>')
    h.append('<section class="cartao" id="baixar"><h2>Arquivos desta atividade</h2><p>Baixe somente o pacote desta atividade. O zip reúne os documentos editáveis; a pasta abaixo permite visualizar cada arquivo em PDF antes de baixar.</p><div class="botoes">')
    for nome, b in zs:
        rot = dict(BUCKETS).get(b, "Pacote completo da atividade") if b else "Pacote completo da atividade (zip)"
        h.append(f'<a class="botao" href="{esc(nome)}" download>{esc(rot)} <small>{tamanho(p+"/"+nome)}</small></a>')
    h.append(f'<a class="botao sec" href="{ro}.pdf">Roteiro em PDF</a></div>')
    for b, (rot, itens) in ar.items():
        h.append(f'<h3>{esc(rot)}</h3><ul class="arqs">')
        for rel, href, pdf, tam in itens:
            links = f'<a href="{esc(href)}">{esc(rel)}</a>'
            if pdf: links += f' <a class="pdf" href="{esc(pdf)}">ver em PDF</a>'
            h.append(f'<li>{links} <small>{tam}</small></li>')
        h.append('</ul>')
    vids = sorted(glob.glob(f"{p}/videos/*.mp4"))
    if vids:
        h.append('<h3>Vídeos</h3>')
        for v in vids:
            n = os.path.basename(v); legenda = n[:-4] + ".srt"
            h.append(f'<figure><video controls preload="none" src="videos/{esc(n)}"></video><figcaption>{esc(n[:-4].replace("_"," "))} ' + (f'<a href="videos/{esc(legenda)}">legenda (.srt)</a>' if os.path.exists(f"{p}/videos/{legenda}") else '') + '</figcaption></figure>')
    h.append('</section>')
    if pr:
        h.append('<section class="cartao" id="prompts"><h2>Prompts desta atividade</h2><p>Copie o texto, troque o que está entre [colchetes] pelos dados da sua escola e apague os colchetes. O passo a passo completo está no roteiro em PDF.</p>')
        for i, (head, obter, anexe, lines) in enumerate(pr):
            h.append(f'<article class="prompt"><h3>{esc(head.capitalize() if head.isupper() else head)}</h3>')
            if obter: h.append(f'<p><strong>O que você vai obter:</strong> {esc(obter)}</p>')
            if anexe: h.append(f'<p><strong>Anexe ou cite:</strong> {esc(anexe)}</p>')
            corpo = "\n".join(lines)
            corpo_h = re.sub(r"(\[[^\]]+\])", r'<mark>\1</mark>', esc(corpo))
            h.append(f'<button class="copiar" type="button" data-alvo="p{i}">Copiar prompt</button><pre id="p{i}">{corpo_h}</pre></article>')
        h.append('</section>')
    h.append('<p class="rodape-voltar"><a class="botao sec" href="../index.html#programacao">&larr; Voltar à programação</a></p></main><footer>Oficina elaborada por Mary Grace Pereira Andrioli, contou com apoio técnico e revisão de Mauricio Andrea Andrioli e foi desenhada inicialmente para formação presencial de gestores promovida pela <a href="https://humus.com.br/">Humus Educação</a>.</footer>')
    h.append('<script src="../assets/copiar.js"></script></body></html>')
    open(f"{p}/index.html", "w", encoding="utf-8").write("\n".join(h))

def pagina_inicial():
    c = CFG
    h = [cabeca('Oficina "IA para gestores escolares" | Humus'),
         f'<header class="hero"><h1>IA para gestores escolares</h1><p class="autoria">Por Mary Grace P. Andrioli · <a href="https://www.instagram.com/maryandrioli/">@maryandrioli</a> - <a href="https://www.linkedin.com/in/marygrace/">Linkedin</a></p></header>',
         '<nav class="abas"><a href="#antes">Antes da oficina</a><a href="#programacao">Programação e roteiros</a><a href="#combinados">Combinados</a></nav><main>']
    h.append('<section id="antes" class="cartao"><h2>Antes da oficina</h2><p>Reserve cerca de 45 minutos. Baixe apenas os dois pacotes da preparação; os arquivos de cada atividade são baixados na própria atividade, no dia.</p>')
    h.append('<ol><li>Assista aos dois vídeos da preparação.</li><li>Crie as contas e instale o aplicativo do Claude.</li><li>Monte o notebook "Normativas da escola" no Gemini Notebook.</li><li>Crie a pasta <strong>oficina_IA</strong> e marque a lista de conferência do roteiro.</li></ol>')
    h.append('<p><a class="botao" href="00_antes_da_oficina/index.html">Abrir a preparação</a> <a class="botao sec" href="00_antes_da_oficina/roteiro_00_antes_da_oficina.pdf">Roteiro da preparação (PDF)</a></p></section>')
    h.append('<section id="programacao" class="cartao"><h2>Programação e roteiros</h2><p>Cada atividade tem a sua página, com o roteiro, os prompts e o pacote de arquivos (pasta para visualização e zip).</p><div class="prog">')
    for ini, fim, t, f, pastas, escolha in BLOCOS:
        pausa = not pastas
        h.append(f'<div class="bloco{" pausa" if pausa else ""}"><div class="hora">{ini}<br><small>{fim}</small></div><div><h3>{esc(t)}</h3>' + (f'<p>{esc(f)}</p>' if f else ''))
        if escolha: h.append('<p class="dica">Escolha um dos roteiros:</p>')
        if pastas:
            h.append('<ul class="rots">')
            for p in pastas: h.append(f'<li><a href="{p}/index.html">{esc(titulo(p))}</a></li>')
            h.append('</ul>')
        h.append('</div></div>')
    h.append('</div></section>')
    h.append('<section id="combinados" class="cartao"><h2>Combinados do dia</h2><ul><li><strong>Sem dados pessoais.</strong> Nenhum nome, nota, laudo ou foto de estudantes, famílias ou funcionários entra nas IAs. Na dúvida, não anexe.</li><li><strong>Exemplo ou informação pública.</strong> Use a Escola Horizonte ou documentos públicos da sua escola (site, proposta pedagógica publicada).</li><li><strong>Revisão humana.</strong> Tudo o que a IA produz é rascunho até uma pessoa responsável conferir.</li><li><strong>Sequência completa primeiro.</strong> Faça o roteiro até o fim; as variações vêm depois, se houver tempo.</li></ul>')
    h.append('<h3>Se algo não funcionar</h3><ul><li>Não consigo entrar na plataforma: use uma conta reserva ou faça a atividade em dupla.</li><li>A IA inventou um dado: é esperado. Volte às fontes e acrescente "use apenas os documentos anexados".</li><li>Acabou o limite gratuito: troque de plataforma, pois os prompts funcionam nas quatro.</li><li>Não terminei a atividade: cada roteiro funciona sozinho, e você pode continuar depois.</li></ul>')
    h.append('<p>Dúvidas: ')
    h.append(f'<a href="mailto:{esc(c["contato"])}">{esc(c["contato"])}</a></p></section></main>')
    h.append('<footer>Oficina elaborada por Mary Grace Pereira Andrioli, contou com apoio técnico e revisão de Mauricio Andrea Andrioli e foi desenhada inicialmente para formação presencial de gestores promovida pela <a href="https://humus.com.br/">Humus Educação</a>.</footer></body></html>')
    open("index.html", "w", encoding="utf-8").write("\n".join(h))

if __name__ == "__main__":
    for p in atividades(): pagina_atividade(p); print("ok", p)
    pagina_inicial(); print("ok index")
