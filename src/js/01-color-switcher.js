function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')}`;
  }
  
  const body = document.querySelector('body');
  const startButton = document.querySelector('[data-start]');
  const stopButton = document.querySelector('[data-stop]');

  let colorIntervalId;
  stopButton.setAttribute('disabled', 'disabled');

  startButton.addEventListener('click', handlerStart);
  stopButton.addEventListener('click', handlerStop);
  
  function handlerStop() {
    clearInterval(colorIntervalId);
    startButton.removeAttribute('disabled');
    stopButton.setAttribute('disabled', 'disabled');
  };
  
  function handlerStart() {
    colorIntervalId = colorInterval(); 
    startButton.setAttribute('disabled', 'disabled');
    stopButton.removeAttribute('disabled');
  };
  
  function colorSwitcher() {
    body.style.backgroundColor = getRandomHexColor();
  };
  
  const colorInterval = () => setInterval(colorSwitcher, 1000);