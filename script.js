const visor = document.getElementById("visor");
const botoes = document.querySelector(".botoes");

let valorAtual = "0";
let valorAnterior = null;
let operadorAtual = null;
let iniciarNovoNumero = false;

function atualizarVisor() {
    visor.value = valorAtual;
}

function formatarResultado(numero) {
    if (!Number.isFinite(numero)) {
        throw new Error("Resultado inválido");
    }

    if (Object.is(numero, -0)) numero = 0;

    return String(Number(numero.toPrecision(12)));
}