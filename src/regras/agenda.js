// Regras de agendamento do Studio Rita.

// ---------- Configurações do salão ----------
// Para mudar o horário de funcionamento, altere aqui.
export const ABERTURA = "09:00";
export const FECHAMENTO = "18:00";
export const ALMOCO_INICIO = "12:00";
export const ALMOCO_DURACAO = 60; // 
export const PASSO = 30; // 


// Converte um horário em texto para minutos desde a meia-noite.
export function horaParaMinutos(hora) {
  const partes = hora.split(":");
  const horas = Number(partes[0]);
  const minutos = Number(partes[1]);
  return horas * 60 + minutos;
}

// Converte minutos em horário

export function minutosParaHora(totalMinutos) {
  const horas = Math.floor(totalMinutos / 60);
  const minutos = totalMinutos % 60;
  return String(horas).padStart(2, "0") + ":" + String(minutos).padStart(2, "0");
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

// ---------- Gerador de horários livres ----------

// Diz se a data é domingo.
//   data -> texto no formato "AAAA-MM-DD", ex: "2026-11-01"
export function ehDomingo(data) {
  const partes = data.split("-");
  const ano = Number(partes[0]);
  const mes = Number(partes[1]);
  const dia = Number(partes[2]);
  // O mês no JavaScript começa em 0, por isso "mes - 1".
  // getDay() devolve 0 para domingo, 1 para segunda... 6 para sábado.
  return new Date(ano, mes - 1, dia).getDay() === 0;
}

// Devolve a lista de horários livres de um dia para um serviço.
//
//   data          -> "AAAA-MM-DD"
//   duracao       -> duração do serviço em minutos
//   agendamentos  -> atendimentos JÁ MARCADOS NESSE DIA: { inicio, duracao }
//
// Domingo devolve lista vazia.
export function gerarHorariosLivres(data, duracao, agendamentos) {
  if (ehDomingo(data)) {
    return [];
  }

  // O almoço é tratado como se fosse um atendimento marcado.
  // Assim reaproveita o haConflito.
  const ocupados = agendamentos.concat([
    { inicio: ALMOCO_INICIO, duracao: ALMOCO_DURACAO },
  ]);

  const livres = [];
  const limite = horaParaMinutos(FECHAMENTO);

  for (
    let comeco = horaParaMinutos(ABERTURA);
    comeco + duracao <= limite; // o serviço não pode terminar depois das 18:00
    comeco = comeco + PASSO
  ) {
    const hora = minutosParaHora(comeco);

    if (!haConflito(hora, duracao, ocupados)) {
      livres.push(hora);
    }
  }

  return livres;
}