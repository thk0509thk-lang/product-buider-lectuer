const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const generatorBtn = document.getElementById('generator-btn');
const lottoNumbersDiv = document.getElementById('lotto-numbers');

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
});

generatorBtn.addEventListener('click', () => {
  lottoNumbersDiv.innerHTML = '';

  const weightedNumbers = [];
  recentWinningNumbers.flat().forEach(number => {
      for (let i = 0; i < 3; i++) { 
          weightedNumbers.push(number);
      }
  });

  for (let i = 1; i <= 45; i++) {
      weightedNumbers.push(i);
  }

  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const numberSet = new Set();
      while (numberSet.size < 5) {
        const randomIndex = Math.floor(Math.random() * weightedNumbers.length);
        numberSet.add(weightedNumbers[randomIndex]);
      }
      
      const sortedNumbers = Array.from(numberSet).sort((a, b) => a - b);
      const setDiv = document.createElement('div');
      setDiv.className = 'lotto-set';

      sortedNumbers.forEach((number, index) => {
        setTimeout(() => {
          const ball = document.createElement('div');
          ball.className = 'lotto-ball';
          ball.textContent = number;

          if (number <= 10) {
            ball.classList.add('green-ball');
          } else if (number <= 20) {
            ball.classList.add('blue-ball');
          } else if (number <= 30) {
            ball.classList.add('red-ball');
          } else if (number <= 40) {
            ball.classList.add('orange-ball');
          } else {
            ball.classList.add('purple-ball');
          }

          setDiv.appendChild(ball);
        }, index * 100);
      });

      lottoNumbersDiv.appendChild(setDiv);
    }, i * 600);
  }
});
