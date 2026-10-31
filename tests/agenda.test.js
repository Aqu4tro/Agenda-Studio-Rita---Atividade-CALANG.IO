// Testes da regra de conflito de horários.
// Para rodar: npm test

import { test } from "node:test";
import assert from "node:assert/strict";
import { horaParaMinutos, haConflito } from "../src/regras/agenda.js";

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