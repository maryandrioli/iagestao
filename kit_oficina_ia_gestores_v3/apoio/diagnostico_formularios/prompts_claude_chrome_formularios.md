# Prompts para montar os formulários com a extensão do Claude no Chrome

Como usar: abra o Chrome, entre na conta Google que será usada na oficina, acesse forms.google.com e abra o painel da extensão do Claude. Cole o prompt inteiro (um formulário por vez). A extensão pede aprovação a cada ação; confira ao final com o roteiro em PDF desta pasta. Depois, copie o link encurtado de cada formulário para `assets/config.js`.

Dica: se a extensão travar em uma pergunta de grade, peça "continue da pergunta X" sem recomeçar. Ao terminar, peça a conferência final (último parágrafo de cada prompt).

---

## Prompt 1: formulário do diagnóstico (início e fim da oficina)

```
Estou em forms.google.com. Crie um novo formulário em branco e monte-o exatamente conforme a especificação abaixo. Faça uma seção de cada vez, na ordem, e me avise ao concluir cada seção. Não altere os textos das perguntas: os códigos no início de cada título (0.1., A1., B1., C3., D5.) são usados por um painel para ler as respostas.

TÍTULO DO FORMULÁRIO: Diagnóstico | Oficina "Inteligência artificial na gestão escolar" | 5/11/2026
DESCRIÇÃO: Este questionário não é uma prova: as respostas ajudam a ajustar a oficina e a acompanhar o que mudou ao longo do dia. As respostas são anônimas. Tempo estimado: 7 minutos.

CONFIGURAÇÕES (aba Configurações):
- Respostas: "Coletar endereços de e-mail" = Não coletar. "Limitar a 1 resposta" = desativado.
- Apresentação: "Mostrar barra de progresso" = ativado. "Embaralhar a ordem das perguntas" = desativado.
- Padrões: "Tornar perguntas obrigatórias por padrão" = ativado. As perguntas do tipo Parágrafo (E2, F2, F3) devem ficar NÃO obrigatórias.
- Não ative o modo Teste.

SEÇÃO 1 (a primeira seção, já existente): título "Identificação anônima"; descrição "O código pessoal serve apenas para comparar as respostas do início e do fim da oficina, sem identificar ninguém."
- Pergunta "0.1. Momento da resposta", tipo Múltipla escolha, opções: "Início da oficina" e "Fim da oficina". Ative "Ir para a seção com base na resposta": "Início da oficina" vai para a Seção 2; "Fim da oficina" vai para a Seção 3.
- Pergunta "0.2. Código pessoal", tipo Resposta curta. Validação de resposta: Expressão regular, Corresponde a, padrão [A-Za-z]{2}[0-9]{2}, mensagem de erro "Use duas letras e dois números, por exemplo MA07". Descrição da pergunta: "Duas primeiras letras do nome da sua mãe e o dia do seu nascimento com dois dígitos. Exemplo: MA07."

SEÇÃO 2: título "Perfil e expectativas"; descrição "Esta seção aparece só no início da oficina." Ao final desta seção, configure "Após a seção 2" = "Ir para a seção 4".
- "A1. Qual é a sua função?" Múltipla escolha: Direção | Coordenação pedagógica | Orientação educacional | Secretaria ou administrativo | Mantenedora | Outra
- "A2. Que etapas a sua escola atende?" Caixas de seleção: Educação Infantil | Anos Iniciais do Ensino Fundamental | Anos Finais do Ensino Fundamental | Ensino Médio
- "A3. Há quanto tempo você atua na gestão escolar?" Múltipla escolha: Menos de 2 anos | 2 a 5 anos | 6 a 10 anos | Mais de 10 anos
- "A4. Com que frequência você usa IA no trabalho?" Múltipla escolha: Nunca | Raramente | Algumas vezes por mês | Semanalmente | Diariamente
- "A5. Quais plataformas de IA você já usou?" Caixas de seleção: Claude | ChatGPT | Gemini | Manus | Copilot | NotebookLM | Nenhuma | Outra
- "A6. A sua escola tem orientações sobre o uso de IA?" Múltipla escolha: Não | Em discussão | Sim: orientações informais | Sim: documento formal | Não sei
- "E1. Em que tarefa da sua rotina você gostaria que a IA ajudasse?" Múltipla escolha: Comunicação com famílias | Atas e reuniões | Apoio aos professores | Análise de dados | Documentos institucionais | Outra
- "E2. Em uma frase: o que você espera da oficina?" Parágrafo, não obrigatória.

SEÇÃO 3: título "Encerramento"; descrição "Esta seção aparece só no fim da oficina." Após a seção 3: continuar para a próxima seção.
- "F1. Em que tarefa você pretende usar a IA primeiro?" Múltipla escolha: Comunicação com famílias | Atas e reuniões | Apoio aos professores | Análise de dados | Documentos institucionais | Outra
- "F2. Em uma frase: o que você leva da oficina?" Parágrafo, não obrigatória.
- "F3. Qual será a sua primeira ação nos próximos 30 dias?" Parágrafo, não obrigatória.

SEÇÃO 4: título "Confiança"; descrição "1 = nada confiante; 5 = muito confiante."
- "B. Quanto você se sente capaz de:" tipo Grade de múltipla escolha. Linhas (exatamente estes textos):
  B1. explicar, em linguagem simples, como a IA generativa produz respostas
  B2. diferenciar uma IA que prevê, uma que produz e uma que executa ações
  B3. identificar riscos éticos e de proteção de dados no uso de IA na escola
  B4. escrever um prompt que produza o resultado esperado
  B5. configurar um assistente com instruções fixas e documentos da escola
  B6. conferir criticamente um texto produzido por IA antes de usá-lo
  B7. propor regras de uso de IA para a equipe da escola
  Colunas: 1, 2, 3, 4, 5. Ative "Exigir uma resposta em cada linha".

SEÇÃO 5: título "Situações"; descrição "Escolha a alternativa que lhe parece mais adequada. Se não souber, marque "não sei": isso também ajuda a ajustar a oficina." Todas de Múltipla escolha, com as opções exatamente nesta ordem e com as letras no início; não embaralhe as opções.
- "C1. Ao responder a uma pergunta, uma IA generativa como o Claude ou o ChatGPT:" opções: a) consulta um banco de respostas verificadas | b) gera o texto mais provável a partir de padrões aprendidos | c) pesquisa sempre na internet antes de responder | d) não sei
- "C2. A diferença principal entre um assistente e um agente de IA é que o agente:" opções: a) escreve textos mais longos | b) executa ações em outros sistemas (como criar um evento ou um rascunho de e-mail) dentro das permissões concedidas | c) só existe nas versões pagas | d) não sei
- "C3. Uma coordenadora pede à IA: "Escreva o comunicado da rematrícula". O que mais reduz o risco de datas e valores errados?" opções: a) pedir um tom mais formal | b) anexar o calendário e a tabela de valores como fontes e instruir a IA a não calcular valores | c) pedir um texto mais detalhado | d) não sei
- "C4. Um professor quer colar em uma IA gratuita o relatório de um estudante, com o nome dele, para melhorar a redação. A melhor decisão é:" opções: a) uso livre, porque o objetivo é pedagógico | b) uso livre, desde que o professor revise o texto depois | c) retirar os dados pessoais antes ou usar uma ferramenta autorizada pela escola | d) não sei
- "C5. Para garantir que um agente nunca envie e-mails sem aprovação, o mais seguro é:" opções: a) escrever "nunca envie e-mails" nas instruções | b) não conceder permissão de envio ou manter a aprovação manual de cada ação | c) usar sempre a versão paga | d) não sei
- "C6. A IA indicou o código de uma habilidade da BNCC para um plano de aula. O procedimento adequado é:" opções: a) aceitar, porque a IA foi treinada com a BNCC | b) conferir o código e o texto da habilidade no documento oficial | c) pedir a mesma informação a outra IA | d) não sei

SEÇÃO 6: título "Percepções"; descrição "1 = discordo totalmente; 5 = concordo totalmente." Após a seção 6: enviar formulário.
- "D. Indique o quanto você concorda com cada afirmação:" tipo Grade de múltipla escolha. Linhas:
  D1. A IA pode poupar tempo em tarefas da gestão sem substituir decisões pedagógicas.
  D2. Sei quais dados da escola não devem ser inseridos em uma IA.
  D3. Resultados produzidos por IA precisam de revisão humana nomeada antes de serem usados.
  D4. Minha equipe está preparada para usar IA com segurança.
  Colunas: 1, 2, 3, 4, 5. Ative "Exigir uma resposta em cada linha".
- "D5. Quais são hoje as suas principais preocupações com o uso de IA na escola? (até três)" Caixas de seleção: Proteção de dados | Erros e informações inventadas | Dependência e perda de autoria | Uso indevido por estudantes | Custo das ferramentas | Resistência da equipe | Falta de orientação institucional | Outra. Validação de resposta: "Selecionar no máximo" 3.

AO TERMINAR:
1. Na aba Respostas, clique em "Vincular ao Planilhas" e crie uma nova planilha chamada "Respostas diagnóstico oficina IA".
2. Abra a visualização e confira: a escolha "Início da oficina" leva à seção 2 e depois pula para a seção 4; "Fim da oficina" leva à seção 3 e segue até o fim.
3. Em Enviar, ícone de link, marque "Encurtar URL" e me mostre o link.
4. Liste, seção por seção, todas as perguntas criadas com o tipo e o número de opções, para eu conferir com o roteiro.
```

