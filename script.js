function openModal(src) {
    document.getElementById("imageModal").style.display = "block";
    document.getElementById("modalImage").src = src;
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}

/* Mostra texto*/

function mostrarTextoGradualmente() {

    const textoCompleto = "Você é a expressão mais fascinante que já encontrei, uma fórmula única que define um sentimento em função da felicidade. As incógnitas da vida surgirão, mas para nós o limite é o infinito! Derivamos cada obstáculo e integramos todo tipo de aventura nessa álgebra vibrante do amor. O número imaginário fica subentendido, pois o nosso é um amor real e absoluto, e você sabe bem disso. Que o imaginário fique para quem o compreende… somente os loucos conseguem! A matemática é a poesia dos apaixonados: somando eu e você e eliminando as indeterminações, o resultado só pode ser felicidade eterna. Te amo! ❤️ \n \n Ass: Ayrton Borges";
    
    const elementoTexto = document.getElementById("formula-text");
    let indice = 0;

    function adicionarProximoCaractere() {
        if (textoCompleto.charAt(indice) === "\n") {
            elementoTexto.innerHTML += "<br>";  // Insere uma quebra de linha
        } else {
            elementoTexto.innerHTML += textoCompleto.charAt(indice); // Adiciona o próximo caractere
        }
        indice++;
        setTimeout(adicionarProximoCaractere, 100); // Controla a velocidade de exibição
    }

    adicionarProximoCaractere();
}


/* Exibir a fórmula do Amor */

const canvas = document.getElementById('grafico');
const ctx = canvas.getContext('2d');
const largura = canvas.width;
const altura = canvas.height;
const escalaX = largura / (2 * Math.sqrt(Math.PI));
const escalaY = altura / 5; // Ajuste da escala Y para mostrar mais detalhes
const centroX = largura / 2;
const centroY = altura / 2;

let a = 0; // Valor inicial de 'a'
const aMax = 700; // Valor máximo de 'a' para a animação
const duracao = 5500000; // Duração total da animação em milissegundos

function desenharGrafico(a) {
    // Limpar o canvas
    ctx.clearRect(0, 0, largura, altura);

    // Desenhar o gráfico da função
    ctx.beginPath();
    ctx.strokeStyle = 'red';

    const passo = 0.001;
    let primeiroPonto = true;

    for (let x = -Math.sqrt(Math.PI); x <= Math.sqrt(Math.PI); x += passo) {
        const xTela = centroX + x * escalaX;
        let y;

        try {
            // Cálculo de x^(2/3) para x negativos
            const xPow = Math.pow(Math.abs(x), 2 / 3);

            // Cálculo da função
            y = xPow + (Math.E / 3) * Math.sqrt(Math.PI - Math.pow(x, 2)) * Math.sin(a * Math.PI * x);
        } catch (e) {
            continue;
        }

        const yTela = centroY - y * escalaY;

        if (primeiroPonto) {
            ctx.moveTo(xTela, yTela);
            primeiroPonto = false;
        } else {
            ctx.lineTo(xTela, yTela);
        }
    }

    ctx.stroke();
}

function animarGrafico() {
    const inicio = Date.now();

    function atualizar() {
        const tempoDecorrido = Date.now() - inicio;
        const progresso = tempoDecorrido / duracao;
        a = progresso * aMax;

        desenharGrafico(a);

        if (tempoDecorrido < duracao) {
            requestAnimationFrame(atualizar);
        } else {
            desenharGrafico(aMax); // Garantir que o gráfico final com a = aMax seja desenhado
        }
    }
    atualizar();
}

window.onload = function () {
    mostrarTextoGradualmente();
    animarGrafico(); // Se você quiser manter a animação do gráfico
};
