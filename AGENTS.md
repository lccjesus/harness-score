# AGENTS.md

Este documento orienta agentes de código que trabalhem neste repositório.
Leia estas instruções antes de propor ou aplicar qualquer alteração.
Prefira mudanças pequenas, locais e diretamente relacionadas ao pedido recebido.
O repositório é deliberadamente mínimo e essa simplicidade deve ser preservada.

## Visão geral do produto

O produto se chama Meeting Cost CLI.
Ele é uma aplicação de linha de comando escrita para Node.js 24.
Seu objetivo é calcular o custo total de mão de obra de uma reunião.
A entrada contém o número de participantes, a duração em minutos e o custo por hora.
O cálculo multiplica participantes por duração em horas por custo por hora.
A saída válida apresenta o custo total com duas casas decimais.
A saída inválida explica o problema e repete a forma correta de uso.
Não há servidor, interface gráfica, banco de dados ou integração externa.

## Estrutura real do repositório

- `src/meeting-cost.js`: contém e exporta a função pura de domínio `calculateMeetingCost`.
- `src/cli.js`: lê os argumentos, converte os valores, chama o domínio e escreve no terminal.
- `package.json`: declara ESM, Node.js 24 ou superior e o script `start`.
- `PROJETO.md`: fornece uma descrição curta do produto e um exemplo de uso.
- `README.md`: documentação já existente no repositório.
- `LICENSE`: licença já existente no repositório.
- `AGENTS.md`: este guia operacional para agentes de código.
Não presuma a existência de outros arquivos de configuração.
Não presuma a existência de uma suíte de testes, linter, formatter ou typecheck.

## Comandos disponíveis hoje

O comando npm declarado em `package.json` é:

```sh
npm start -- 5 60 100
```

Esse comando executa `node src/cli.js 5 60 100`.
Também é possível executar diretamente o ponto de entrada com Node.js:

```sh
node src/cli.js 5 60 100
```

Não documente comandos de teste, lint, build ou formatação, pois eles não existem hoje.
Não trate a ausência desses comandos como uma falha a ser corrigida sem solicitação explícita.

## Arquitetura e limites de responsabilidade

Mantenha o cálculo de domínio em `src/meeting-cost.js`.
A função `calculateMeetingCost` deve continuar pura e exportada.
Uma chamada à função de domínio não deve ler argumentos do processo nem escrever no terminal.
Mantenha leitura de `process.argv`, mensagens e código de saída em `src/cli.js`.
O ponto de entrada deve continuar separado da lógica de cálculo.
Evite criar abstrações, camadas ou arquivos que não sejam necessários para a alteração pedida.
A separação entre domínio puro e adaptação de terminal é uma característica central do código atual.

## Invariantes de domínio

`participants` deve ser um número finito.
`participants` deve ser um número inteiro.
`participants` deve ser maior ou igual a 1.
`durationMinutes` deve ser um número finito.
`durationMinutes` deve ser estritamente maior que zero.
`hourlyCost` deve ser um número finito.
`hourlyCost` pode ser zero.
`hourlyCost` não pode ser negativo.
Para valores válidos, o resultado é `participants * (durationMinutes / 60) * hourlyCost`.
Não enfraqueça essas validações ao alterar a CLI ou a função de domínio.

## ESM, Node.js e dependências

O projeto usa ESM por meio de `"type": "module"` em `package.json`.
Use `import` e `export`; não introduza `require` ou `module.exports`.
Imports locais devem manter a extensão `.js`, como em `./meeting-cost.js`.
O requisito de runtime declarado é Node.js 24 ou superior.
Use somente recursos nativos do Node.js enquanto esse requisito permanecer vigente.
O projeto não possui dependências de produção nem de desenvolvimento.
Não instale pacotes apenas por conveniência para resolver algo suportado pela plataforma nativa.
Preserve a natureza pequena e sem dependências da aplicação.

## Validação e tratamento de erros

A CLI exige exatamente três argumentos posicionais depois do separador `--` do npm.
Os argumentos são convertidos com `Number` antes de chegar ao domínio.
Quantidade incorreta de argumentos deve resultar em mensagem acionável e código de saída 1.
Valor não finito deve ser rejeitado com uma explicação específica ao campo correspondente.
Violações de faixa ou integralidade também devem ser rejeitadas com mensagem específica.
Erros de validação do domínio são capturados pelo ponto de entrada.
A mensagem de erro da CLI deve incluir a linha de uso existente.
Entradas válidas devem escrever o resultado em `stdout`.
Entradas inválidas devem escrever o erro em `stderr` e definir falha no processo.
Não mova validações exclusivamente para a CLI, pois a função exportada também deve proteger seus invariantes.

## Segurança e escopo de mudanças

Inspecione o estado atual antes de editar para não sobrescrever trabalho existente.
Não exponha segredos, credenciais, tokens, variáveis sensíveis ou dados privados em código ou saída.
Não faça chamadas de rede ou adicione integrações externas sem que o pedido exija isso explicitamente.
Não execute operações destrutivas em arquivos, no repositório ou no histórico Git.
Não altere arquivos fora do escopo solicitado.
Não amplie silenciosamente o produto para além do cálculo local de custo de reunião.
Repita a preferência por mudanças pequenas: o tamanho mínimo deste projeto é intencional.

## Ações proibidas para o agente

Não faça commit, push, rebase, reset destrutivo ou alteração de histórico sem autorização explícita.
Não instale dependências nem gere lockfile sem uma solicitação que autorize essa mudança.
Não invente scripts npm, serviços, arquivos, comandos ou capacidades inexistentes.
Não remova nem contorne as validações de finitude, faixa e integralidade existentes.
Não misture efeitos de terminal à função pura de domínio.
Não converta o projeto de ESM para CommonJS.
Não modifique `README.md` ou `LICENSE` incidentalmente.
Não crie infraestrutura ou configuração não solicitada apenas para tornar o projeto mais elaborado.

## Checklist de conclusão

- [ ] A alteração atende somente ao pedido atual.
- [ ] A estrutura real do repositório foi respeitada.
- [ ] `calculateMeetingCost` permanece pura e exportada.
- [ ] A CLI continua responsável por argumentos e saída do terminal.
- [ ] Todos os invariantes numéricos continuam protegidos no domínio.
- [ ] Entradas inválidas continuam produzindo erro acionável e código de saída 1.
- [ ] Entradas válidas continuam mostrando um custo total claro com duas casas decimais.
- [ ] O código continua usando ESM e imports locais com extensão `.js`.
- [ ] Nenhuma dependência foi adicionada sem necessidade e autorização.
- [ ] Nenhum comando inexistente foi documentado ou presumido.
- [ ] Nenhum arquivo fora do escopo foi alterado.
- [ ] Nenhuma operação destrutiva ou alteração de histórico foi executada.
- [ ] O comando disponível relevante foi executado quando a mudança exigiu validação manual.
- [ ] O resultado final foi revisado para preservar a simplicidade deliberada do projeto.
