
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

function raizQuadrada(numero) {
    if (numero < 0) {
        throw new Error("Raiz quadrada inválida");
    }

    return Math.sqrt(numero);
}

function seno(graus) {
    return Math.sin(graus * Math.PI / 180);
}

if (typeof module !== "undefined") {
    module.exports = { calcular, raizQuadrada, seno };
}
