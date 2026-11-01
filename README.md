# 📅 Agenda Studio Rita - MVP

> Aplicação web desenvolvida para gerenciar os agendamentos do **Studio Rita** (Crato/CE) de forma simples, direta e sem dependência de servidores externos.

---

## 🛠️ Stack Tecnológica & Restrições

- **Frontend:** HTML5, CSS3 e JavaScript puro (Vanilla JS) — *Sem frameworks*.
- **Persistência:** `localStorage` do navegador.
- **Testes Unitários:** Módulo nativo do Node.js (`node --test`) para validação das regras de negócio puras em `src/regras/`.

---

## ⚙️ Regras do Fluxo de Trabalho (Git & Kanban)

1. **Branch `dev` como base:** O desenvolvimento de novas tasks deve ocorrer em branches criadas a partir de `dev`.
2. **Nomenclatura de Branches:** Siga o padrão de Conventional Commits / escopo (ex: `feat/rf01-servicos`, `test/rf04-conflitos`).
3. **Pull Requests Obrigatórios:** Nenhum código entra na `dev` ou `main` sem passar por um Pull Request revisado e aprovado por pelo menos outro membro da equipe.
4. **Limite de WIP = 1:** Cada desenvolvedor pode ter no máximo **1 card** na coluna "Fazendo" por vez.
5. **Testes Obrigatórios:** Antes de abrir o PR, execute localmente `npm test` e garanta que todos os testes unitários estejam passando.

---

## 📋 Planejamento e Quebra de Tarefas (MVP)

O escopo do projeto foi dividido em **14 tarefas granulares** (classificadas em P - até 30 min / M - até 1h) para garantir entregas incrementais, revisão ágil e cobertura rigorosa de testes:

| ID | Task / Commit Message | Tamanho | Descrição / Critério de Aceitação |
| :--- | :--- | :---: | :--- |
| **Task 1** | `feat(rf01): criar estrutura de dados dos serviços` | P | Mapear os 4 serviços (Corte R$50/1h, Escova R$35/30min, Manicure R$25/30min, Coloração R$120/1h30) com nome, duração e preço. |
| **Task 2** | `feat(rf01): renderizar lista de serviços na interface` | P | Exibir a lista de serviços dinamicamente na tela inicial do cliente. |
| **Task 3** | `feat(rf04): implementar função pura de regras de conflito` | M | Criar função isolada em `src/regras/` para validação de sobreposição de horários. |
| **Task 4** | `test(rf04): escrever testes unitários para a regra de conflito` | P | Cobrir casos normais e de sobreposição rodando com `npm test`. |
| **Task 5** | `feat(rf02): implementar gerador de horários livres do dia` | M | Gerar slots das 9h às 17h30 (intervalos de 30 min), bloqueando domingos e horário de almoço. |
| **Task 6** | `feat(rf02): filtrar conflitos e exibir horários na tela` | M | Ocultar horários ocupados ao selecionar um serviço na interface. |
| **Task 7** | `feat(rf03): criar formulário de agendamento por nome e telefone` | P | Validar preenchimento obrigatório dos campos antes de prosseguir. |
| **Task 8** | `feat(rf03): integrar persistência no localStorage` | P | Garantir salvamento e recuperação dos agendamentos no navegador. |
| **Task 9** | `feat(rf05): criar painel da Rita com listagem cronológica` | M | Listar os agendamentos do dia escolhido ordenados por horário no painel administrativo. |
| **Task 10** | `feat(rf06): implementar botão de cancelamento de agendamento` | P | Remover o agendamento do localStorage e liberar o horário correspondente na agenda. |
| **Task 11** | `feat(rf07-08): adicionar diferenciais de bloqueio e conclusão` | M | Permitir que Rita bloqueie horários manualmente ou marque atendimentos como concluídos. |
| **Task 12** | `test(bordas): cobrir casos de borda do sistema` | M | Testar cenários de almoço, domingos e limites de expediente via testes unitários. |
| **Task 13** | `docs: preencher DECISOES.md` | P | Registrar premissas e decisões técnicas adotadas pela equipe durante o projeto. |
| **Task 14** | `docs: estruturar o README.md completo` | P | Documentar instruções de execução, fluxo de trabalho e limitação técnica do MVP. |

---

## 🚀 Como Executar o Projeto e os Testes

### 1. Clonar o repositório
```bash
git clone <URL_DO_REPOSITORIO>
cd agenda-studio-rita
```

### 2. Rodar os testes automatizados
```bash
npm test
```

### 3. Executar a aplicação
Abra o arquivo `index.html` diretamente no seu navegador web ou utilize a extensão Live Server.