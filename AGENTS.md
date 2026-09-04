# Meeting Cost CLI

## Produto e arquitetura

- Preserve a aplicação de linha de comando para Node.js 24 que calcula o custo de mão de obra de uma reunião.
- Receba participantes, duração em minutos e custo por hora; exiba o total com duas casas decimais.
- Mantenha `calculateMeetingCost` pura e exportada em `src/meeting-cost.js`.
- Mantenha leitura de `process.argv`, conversão, mensagens e código de saída em `src/cli.js`.
- Não misture efeitos de terminal à função de domínio nem amplie o produto para servidor, GUI, banco ou integração externa.

## Estrutura atual

- `src/meeting-cost.js`: cálculo e validação de domínio.
- `src/cli.js`: ponto de entrada do terminal.
- `test/meeting-cost.test.js`: testes com o runner nativo do Node.js.
- `package.json`: metadados, ESM, requisito de Node.js, scripts e dependências de desenvolvimento.
- `tsconfig.json` e `biome.json`: configuração de typecheck, lint e formatação.
- `.github/workflows/ci.yml`: verificação automatizada em Node.js 24.
- `PROJETO.md`: descrição e exemplo de uso.
- `README.md` e `LICENSE`: arquivos existentes de documentação e licença.
- `AGENTS.md`: estas instruções.

## Comandos reais

- Execute pelo npm: `npm start -- 5 60 100`.
- Execute diretamente: `node src/cli.js 5 60 100`.
- Execute todos os checks: `npm run check`.
- Execute separadamente: `npm test`, `npm run lint`, `npm run format` e `npm run typecheck`.
- Não invente comandos além dos scripts declarados em `package.json`.

## Regras de domínio e erros

- Exija exatamente três argumentos posicionais na CLI e converta-os com `Number`.
- Exija `participants` finito, inteiro e maior ou igual a 1.
- Exija `durationMinutes` finito e estritamente maior que zero.
- Exija `hourlyCost` finito e não negativo; zero é válido.
- Calcule `participants * (durationMinutes / 60) * hourlyCost`.
- Preserve essas validações no domínio, inclusive para chamadas fora da CLI.
- Escreva resultados válidos em `stdout` com duas casas decimais.
- Escreva entradas inválidas em `stderr`, inclua uma explicação específica e a linha de uso, e defina código de saída 1.
- Capture no ponto de entrada os erros de validação lançados pelo domínio.

## Runtime, ESM e dependências

- Respeite `"type": "module"` e Node.js `>=24`.
- Use `import` e `export`; não use `require` nem `module.exports`.
- Inclua a extensão `.js` em imports locais.
- Mantenha o produto sem dependências de runtime.
- Limite ferramentas de desenvolvimento às versões fixadas em `package.json` e preserve o lockfile.

## Segurança e escopo

- Inspecione o estado atual e faça mudanças pequenas, locais e limitadas ao pedido.
- Não exponha segredos, credenciais, tokens ou dados privados.
- Não faça chamadas de rede ou integrações externas sem solicitação explícita.
- Não execute operações destrutivas em arquivos ou no histórico Git.
- Não faça commit, push, rebase ou reset sem autorização explícita.
- Não altere arquivos fora do escopo nem crie infraestrutura não solicitada.
- Não invente arquivos, serviços, requisitos ou capacidades.

## Checklist de conclusão

- [ ] O pedido foi atendido sem mudanças fora do escopo.
- [ ] A separação entre domínio puro e terminal foi preservada.
- [ ] Todos os invariantes numéricos e comportamentos de erro continuam válidos.
- [ ] ESM, Node.js 24 e a ausência de dependências de runtime foram respeitados.
- [ ] `npm run check` foi concluído com sucesso.
- [ ] Somente comandos existentes foram usados ou documentados.
- [ ] A validação manual relevante foi executada quando necessária.
- [ ] Nenhum segredo, efeito externo, operação destrutiva ou mudança de histórico foi introduzido.
