import { SERVICOS } from "./servicos.js";
import { carregarAgendamentos, salvarAgendamentos } from "./persistencia.js";

const listaServicos = document.getElementById("lista-servicos");
const form = document.getElementById("form-agendamento");
const campoNome = document.getElementById("nome");
const campoTelefone = document.getElementById("telefone");
const campoServico = document.getElementById("servico");
const campoData = document.getElementById("data");
const campoInicio = document.getElementById("inicio");
const mensagemAgendamento = document.getElementById("mensagem-agendamento");

const campoDataPainel = document.getElementById("data-painel");
const listaAgendamentos = document.getElementById("lista-agendamentos");
const mensagemPainel = document.getElementById("mensagem-painel");

listaServicos.innerHTML = SERVICOS.map(function (servico) {
  return `
    <div class="servico">
      <h3>${servico.nome}</h3>
      <p>Duração: ${servico.duracao} minutos</p>
      <p>Preço: R$ ${servico.preco}</p>
    </div>
  `;
}).join("");

campoServico.innerHTML += SERVICOS.map(function (servico) {
  return `<option value="${servico.nome}">${servico.nome}</option>`;
}).join("");

function atualizarPainel() {
  const dataEscolhida = campoDataPainel.value;

  const doDia = carregarAgendamentos()
    .filter(function (agendamento) {
      return agendamento.data === dataEscolhida;
    })
    .sort(function (a, b) {
      return (a.inicio || "").localeCompare(b.inicio || "");
    });

  listaAgendamentos.innerHTML = doDia.map(function (agendamento) {
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

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const agendamento = {
    nome: campoNome.value.trim(),
    telefone: campoTelefone.value.trim(),
    servico: campoServico.value,
    data: campoData.value,
    inicio: campoInicio.value,
  };

  if (
    !agendamento.nome ||
    !agendamento.telefone ||
    !agendamento.servico ||
    !agendamento.data ||
    !agendamento.inicio
  ) {
    mensagemAgendamento.textContent = "Preencha todos os campos.";
    return;
  }

  const agendamentos = carregarAgendamentos();
  agendamentos.push(agendamento);
  salvarAgendamentos(agendamentos);

  mensagemAgendamento.textContent = "Agendamento salvo.";
  form.reset();
  atualizarPainel();
});

campoDataPainel.addEventListener("change", atualizarPainel);