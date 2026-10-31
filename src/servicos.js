// Lista dos serviços oferecidos pelo Studio Rita.
// Cada serviço tem:
//   id       -> código único (texto, sem espaços)
//   nome     
//   duracao  -> em MINUTOS 
//   preco    -> em reais ( sem "R$")

export const SERVICOS = [
  { id: "corte",     nome: "Corte",     duracao: 60, preco: 50 },
  { id: "escova",    nome: "Escova",    duracao: 30, preco: 35 },
  { id: "manicure",  nome: "Manicure",  duracao: 30, preco: 25 },
  { id: "coloracao", nome: "Coloração", duracao: 90, preco: 120 },
];

// Procura um serviço pelo id.

export function buscarServico(id) {
  return SERVICOS.find(function (servico) {
    return servico.id === id;
  });
}