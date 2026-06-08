/* =====================================================
   AGRINHO 2026 - main.js COMPLETO
   Responsável por toda interatividade do site
===================================================== */

/* ================= MENU MOBILE ================= */
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        menu.classList.toggle("show");
    });
}

/* ================= DARK MODE ================= */
const darkBtn = document.getElementById("darkModeBtn");

if (darkBtn) {
    // Aplica dark mode se estava salvo
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark");
        darkBtn.textContent = "☀";
    }

    darkBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        const ativo = document.body.classList.contains("dark");
        localStorage.setItem("darkMode", ativo);

        darkBtn.textContent = ativo ? "☀" : "🌙";
    });
}

/* ================= BOTÃO VOLTAR AO TOPO ================= */
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
});

if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* ================= CONTADORES ANIMADOS ================= */
const counters = document.querySelectorAll(".counter");

function animateCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        let current = 0;
        const step = target / 100;

        const update = () => {
            current += step;
            if (current < target) {
                counter.innerText = Math.floor(current) + "%";
                requestAnimationFrame(update);
            } else {
                counter.innerText = target + "%";
            }
        };

        update();
    });
}

let countersStarted = false;

window.addEventListener("scroll", () => {
    const section = document.getElementById("impactos");
    if (!section) return;

    const pos = section.getBoundingClientRect().top;
    if (pos < window.innerHeight && !countersStarted) {
        animateCounters();
        countersStarted = true;
    }
});

/* ================= LINHA DO TEMPO ================= */
const timelineItems = document.querySelectorAll(".timeline-event");

timelineItems.forEach(item => {
    item.style.opacity = 0;
    item.style.transform = "translateX(-50px)";
    item.style.transition = "0.6s";
});

function showTimeline() {
    timelineItems.forEach(item => {
        const top = item.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            item.style.opacity = 1;
            item.style.transform = "translateX(0)";
        }
    });
}

window.addEventListener("scroll", showTimeline);

/* ================= JOGO EDUCATIVO ================= */
const gameButtons = document.querySelectorAll(".game-btn");
const gameResult = document.getElementById("gameResult");
let score = 0;

gameButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const value = parseInt(btn.getAttribute("data-score"));
        score += value;

        if (gameResult) {
            gameResult.innerText = `Pontuação atual: ${score}`;

            if (score >= 15) {
                gameResult.innerText += " 🌱 Excelente fazenda sustentável!";
            } else if (score <= -5) {
                gameResult.innerText += " ⚠ Práticas prejudiciais!";
            }
        }
    });
});

/* ================= MAPA INTERATIVO ================= */
const farms = document.querySelectorAll(".farm");

farms.forEach(farm => {
    farm.addEventListener("click", () => {
        alert("Você visitou " + farm.innerText);
    });
});

/* ================= GRÁFICO EM CANVAS ================= */
const canvas = document.getElementById("graficoAgro");

if (canvas) {
    const ctx = canvas.getContext("2d");

    const dados = [60, 80, 90, 70]; // Produção fictícia
    const labels = ["2010", "2015", "2020", "2026"];

    function desenharGrafico() {
        const largura = canvas.width;
        const altura = canvas.height;
        ctx.clearRect(0, 0, largura, altura);

        const barWidth = 80;
        const gap = 40;

        dados.forEach((valor, i) => {
            const x = i * (barWidth + gap) + 60;
            const y = altura - valor * 3;

            ctx.fillStyle = "#2e7d32";
            ctx.fillRect(x, y, barWidth, valor * 3);

            ctx.fillStyle = "#000";
            ctx.fillText(valor + "%", x + 20, y - 10);
            ctx.fillText(labels[i], x + 20, altura - 10);
        });
    }

    desenharGrafico();
}

/* ================= SCROLL SUAVE PARA O MENU ================= */
document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const id = link.getAttribute("href").replace("#", "");
        const section = document.getElementById(id);

        if (section) {
            window.scrollTo({ top: section.offsetTop - 70, behavior: "smooth" });
        }

        // Fecha menu mobile
        menu.classList.remove("show");
    });
});

/* ================= EFEITO DE ENTRADA DAS SEÇÕES ================= */
const sections = document.querySelectorAll(".section");

sections.forEach(sec => {
    sec.style.opacity = 0;
    sec.style.transform = "translateY(40px)";
    sec.style.transition = "0.6s";
});

function revealSections() {
    sections.forEach(sec => {
        const top = sec.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            sec.style.opacity = 1;
            sec.style.transform = "translateY(0)";
        }
    });
}

window.addEventListener("scroll", revealSections);

/* ================= LOG DE INICIALIZAÇÃO ================= */
window.addEventListener("load", () => {
    console.log("🌱 Agrinho 2026 carregado com sucesso!");
});