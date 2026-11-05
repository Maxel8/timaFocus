const timer = document.querySelector("#timer");
const toggle = document.querySelector("#toggle");
const reset = document.querySelector("#reset");
const minutes = document.querySelector("#minutes");
const seconds = document.querySelector("#seconds");
const status = document.querySelector("#status");

let time = 1500;
let time_left = time;
let interval = null;

// Zeit formatieren (MM:SS)
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

// Anzeige aktualisieren
timer.textContent = formatTime(time_left);

// Eingabe übernehmen
function updateTime() {
    if (interval !== null) return;

    const min = Number(minutes.value);
    const sec = Number(seconds.value);

    if (min < 0 || sec < 0 || sec > 59) return;

    time = min * 60 + sec;
    time_left = time;

    timer.textContent = formatTime(time_left);
    status.textContent = "";
    timer.classList.remove("finished");
}

// BUTTON 1 (Start, Pause, Fortsetzen)
minutes.addEventListener("change", updateTime);
seconds.addEventListener("change", updateTime);

toggle.addEventListener("click", () => {

    if (interval === null) {

        if (time_left <= 0) return;

        toggle.textContent = "Pause";

        interval = setInterval(() => {
            if (time_left > 0) {
                time_left--;
                timer.textContent = formatTime(time_left);

                if (time_left === 0) {
                    clearInterval(interval);
                    interval = null;

                    toggle.textContent = "Start";

                    status.textContent = "Fokuszeit abgeschlossen!";
                    timer.classList.add("finished");
                }
            }
        }, 1000);

    } else {

        clearInterval(interval);
        interval = null;

        toggle.textContent = "Fortsetzen";
    }
});


//BUTTON 2 (Reset)
reset.addEventListener("click", () => {
    clearInterval(interval);
    interval = null;

    toggle.textContent = "Start";

    status.textContent = "";
    timer.classList.remove("finished");

    updateTime();
});
