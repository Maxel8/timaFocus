const timer = document.querySelector("#timer");
const toggle = document.querySelector("#toggle");
const reset = document.querySelector("#reset");
const minutes = document.querySelector("#minutes");
const seconds = document.querySelector("#seconds");
const status = document.querySelector("#status");

let time = 1500;
let time_left = time;

let endTime = null;
let interval = null;


// Service Worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js")
            .then(() => console.log("Service Worker registriert"))
            .catch(error => console.error("Service Worker Fehler:", error));
    });
}

// Zeit formatieren (MM:SS)
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

// Tab-Titel aktualisieren
function updateTitle(text = formatTime(time_left)) {
    document.title = `${text} | timaFocus`;
}

// Anzeige aktualisieren
function updateDisplay() {
    timer.textContent = formatTime(time_left);
    updateTitle();
}

// Timer beenden
function finishTimer() {
    clearInterval(interval);
    interval = null;
    endTime = null;
    time_left = 0;

    updateDisplay();

    toggle.textContent = "Start";

    status.textContent = "Fokuszeit abgeschlossen!";
    timer.classList.add("finished");

    updateTitle("Fertig!");
}

// Verbleibende Zeit berechnen
function updateTimer() {
    time_left = Math.max(
        0,
        Math.ceil((endTime - Date.now()) / 1000)
    );

    updateDisplay();

    if (time_left === 0) {
        finishTimer();
    }
}

// Anzeige initialisieren
updateDisplay();

// Eingabe übernehmen
function updateTime() {
    if (interval !== null) return;

    const min = Number(minutes.value);
    const sec = Number(seconds.value);

    if (min < 0 || sec < 0 || sec > 59) return;

    time = min * 60 + sec;
    time_left = time;

    timer.classList.remove("finished");
    status.textContent = "";

    updateDisplay();
}

// BUTTON 1 (Start, Pause, Fortsetzen)
minutes.addEventListener("change", updateTime);
seconds.addEventListener("change", updateTime);

toggle.addEventListener("click", () => {

    if (interval === null) {

        if (time_left <= 0) return;

        // Zielzeitpunkt festlegen
        endTime = Date.now() + time_left * 1000;

        toggle.textContent = "Pause";
        updateTitle();

        // Anzeige regelmäßig aktualisieren
        updateTimer();
        interval = setInterval(updateTimer, 250);

    } else {

        // Restzeit vor dem Pausieren berechnen
        updateTimer();

        if (interval === null) return;

        clearInterval(interval);
        interval = null;

        // Zielzeitpunkt zurücksetzen
        endTime = null;

        toggle.textContent = "Fortsetzen";
        updateTitle("Pausiert");
    }
});

// BUTTON 2 (Reset)
reset.addEventListener("click", () => {
    clearInterval(interval);
    interval = null;
    endTime = null;

    toggle.textContent = "Start";

    status.textContent = "";
    timer.classList.remove("finished");

    updateTime();
});
