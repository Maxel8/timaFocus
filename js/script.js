const timer = document.querySelector("#timer");
const start = document.querySelector("#start");
const pause = document.querySelector("#pause");
const reset = document.querySelector("#reset");

let time = 30;
let time_left = time;
let interval = null;

// Anzeige aktualisieren
timer.textContent = time_left;

// Start
start.addEventListener("click", () => {
    if (interval !== null) return;

    interval = setInterval(() => {
        if (time_left > 0) {
            time_left--;
            timer.textContent = time_left;
        } else {
            clearInterval(interval);
            interval = null;
        }
    }, 1000);
});

// Pause
pause.addEventListener("click", () => {
    clearInterval(interval);
    interval = null;
});

// Reset
reset.addEventListener("click", () => {
    clearInterval(interval);
    interval = null;

    time_left = time;
    timer.textContent = time_left;
});
