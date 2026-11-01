import { SERVICOS } from "./servicos.js";
import { carregarAgendamentos, salvarAgendamentos } from "./persistencia.js"; // NOVO

const listaElementos = document.getElementById("lista-servicos");

const form = document.getElementById("form-agendamento");
const campoNome = document.getElementById("nome");
const campoTelefone = document.getElementById("telefone");
const mensagem = document.getElementById("mensagem-agendamento");

const campoDataPainel = document.getElementById("data-painel");
const listaPainel = document.getElementById("lista-agendamentos");
const mensagemPainel = document.getElementById("mensagem-painel");

const agendamentos = carregarAgendamentos(); // NOVO: lê o que já estava salvo


listaElementos.innerHTML = SERVICOS.map(servico => `
    <div class="servico">
        <h3>${servico.nome}</h3>

        <p>Duração: ${servico.duracao} minutos</p>

        <p>Preço: R$ ${servico.preco}</p>
    </div>
`).join("");


form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = campoNome.value.trim();
  const telefone = campoTelefone.value.trim();

  if (!nome || !telefone) {
    mensagem.textContent = "Preencha o nome e o telefone para agendar.";
    return;
  }

  agendamentos.push({ nome, telefone, data, inicio, servico }); // NOVO: adiciona na lista (push = incluir no final)
  salvarAgendamentos(agendamentos);      // NOVO: grava no localStorage

  mensagem.textContent = "Nome e telefone preenchidos.";
});


function atualizarPainel() {
  const dataEscolhida = campoDataPainel.value;

  const doDia = carregarAgendamentos()
    .filter(function (agendamento) {
      return agendamento.data === dataEscolhida;
    })
    .sort(function (a, b) {
      return a.inicio.localeCompare(b.inicio);
    });

  listaPainel.innerHTML = doDia.map(function (agendamento) {
    return `
      <li>
        ${agendamento.inicio} — ${agendamento.nome} —
        ${agendamento.telefone} — ${agendamento.servico}
      </li>
    `;
  }).join("");

  mensagemPainel.textContent = doDia.length
    ? ""
    : "Nenhum agendamento para este dia.";
}

campoDataPainel.addEventListener("change", atualizarPainel);