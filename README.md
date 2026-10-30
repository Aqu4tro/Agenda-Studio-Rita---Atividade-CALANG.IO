# 📅 Agenda Studio Rita

> Aplicação web desenvolvida como MVP (Mínimo Produto Viável) para o **Studio Rita** (Crato/CE), permitindo o agendamento online de serviços de beleza e o gerenciamento diário de horários da profissional.

---

## 📌 Sumário
- [Visão Geral e Objetivo](#-visão-geral-e-objetivo)
- [Estrutura do Repositório](#-estrutura-do-repositório)
- [Tecnologias e Restrições Técnicas](#-tecnologias-e-restrições-técnicas)
- [Organização no GitHub Projects (Kanban)](#-organização-no-github-projects-kanban)
- [Fluxo de Trabalho e Regras do Git](#-fluxo-de-trabalho-e-regras-do-git)
- [Como Executar o Projeto e os Testes](#-como-executar-o-projeto-e-os-testes)

---

## 🎯 Visão Geral e Objetivo

O **Studio Rita** é um salão pequeno em Crato que atende de segunda a sábado, das 09h às 18h (com pausa para almoço). Este projeto resolve o problema de agendamentos em duplicidade e a perda de tempo no WhatsApp, oferecendo:

1. **Visão da Cliente ("Agendar"):** Exibição dos serviços com preço e duração, filtro de horários livres sem sobreposição, e formulário simples com Nome e Telefone.
2. **Visão da Rita ("Painel da Rita"):** Listagem cronológica dos atendimentos do dia, cancelamento de horários, e bloqueio de horários (diferencial).

---

## 📂 Estrutura do Repositório

```text
.
├── .github/
│   └── PULL_REQUEST_TEMPLATE.md   # Template padrão para abertura de PRs
├── src/
│   ├── regras/
│   │   └── agenda.js              # Funções puras de validação de horários/conflitos
│   └── app.js                     # Lógica de interface e manipulação do localStorage
├── tests/
│   └── agenda.test.js             # Testes automatizados usando o runner nativo do Node.js
├── index.html                     # Interface única contendo as telas "Agendar" e "Painel"
├── DECISOES.md                    # Registro de decisões arquiteturais e premissas
├── package.json                   # Configuração de scripts de teste
└── README.md                      # Documentação completa do projeto
```

---

## 🛠 Tecnologias e Restrições Técnicas

- **Stack Front-end:** HTML, CSS e JavaScript puro (Vanilla JS). **Sem frameworks** e **sem backend**.
- **Persistência de Dados:** Uso exclusivo do `localStorage` do navegador para manter o estado dos dados recarregados.
- **Regras de Negócio:** Todas as validações (ex: cálculo de conflitos de horários) são funções puras em `src/regras/`.
- **Testes Automáticos:** Testes automatizados executados via `node --test` sem dependências externas heavy.

---

## 📋 Organização no GitHub Projects (Kanban)

O gerenciamento de tarefas é conduzido no **GitHub Projects** utilizando o modelo Kanban estruturado nas seguintes colunas:

| Coluna | Descrição |
| :--- | :--- |
| **A fazer** | Backlog de tarefas priorizadas no formato de User Stories/Cards. |
| **Fazendo** | Card atualmente em desenvolvimento. **WIP (Work in Progress) máximo = 1 por pessoa**. |
| **Em revisão** | Pull Requests abertos aguardando revisão e aprovação de outro membro da equipe. |
| **Pronto** | Card finalizado: PR mesclado na `main`, testes passando e critérios de aceitação validados. |
| **Impedido** | Tarefas bloqueadas por alguma dependência técnica ou decisão pendente. |

### Tamanho dos Cards
- **P (Pequeno):** Tarefas de até 30 minutos.
- **M (Médio):** Tarefas de até 1 hora.
- *Cards maiores (G) devem ser obrigatoriamente fatiados antes de irem para desenvolvimento.*

---

## 🔄 Fluxo de Trabalho e Regras do Git

Para garantir a qualidade do código e a integridade da branch principal, seguimos rigorosamente este fluxo:

1. **Branch por Funcionalidade:** Toda nova tarefa deve ser feita em uma branch dedicada a partir da `main`:
   ```bash
   git switch -c feat/rf01-servicos
   ```
2. **Commits Pequenos e Imperativos:**
   ```bash
   git commit -m "adiciona listagem de serviços na tela inicial"
   ```
3. **Sincronização:** Atualize sua branch com a `main` antes de abrir o Pull Request:
   ```bash
   git pull origin main
   ```
4. **Pull Request (PR) & Code Review:**
   - **Nada entra na `main` sem PR revisado por outra pessoa.**
   - O PR deve utilizar o template padrão em `.github/PULL_REQUEST_TEMPLATE.md`.
   - Todos os comentários do code review devem ser respondidos e as discussões resolvidas antes do merge.
   - O comando `npm test` precisa passar 100% sem erros.

---

## 🚀 Como Executar o Projeto e os Testes

### Pré-requisitos
- Node.js instalado (versão 18+ recomendada para o runner nativo de testes).

### Passos para Executar
1. Clone o repositório na sua máquina local:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd agenda-studio-rita
   ```
2. Abra o arquivo `index.html` em qualquer navegador web.

### Como Executar os Testes Automatizados
Rode o comando de teste configurado no `package.json`:
```bash
npm test
```