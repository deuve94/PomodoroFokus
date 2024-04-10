const html = document.querySelector('html');
const Bfoco = document.querySelector('.app__card-button--foco');
const Bcurto = document.querySelector('.app__card-button--curto');
const Blongo = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const start_pauseBt = document.querySelector('#start-pause');
const musica_foco = document.querySelector('#alternar-musica');
const musica_audio = new Audio('/sons/luna-rise-part-one.mp3');
musica_audio.loop = true
const musica_play = new Audio('/sons/play.wav')
const musica_pause = new Audio('/sons/pause.mp3')
const fim_do_tempo = new Audio('/sons/beep.mp3')
const Botao_iniciarOUpausar = document.querySelector('#start-pause span')
const ImgBtnIniciarPausar = document.querySelector('.app__card-primary-butto-icon')
const Relogio = document.querySelector('#timer')


let tempoDecorridosEmSegundos = 1500
let intervaloId = null

musica_foco.addEventListener('change', () => {
    if (musica_audio.paused) {
        musica_play.play()
        musica_audio.play()
    } else {
        musica_pause.play()
        musica_audio.pause()
    };
})

Bfoco.addEventListener('click', () => {
    tempoDecorridosEmSegundos = 1500
    alterandoContexto('foco');
    Bfoco.classList.add('active');
});

Bcurto.addEventListener('click', () => {
    tempoDecorridosEmSegundos = 300
    alterandoContexto('descanso-curto');
    Bcurto.classList.add('active');
});

Blongo.addEventListener('click', () => {
    tempoDecorridosEmSegundos = 900
    alterandoContexto('descanso-longo');
    Blongo.classList.add('active');
});

function alterandoContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto){
        contexto.classList.remove('active');
    })
    
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);

    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície. <br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `
            break;
        default:
            break;
    }
};

const contagemRegressiva = () => {
    if (tempoDecorridosEmSegundos <= 0) {
        fim_do_tempo.play()
        zerar()
        alert('Tempo finalizado')
        return
    }
    tempoDecorridosEmSegundos -= 1
    mostrarTempo()
}

start_pauseBt.addEventListener('click', iniciarOUpausar)

function iniciarOUpausar() {
    if (intervaloId) {
        zerar()
        return
    }
    intervaloId = setInterval(contagemRegressiva, 1000)
    Botao_iniciarOUpausar.textContent = "Pausar"
    ImgBtnIniciarPausar.setAttribute('src', '/imagens/pause.png')
}

function zerar() {
    clearInterval(intervaloId)
    Botao_iniciarOUpausar.textContent = "Começar"
    ImgBtnIniciarPausar.setAttribute('src', '/imagens/play_arrow.png')
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridosEmSegundos * 1000)
    const tempoformatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    Relogio.innerHTML = `${tempoformatado}`
}

mostrarTempo()