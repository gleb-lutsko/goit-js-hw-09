import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const datetimePicker = document.querySelector('#datetime-picker')
const startBtn = document.querySelector('[data-start]')
const days = document.querySelector('[data-days]')
const hours = document.querySelector('[data-hours]')
const minutes = document.querySelector('[data-minutes]')
const seconds = document.querySelector('[data-seconds]')
startBtn.disabled = true;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      const currentDate = new Date();
      console.log(selectedDates[0]);
        if (selectedDates[0] < currentDate) {
            Notiflix.Notify.failure('Please choose a date in the future.')
        } else {
            startBtn.disabled = false;
    };
  },
};

flatpickr(datetimePicker, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
   return value.toString().padStart(2, "0");
}

startBtn.addEventListener('click', timer);

function timer(evt) {
  startBtn.disabled = true;
    const pickerDate = new Date(datetimePicker.value);
    const currentDate = new Date();
    let timeRemaining = pickerDate - currentDate;
    const intervalId = setInterval(() => {
        days.textContent = addLeadingZero(convertMs(timeRemaining).days);
        hours.textContent = addLeadingZero(convertMs(timeRemaining).hours);
        minutes.textContent = addLeadingZero(convertMs(timeRemaining).minutes);
        seconds.textContent = addLeadingZero(convertMs(timeRemaining).seconds);
        timeRemaining -= 1000;
        console.log(timeRemaining)
        if (timeRemaining < 0) {
          clearInterval(intervalId)
          startBtn.disabled = false;
        }
    }, 1000);
}