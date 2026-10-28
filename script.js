
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

function adicionarNumero(numero) {
    if (iniciarNovoNumero || valorAtual === "Erro") {
        valorAtual = numero;
        iniciarNovoNumero = false;
    } else {
        valorAtual = valorAtual === "0"
            ? numero
            : valorAtual + numero;
    }

    atualizarVisor();
}

function adicionarDecimal() {
    if (iniciarNovoNumero || valorAtual === "Erro") {
        valorAtual = "0.";
        iniciarNovoNumero = false;
    } else if (!valorAtual.includes(".")) {
        valorAtual += ".";
    }

    atualizarVisor();
}

function limpar() {
    valorAtual = "0";
    valorAnterior = null;
    operadorAtual = null;
    iniciarNovoNumero = false;
    atualizarVisor();
}

function calcular(a, operador, b) {
    switch (operador) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            if (b === 0) {
                throw new Error("Divisão por zero");
            }
            return a / b;
        default:
            throw new Error("Operador inválido");
    }
}

function escolherOperador(operador) {
    if (valorAtual === "Erro") return;

    const numero = Number(valorAtual);

    if (operadorAtual !== null && !iniciarNovoNumero) {
        try {
            valorAtual = formatarResultado(
                calcular(valorAnterior, operadorAtual, numero)
            );
        } catch {
            valorAtual = "Erro";
            valorAnterior = null;
            operadorAtual = null;
            iniciarNovoNumero = true;
            atualizarVisor();
            return;
        }
    } else {
        valorAtual = formatarResultado(numero);
    }

    valorAnterior = Number(valorAtual);
    operadorAtual = operador;
    iniciarNovoNumero = true;
    atualizarVisor();
}

function resultado() {
    if (operadorAtual === null || iniciarNovoNumero) return;

    try {
        valorAtual = formatarResultado(
            calcular(
                valorAnterior,
                operadorAtual,
                Number(valorAtual)
            )
        );

        valorAnterior = null;
        operadorAtual = null;
        iniciarNovoNumero = true;
    } catch {
        valorAtual = "Erro";
        valorAnterior = null;
        operadorAtual = null;
        iniciarNovoNumero = true;
    }

    atualizarVisor();
}

function aplicarFuncao(funcao) {
    if (valorAtual === "Erro") return;

    const numero = Number(valorAtual);
    let resultado;

    try {
        switch (funcao) {
            case "sqrt":
                if (numero < 0) {
                    throw new Error("Raiz negativa");
                }
                resultado = Math.sqrt(numero);
                break;

            case "square":
                resultado = numero ** 2;
                break;

            case "sin":
                resultado = Math.sin(numero * Math.PI / 180);
                break;

            case "cos":
                resultado = Math.cos(numero * Math.PI / 180);
                break;

            case "tan":
                if (Math.abs(Math.cos(numero * Math.PI / 180)) < 1e-12) {
                    throw new Error("Tangente indefinida");
                }
                resultado = Math.tan(numero * Math.PI / 180);
                break;

            case "log":
                if (numero <= 0) {
                    throw new Error("Logaritmo inválido");
                }
                resultado = Math.log10(numero);
                break;

            case "ln":
                if (numero <= 0) {
                    throw new Error("Logaritmo inválido");
                }
                resultado = Math.log(numero);
                break;

            default:
                throw new Error("Função desconhecida");
        }

        valorAtual = formatarResultado(resultado);
        iniciarNovoNumero = true;
    } catch {
        valorAtual = "Erro";
        iniciarNovoNumero = true;
    }

    atualizarVisor();
}

function trocarSinal() {
    if (valorAtual === "Erro" || Number(valorAtual) === 0) return;

    valorAtual = formatarResultado(-Number(valorAtual));
    atualizarVisor();
}

botoes.addEventListener("click", (evento) => {
    const botao = evento.target.closest("button");

    if (!botao) return;

    const acao = botao.dataset.acao;
    const valor = botao.dataset.valor;

    if (acao === "limpar") {
        limpar();
    } else if (acao === "numero") {
        adicionarNumero(valor);
    } else if (acao === "decimal") {
        adicionarDecimal();
    } else if (acao === "operador") {
        escolherOperador(valor);
    } else if (acao === "igual") {
        resultado();
    } else if (acao === "sinal") {
        trocarSinal();
    } else if (acao === "cientifica") {
        aplicarFuncao(valor);
    } else if (acao === "constante" && valor === "pi") {
        valorAtual = formatarResultado(Math.PI);
        iniciarNovoNumero = true;
        atualizarVisor();
    }
});