---

## Prompt 2: formulário de avaliação da oficina

```
Estou em forms.google.com. Crie um novo formulário em branco e monte-o exatamente conforme a especificação abaixo, uma seção de cada vez. Não altere os textos das perguntas: os códigos no início de cada título (0.2., G1., U1., O2.) são usados por um painel para ler as respostas.

TÍTULO DO FORMULÁRIO: Avaliação da oficina | "Inteligência artificial na gestão escolar" | 5/11/2026
DESCRIÇÃO: Sua avaliação orienta as próximas edições. As respostas são anônimas. Tempo estimado: 4 minutos.

CONFIGURAÇÕES (aba Configurações):
- Respostas: "Coletar endereços de e-mail" = Não coletar. "Limitar a 1 resposta" = desativado.
- Apresentação: "Mostrar barra de progresso" = ativado. "Embaralhar a ordem das perguntas" = desativado.
- Padrões: "Tornar perguntas obrigatórias por padrão" = ativado. As perguntas do tipo Parágrafo (G7, G8) devem ficar NÃO obrigatórias.

SEÇÃO 1 (a primeira, já existente): título "Identificação anônima"; descrição "Use o mesmo código pessoal do diagnóstico."
- "0.2. Código pessoal", Resposta curta. Validação: Expressão regular, Corresponde a, [A-Za-z]{2}[0-9]{2}, mensagem "Use duas letras e dois números, por exemplo MA07".

SEÇÃO 2: título "Avaliação".
- "G1. De modo geral, como você avalia a oficina?" tipo Escala linear, de 1 a 5, rótulo 1 = "Muito insatisfeito", rótulo 5 = "Muito satisfeito".
- "U. Utilidade de cada etapa para o seu trabalho:" tipo Grade de múltipla escolha; descrição "1 = pouco útil; 5 = muito útil". Linhas:
  U1. Fundamentos, panorama e cultura de dados
  U2. Ética, inclusão e matriz de riscos
  U3. Documento da escola
  U4. Prática 1: carrossel ou página com formulário
  U5. Prática 2: assistentes de formação e de comunicação
  U6. Prática 3: revisores (LGPD, BNCC Computação, princípios, plano de aula)
  U7. Laboratório individual
  U8. Governança, política e plano de 30 dias
  Colunas: 1, 2, 3, 4, 5. Ative "Exigir uma resposta em cada linha".
- "O. Organização da oficina:" tipo Grade de múltipla escolha; descrição "1 = ruim; 5 = excelente". Linhas:
  O1. Tempo dedicado às práticas
  O2. Clareza dos roteiros das atividades
  O3. Materiais de apoio e kit
  O4. Página da oficina
  O5. Condução da formadora
  O6. Infraestrutura (sala e internet)
  Colunas: 1, 2, 3, 4, 5. Ative "Exigir uma resposta em cada linha".
- "G4. De 0 a 10, quanto você recomendaria esta oficina a um colega gestor?" tipo Escala linear, de 0 a 10, rótulo 0 = "Não recomendaria", rótulo 10 = "Recomendaria com certeza".
- "G5. Qual roteiro da Prática 1 você fez?" Múltipla escolha: Roteiro A: carrossel de projetos | Roteiro B: página e formulário | Os dois | Nenhum
- "G6. Você teria interesse em alguma continuidade?" Caixas de seleção: Formação da equipe docente | Acompanhamento da política de uso | Oficina avançada sobre agentes | Assessoria para a escola | Nenhuma no momento
- "G7. O que mais contribuiu para o seu trabalho?" Parágrafo, não obrigatória.
- "G8. O que poderia ser melhorado?" Parágrafo, não obrigatória.
- "G9. Podemos usar os seus comentários, sem identificação, na divulgação da oficina?" Múltipla escolha: Sim | Não

AO TERMINAR:
1. Na aba Respostas, "Vincular ao Planilhas", nova planilha "Respostas avaliação oficina IA".
2. Abra a visualização e confira se as duas grades exigem resposta em cada linha e se G7 e G8 não são obrigatórias.
3. Em Enviar, ícone de link, marque "Encurtar URL" e me mostre o link.
4. Liste todas as perguntas criadas com o tipo e o número de opções, para eu conferir com o roteiro.
```

---

## Depois de montar os dois

1. Responda uma vez a cada formulário (no diagnóstico, uma vez como "Início" e outra como "Fim"), baixe o .csv de cada planilha e abra `painel_diagnostico_e_avaliacao.html` para conferir se o painel lê as colunas. Depois exclua as respostas de teste (aba Respostas, menu de três pontos, "Excluir todas as respostas").
2. Cole os dois links curtos em `materiais_formacao/assets/config.js`:

```js
links: {
  diagnostico: "https://forms.gle/xxxxxxxx",
  avaliacao:   "https://forms.gle/yyyyyyyy",
  zip: "kit_oficina_ia_gestao_escolar.zip"
}
```

3. Abra `index.html` e confira o botão "Abrir o formulário" e o QR code nos blocos das 9h e das 16h45.
