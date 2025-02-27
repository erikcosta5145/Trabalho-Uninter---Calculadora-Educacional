let pontuacao = 0;
let numero1, numero2, respostaCorreta, operador;
let ranking = JSON.parse(localStorage.getItem("ranking")) || [];

// Seletores principais
const telaInicio = document.getElementById('tela-inicio');
const telaJogo = document.getElementById('tela-jogo');
const telaRanking = document.getElementById('tela-ranking');
const perguntaEl = document.getElementById('pergunta');
const respostaInput = document.getElementById('resposta');
const enviarBtn = document.getElementById('enviar');
const resultadoEl = document.getElementById('resultado');
const pontuacaoEl = document.getElementById('pontuacao');
const tabelaRanking = document.getElementById('tabela-ranking').getElementsByTagName('tbody')[0];
const nomeInput = document.getElementById('nome-jogador');
const iniciarBtn = document.getElementById('iniciar-jogo');
const sairBtn = document.getElementById('sair');
const voltarInicioBtn = document.getElementById('voltar-inicio');

// Exibe o ranking ao carregar
atualizarTabelaRanking();

// Inicia o jogo
iniciarBtn.addEventListener('click', () => {
    const nomeJogador = nomeInput.value.trim();
    if (nomeJogador === "") {
        alert("Por favor, insira seu nome para começar.");
        return;
    }

    telaInicio.style.display = 'none';
    telaJogo.style.display = 'block';
    pontuacao = 0;
    pontuacaoEl.innerText = `Pontuação: ${pontuacao}`;
    novaPergunta();
});

// Gera uma nova pergunta
function novaPergunta() {
    numero1 = Math.floor(Math.random() * 20) + 1;
    numero2 = Math.floor(Math.random() * 20) + 1;
    operador = Math.random() > 0.5 ? "+" : "-";

    respostaCorreta = operador === "+" ? numero1 + numero2 : numero1 - numero2;

    perguntaEl.innerText = `Quanto é ${numero1} ${operador} ${numero2}?`;
    respostaInput.value = '';
}

// Confirma a resposta
enviarBtn.addEventListener('click', conferirResposta);
respostaInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') conferirResposta();
});

function conferirResposta() {
    const resposta = parseInt(respostaInput.value);
    if (isNaN(resposta)) {
        resultadoEl.innerText = "Insira um número válido!";
        resultadoEl.style.color = "orange";
        return;
    }

    if (resposta === respostaCorreta) {
        pontuacao++;
        resultadoEl.innerText = "Correto! 🎉";
        resultadoEl.style.color = "green";
    } else {
        resultadoEl.innerText = `Errado! A resposta era ${respostaCorreta}. 😢`;
        resultadoEl.style.color = "red";
    }

    pontuacaoEl.innerText = `Pontuação: ${pontuacao}`;
    novaPergunta();
}

// Salva pontuação e exibe ranking
sairBtn.addEventListener('click', () => {
    salvarPontuacao(nomeInput.value.trim(), pontuacao);
    telaJogo.style.display = 'none';
    telaRanking.style.display = 'block';
});

function salvarPontuacao(nome, pontos) {
    ranking.push({ nome, pontos });
    ranking.sort((a, b) => b.pontos - a.pontos);
    localStorage.setItem("ranking", JSON.stringify(ranking));
    atualizarTabelaRanking();
}

// Atualiza a tabela de ranking
function atualizarTabelaRanking() {
    tabelaRanking.innerHTML = "";
    ranking.forEach((jogador, index) => {
        const linha = document.createElement('tr');
        linha.innerHTML = `<td>${index + 1}</td><td>${jogador.nome}</td><td>${jogador.pontos}</td>`;
        tabelaRanking.appendChild(linha);
    });
}

// Voltar ao início
voltarInicioBtn.addEventListener('click', () => {
    telaRanking.style.display = 'none';
    telaInicio.style.display = 'block';
});
