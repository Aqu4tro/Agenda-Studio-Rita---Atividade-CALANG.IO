const CHAVE = "agendamentos";

export function carregarAgendamentos() {
    try {
        return JSON.parse(localStorage.getItem(CHAVE)) || [];
    } catch {
        return [];
    }
}

export function salvarAgendamentos(lista) {
    localStorage.setItem(CHAVE, JSON.stringify(lista));
}