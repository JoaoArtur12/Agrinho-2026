/* =====================================================
   AGRINHO 2026
   main.js
   Todas as funcionalidades JavaScript do projeto
===================================================== */


/* =====================================================
   MENU RESPONSIVO MOBILE
===================================================== */

const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

if(menuToggle){
    menuToggle.addEventListener("click", () => {
        menu.classList.toggle("show");
    });
}


/* =====================================================
   DARK MODE
===================================================== */

const darkBtn = document.getElementById("darkModeBtn");

if(localStorage.getItem("darkMode") === "true"){
    document.body.classList.add("dark");
    darkBtn.textContent = "☀";
}

if(darkBtn){
    darkBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const ativo = document.body.classList.contains("dark");

        localStorage.setItem("darkMode", ativo);

        darkBtn.textContent = ativo ? "☀" : "🌙";
    });
}


/* =====================================================
   BOTÃO VOLTAR AO TOPO
===================================================== */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if(window.scrollY > 500){
        backToTop.style.display = "block";
    }
    else{
        backToTop.style.display = "none";
    }

});

if(backToTop){
    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    });
}


/* =====================================================
   HEADER DINÂMICO
===================================================== */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        header.style.padding = "5px 2%";
        header.style.boxShadow = "0 5px 20px rgba(0,0,0,.2)";

    }else{

        header.style.padding = "10px 2%";
        header.style.boxShadow = "none";

    }

});


/* =====================================================
   CONTADORES ANIMADOS
===================================================== */

const counters = document.querySelectorAll(".count");

function iniciarContadores(){

    counters.forEach(counter => {

        const target = +counter.dataset.target;

        let current = 0;

        const increment = target / 80;

        const updateCounter = () => {

            current += increment;

            if(current < target){

                counter.innerText = Math.floor(current);

                requestAnimationFrame(updateCounter);

            }else{

                counter.innerText = target + "%";

            }

        };

        updateCounter();

    });

}

let contadorExecutado = false;

window.addEventListener("scroll", () => {

    const secao = document.getElementById("impactos");

    if(!secao) return;

    const posicao = secao.getBoundingClientRect().top;

    if(posicao < window.innerHeight && !contadorExecutado){

        iniciarContadores();

        contadorExecutado = true;

    }

});


/* =====================================================
   QUIZ DE SUSTENTABILIDADE
===================================================== */

const quizButtons = document.querySelectorAll(".quiz-btn");
const quizResult = document.getElementById("quiz-result");

quizButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        const resposta = btn.innerText;

        if(resposta.includes("Solar")){

            quizResult.innerHTML =
            "✅ Correto! A energia solar é uma fonte renovável.";

            quizResult.style.color = "green";

        }else{

            quizResult.innerHTML =
            "❌ Incorreto. A resposta correta é Energia Solar.";

            quizResult.style.color = "red";

        }

    });

});


/* =====================================================
   CALCULADORA ECOLÓGICA
===================================================== */

const calcBtn = document.getElementById("calcBtn");

if(calcBtn){

    calcBtn.addEventListener("click", () => {

        const agua =
        parseFloat(document.getElementById("agua").value) || 0;

        const energia =
        parseFloat(document.getElementById("energia").value) || 0;

        const reciclagem =
        parseFloat(document.getElementById("reciclagem").value) || 0;

        let pontos = 100;

        pontos -= agua / 20;
        pontos -= energia / 10;
        pontos += reciclagem * 2;

        if(pontos > 100) pontos = 100;
        if(pontos < 0) pontos = 0;

        let classificacao = "";

        if(pontos >= 80){

            classificacao = "🌱 Excelente";

        }else if(pontos >= 60){

            classificacao = "✅ Bom";

        }else if(pontos >= 40){

            classificacao = "⚠ Médio";

        }else{

            classificacao = "❌ Precisa melhorar";

        }

        document.getElementById("calcResult").innerHTML =
        `
        Pontuação Sustentável:
        <strong>${pontos.toFixed(0)}/100</strong>
        <br>
        ${classificacao}
        `;

    });

}


