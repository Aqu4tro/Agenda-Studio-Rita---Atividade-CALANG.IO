// Regras de agendamento do Studio Rita.

// Converte um horário em texto para minutos desde a meia-noite.
export function horaParaMinutos(hora) {
  const partes = hora.split(":");
  const horas = Number(partes[0]);
  const minutos = Number(partes[1]);
  return horas * 60 + minutos;
}

// Diz se um novo atendimento bate com algum já marcado.
//
//   inicioNovo     -> horário de início
//   duracaoNova    -> duração em minutos
//   agendamentos   -> lista dos atendimentos do mesmo dia
// Devolve true se há conflito e false se o horário está livre.
export function haConflito(inicioNovo, duracaoNova, agendamentos) {
  const comecoNovo = horaParaMinutos(inicioNovo);
  const fimNovo = comecoNovo + duracaoNova;

  for (const agendamento of agendamentos) {
    const comecoExistente = horaParaMinutos(agendamento.inicio);
    const fimExistente = comecoExistente + agendamento.duracao;

    if (comecoNovo < fimExistente && fimNovo > comecoExistente) {
      return true;
    }
  }

  return false;
}