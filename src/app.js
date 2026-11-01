import { SERVICOS } from "./servicos.js";
import { carregarAgendamentos, salvarAgendamentos } from "./persistencia.js"; // NOVO

const listaElementos = document.getElementById("lista-servicos");

listaElementos.innerHTML = SERVICOS.map(servico => `
    <div class="servico">
        <h3>${servico.nome}</h3>

        <p>Duração: ${servico.duracao} minutos</p>

        <p>Preço: R$ ${servico.preco}</p>
    </div>
`).join("");

const form = document.getElementById("form-agendamento");
const campoNome = document.getElementById("nome");
const campoTelefone = document.getElementById("telefone");
const mensagem = document.getElementById("mensagem-agendamento");

const agendamentos = carregarAgendamentos(); // NOVO: lê o que já estava salvo

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = campoNome.value.trim();
  const telefone = campoTelefone.value.trim();

  if (!nome || !telefone) {
    mensagem.textContent = "Preencha o nome e o telefone para agendar.";
    return;
  }

  agendamentos.push({ nome, telefone }); // NOVO: adiciona na lista (push = incluir no final)
  salvarAgendamentos(agendamentos);      // NOVO: grava no localStorage

  mensagem.textContent = "Nome e telefone preenchidos.";
});