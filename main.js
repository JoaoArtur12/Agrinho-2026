
/* DARK MODE */
const darkBtn = document.getElementById("darkModeBtn");

darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

/* CONTADORES */
const stats = document.querySelectorAll(".stat");

let started = false;

window.addEventListener("scroll", () => {

    const section = document.getElementById("impactos");

    if(!section) return;

    if(section.getBoundingClientRect().top < window.innerHeight && !started){

        started = true;

        stats.forEach(stat => {

            let target = +stat.dataset.target;
            let count = 0;

            const update = () => {
                count++;
                stat.innerText = count + "%";

                if(count < target){
                    requestAnimationFrame(update);
                }
            };

            update();
        });
    }
});

/* DIAGNÓSTICO */
let score = 0;

document.querySelectorAll(".action").forEach(btn => {
    btn.addEventListener("click", () => {

        score += +btn.dataset.value;

        let msg = "";

        if(score >= 20){
            msg = "Excelente sustentabilidade 🌱";
        } else if(score >= 0){
            msg = "Regular ⚠";
        } else {
            msg = "Ruim ❌";
        }

        document.getElementById("result").innerText =
        `Score: ${score} - ${msg}`;
    });
});

/* CLIMA REAL */
document.getElementById("searchWeather").addEventListener("click", async () => {

    const city = document.getElementById("cityInput").value;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=-25.42&longitude=-49.27&current_weather=true`;

    const res = await fetch(url);
    const data = await res.json();

    document.getElementById("weatherResult").innerHTML =
    `🌡 ${data.current_weather.temperature}°C<br>
     💨 ${data.current_weather.windspeed} km/h`;
});