/* =====================================================
   CARROSSEL AUTOMÁTICO
===================================================== */

const track = document.querySelector(".carousel-track");

if(track){

    let position = 0;

    setInterval(() => {

        const imagens =
        document.querySelectorAll(".carousel-track img");

        if(imagens.length === 0) return;

        position++;

        if(position >= imagens.length){

            position = 0;

        }

        track.style.transform =
        `translateX(-${position * 420}px)`;

    },3000);

}


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements = document.querySelectorAll(
".card, .counter, .quiz-container, .calc-container"
);

function reveal(){

    revealElements.forEach(element => {

        const elementTop =
        element.getBoundingClientRect().top;

        const visible = 100;

        if(elementTop < window.innerHeight - visible){

            element.classList.add("active-reveal");

        }

    });

}

window.addEventListener("scroll", reveal);

reveal();


/* =====================================================
   EFEITO DE DIGITAÇÃO NO BANNER
===================================================== */

const tituloBanner =
document.querySelector("#banner h1");

if(tituloBanner){

    const textoOriginal =
    tituloBanner.textContent;

    tituloBanner.textContent = "";

    let i = 0;

    function digitar(){

        if(i < textoOriginal.length){

            tituloBanner.textContent +=
            textoOriginal.charAt(i);

            i++;

            setTimeout(digitar,100);

        }

    }

    digitar();

}


/* =====================================================
   PARALLAX LEVE
===================================================== */

window.addEventListener("scroll", () => {

    const banner =
    document.getElementById("banner");

    if(!banner) return;

    let offset = window.pageYOffset;

    banner.style.backgroundPositionY =
    offset * 0.5 + "px";

});


/* =====================================================
   EFEITO NOS CARDS
===================================================== */

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform =
        "translateY(-10px) scale(1.03)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
        "translateY(0px) scale(1)";

    });

});


/* =====================================================
   ANIMAÇÃO DE NÚMEROS FLUTUANTES
===================================================== */

function criarParticula(){

    const particle =
    document.createElement("div");

    particle.innerHTML = "🌱";

    particle.style.position = "fixed";

    particle.style.left =
    Math.random() * window.innerWidth + "px";

    particle.style.bottom = "-20px";

    particle.style.fontSize = "20px";

    particle.style.pointerEvents = "none";

    particle.style.zIndex = "999";

    document.body.appendChild(particle);

    let posY = -20;

    const interval = setInterval(() => {

        posY += 2;

        particle.style.bottom =
        posY + "px";

        if(posY > window.innerHeight + 100){

            particle.remove();

            clearInterval(interval);

        }

    },20);

}

setInterval(criarParticula,4000);


/* =====================================================
   MENSAGEM DE BOAS-VINDAS
===================================================== */

window.addEventListener("load", () => {

    console.log(
        "🌱 Projeto Agrinho 2026 carregado com sucesso!"
    );

});


/* =====================================================
   DESTAQUE DO MENU CONFORME A SEÇÃO
===================================================== */

const sections =
document.querySelectorAll("section");

const navLinks =
document.querySelectorAll(".menu a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
        section.offsetTop - 120;

        const sectionHeight =
        section.clientHeight;

        if(window.scrollY >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") ===
        "#" + current){

            link.classList.add("active");

        }

    });

});


/* =====================================================
   SOM DE CLIQUE (OPCIONAL)
   Necessário adicionar:
   sons/click.mp3
===================================================== */

/*
const audio = new Audio("sons/click.mp3");

document.querySelectorAll("button").forEach(btn => {

    btn.addEventListener("click", () => {

        audio.currentTime = 0;
        audio.play();

    });

});
*/


/* =====================================================
   FIM DO ARQUIVO
===================================================== */