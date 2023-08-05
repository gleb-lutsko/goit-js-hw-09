const btnStart = document.querySelector('[data-start]')
const btnStop = document.querySelector('[data-stop]')
const body = document.querySelector('body');
btnStop.disabled = true;
let intervalId = null;
btnStart.addEventListener('click', startColorSwithcer)
btnStop.addEventListener('click', stopColorSwitcher)
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
function startColorSwithcer(evt) {
    btnStart.disabled = true;
    btnStop.disabled = false;
    intervalId = setInterval(() => { body.style.backgroundColor = getRandomHexColor(); }, 1000);
}
function stopColorSwitcher(evt) {
    btnStart.disabled = false;
    clearInterval(intervalId);
    btnStop.disabled = true;
}