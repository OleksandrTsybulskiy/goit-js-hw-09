import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const elements = {
    input: document.querySelector('#datetime-picker'),
    button: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

elements.button.disabled = true;

const currentDate = new Date();


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);

      if (selectedDates[0].getTime() - currentDate.getTime() < 0) {
        Notiflix.Report.warning('Please choose a date in the future')
      }
      else {
        elements.button.disabled = false;
        elements.button.addEventListener('click', () => {
            const timerId = setInterval(() => {
                const timer = new Date();
                const ms = selectedDates[0].getTime() - timer.getTime();
                elements.days.textContent = addLeadingZero(convertMs(ms).days);
                elements.hours.textContent = addLeadingZero(convertMs(ms).hours);
                elements.minutes.textContent = addLeadingZero(convertMs(ms).minutes);
                elements.seconds.textContent = addLeadingZero(convertMs(ms).seconds); 
                elements.button.disabled = true;
                if (ms < 1000) {
                    clearInterval(timerId);
                };
            }, 1000)
        });
      };
    },
};

flatpickr (elements.input, options);

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
};

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
};