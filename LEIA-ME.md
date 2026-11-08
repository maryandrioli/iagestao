# Oficina "IA para gestores escolares": versão 4

Esta pasta é um site estático (pode ser publicado no GitHub Pages) e também pode ser usada localmente, abrindo `index.html`.

## Lógica da v4

- **Antes da oficina**: a participante baixa apenas os dois pacotes da atividade 00 (guias de apoio; normas para o notebook do Gemini). Não há pasta geral zipada.
- **Cada atividade tem o seu pacote**, na própria pasta:
  - `index.html`: página da atividade, com prompts copiáveis e links para os arquivos;
  - `roteiro_<atividade>.pdf`: roteiro com passo a passo e prompts completos (o Word de origem fica em `_ferramentas/roteiros_fonte/`, usado pelo gerador);
  - `arquivos/`: arquivos editáveis, separados por função (`exemplo_preenchido`, `para_preencher`, `fontes_para_anexar`, `documentos_de_teste`, `guias_de_apoio`);
  - `visualizar_pdf/`: versão em PDF de cada arquivo editável, para ver antes de baixar;
  - `pacote_<atividade>.zip`: roteiro em PDF e arquivos editáveis da atividade;
  - `videos/` (atividades 00 e 02): fora dos zips, por causa do tamanho.
- Cada pacote repete os arquivos de que precisa (por exemplo, o perfil da escola). A repetição é intencional: a atividade fica autônoma e o zip é pequeno.

## Dados do evento

Edite `config.json` (data, horário, contato e links dos formulários de diagnóstico e avaliação) e rode:

```
python3 _ferramentas/gerar_pacotes_e_paginas.py
```

O script (requer `python-docx`) refaz os zips, as páginas das atividades e a página inicial. Os PDFs são gerados à parte, com LibreOffice.

## O que ficou de fora em relação à v3

Kit geral zipado e sua cópia extraída; páginas alternativas de teste; análise crítica interna; lista de inscritos (dados pessoais); miniaturas de vídeo não usadas; arquivos duplicados de normativas; apresentação em .pptx (os slides seguem em PDF).
