import { SERVICOS } from "./servicos.js";

const listaElementos = document.getElementById("lista-servicos");

listaElementos.innerHTML = SERVICOS.map(servico => `
    <div class="servico">
        <h3>${servico.nome}</h3>

        <p>Duração: ${servico.duracao} minutos</p>

        <p>Preço: R$ ${servico.preco}</p>
    </div>
`).join("");