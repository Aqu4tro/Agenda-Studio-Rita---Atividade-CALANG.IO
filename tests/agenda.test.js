// Testes da regra de conflito de horários.
// Para rodar: npm test

import { test } from "node:test";
import assert from "node:assert/strict";
import { horaParaMinutos, haConflito, gerarHorariosLivres, cancelarAgendamento} from "../src/regras/agenda.js";

// Um corte marcado às 10:00 (ocupa de 10:00 até 11:00).
const corteAs10 = [{ inicio: "10:00", duracao: 60 }];

test("horaParaMinutos converte horário em minutos", function () {
  assert.equal(horaParaMinutos("09:00"), 540);
  assert.equal(horaParaMinutos("10:30"), 630);
});

test("agenda vazia nunca tem conflito", function () {
  assert.equal(haConflito("10:00", 60, []), false);
});

test("escova às 10:00 conflita com corte às 10:00", function () {
  assert.equal(haConflito("10:00", 30, corteAs10), true);
});

test("escova às 10:30 conflita com corte às 10:00", function () {
  assert.equal(haConflito("10:30", 30, corteAs10), true);
});

test("escova às 11:00 está livre (começa quando o corte termina)", function () {
  assert.equal(haConflito("11:00", 30, corteAs10), false);
});

test("escova às 09:30 está livre (termina quando o corte começa)", function () {
  assert.equal(haConflito("09:30", 30, corteAs10), false);
});

test("corte às 09:30 conflita (invade o horário das 10:00)", function () {
  assert.equal(haConflito("09:30", 60, corteAs10), true);
});

test("coloração às 09:00 conflita (dura até 10:30)", function () {
  assert.equal(haConflito("09:00", 90, corteAs10), true);
});

test("atendimento comprido que envolve o existente conflita", function () {
  assert.equal(haConflito("09:00", 180, corteAs10), true);
});

test("atendimento dentro de outro conflita", function () {
  assert.equal(haConflito("10:15", 30, corteAs10), true);
});

test("com vários agendamentos, o espaço entre eles está livre", function () {
  const agenda = [
    { inicio: "09:00", duracao: 60 },
    { inicio: "11:00", duracao: 60 },
  ];
  assert.equal(haConflito("10:00", 60, agenda), false);
});

test("com vários agendamentos, detecta conflito com o segundo", function () {
  const agenda = [
    { inicio: "09:00", duracao: 60 },
    { inicio: "11:00", duracao: 60 },
  ];
  assert.equal(haConflito("11:30", 30, agenda), true);
});
test("escova não oferece horáris sobrepostos a um corte às 10:00", function () {
  const marcados = [{ inicio: "10:00", duracao: 60 }];
  const livres = gerarHorariosLivres("2026-10-30", 30, marcados);

  assert.equal(livres.includes("10:00"), false);
  
  assert.equal(livres.includes("10:30"), false);
})

test("domingo não tem como oferecer horários livres", function () {
  const livres = gerarHorariosLivres("2026-11-01", 30, []);
  assert.deepEqual(livres, []);
});

test("depois de cancelar, o horário volta a aparecer como livre", () => {
    const data = "2026-11-02"; // segunda-feira
    const marcados = [{ data, inicio: "10:00", duracao: 60 }];

    assert.ok(!gerarHorariosLivres(data, 60, marcados).includes("10:00"));

    const depois = cancelarAgendamento(marcados, data, "10:00");

    assert.ok(gerarHorariosLivres(data, 60, depois).includes("10:00"));
});

test("cancelar não apaga o mesmo horário de outro dia", () => {
    const marcados = [
        { data: "2026-11-02", inicio: "10:00" },
        { data: "2026-11-03", inicio: "10:00" },
    ];

    const depois = cancelarAgendamento(marcados, "2026-11-02", "10:00");

    assert.equal(depois.length, 1);
    assert.equal(depois[0].data, "2026-11-03");
});

test("não oferece horários durante o almoço", function () {
  const livres = gerarHorariosLivres("2026-10-30", 30, []);

  assert.equal(livres.includes("12:00"), false);
  assert.equal(livres.includes("12:30"), false);
  assert.equal(livres.includes("13:00"), true);
});

test("não oferece início às 18:00 nem horários que terminem depois do fechamento", function () {
  const livres = gerarHorariosLivres("2026-10-30", 30, []);

  assert.equal(livres.includes("17:30"), true); // termina exatamente às 18:00
  assert.equal(livres.includes("18:00"), false);
});

test("serviço de 90 minutos não pode começar às 17:00", function () {
  const livres = gerarHorariosLivres("2026-10-30", 90, []);

  assert.equal(livres.includes("16:30"), true); // termina exatamente às 18:00
  assert.equal(livres.includes("17:00"), false); // terminaria às 18:30
});