const generatorBtn = document.getElementById('generator-btn');
const lottoNumbersDiv = document.getElementById('lotto-numbers');

generatorBtn.addEventListener('click', () => {
  const numbers = new Set();
  while (numbers.size < 6) {
    numbers.add(Math.floor(Math.random() * 45) + 1);
  }

  lottoNumbersDiv.textContent = Array.from(numbers).join(', ');
});
