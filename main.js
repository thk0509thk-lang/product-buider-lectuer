const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const generatorBtn = document.getElementById('generator-btn');
const lottoNumbersDiv = document.getElementById('lotto-numbers');

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
});

generatorBtn.addEventListener('click', () => {
  lottoNumbersDiv.innerHTML = '';

  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const numberSet = new Set();
      while (numberSet.size < 5) {
        numberSet.add(Math.floor(Math.random() * 45) + 1);
      }
      
      const sortedNumbers = Array.from(numberSet).sort((a, b) => a - b);
      const setDiv = document.createElement('div');
      setDiv.className = 'lotto-set';

      sortedNumbers.forEach((number, index) => {
        setTimeout(() => {
          const ball = document.createElement('div');
          ball.className = 'lotto-ball';
          ball.textContent = number;
          setDiv.appendChild(ball);
        }, index * 100);
      });

      lottoNumbersDiv.appendChild(setDiv);
    }, i * 600); 
  }
});
