const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const generatorBtn = document.getElementById('generator-btn');
const lottoNumbersDiv = document.getElementById('lotto-numbers');
const coffeeBtn = document.getElementById('coffee-btn');
const coffeeResultDiv = document.getElementById('coffee-result');
const menuBtn = document.getElementById('menu-btn');
const menuResultDiv = document.getElementById('menu-result');

// 테마 변경
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  body.classList.toggle('light-mode');
});

// 초기 테마 설정
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !body.classList.contains('light-mode')) {
    body.classList.add('dark-mode');
} else {
    body.classList.add('light-mode');
}

// 데이터 목록
const coffeeList = ["아메리카노", "카페라떼", "카푸치노", "바닐라 라떼", "카라멜 마끼아또", "콜드브루", "아인슈페너", "카페모카", "에스프레소", "디카페인 커피"];
const menuList = ["김치찌개", "된장찌개", "비빔밥", "불고기", "제육볶음", "돈까스", "초밥", "파스타", "피자", "햄버거", "샌드위치", "라면", "떡볶이", "치킨", "짜장면", "짬뽕"];

// 추천 함수
function recommend(list, resultDiv) {
    resultDiv.innerHTML = ''; // 이전 결과 삭제
    resultDiv.classList.remove('fade-in');

    // 랜덤 아이템 선택
    const randomIndex = Math.floor(Math.random() * list.length);
    const selectedItem = list[randomIndex];

    // 결과 표시 및 애니메이션
    setTimeout(() => {
        resultDiv.textContent = selectedItem;
        resultDiv.classList.add('fade-in');
    }, 100); // 약간의 딜레이 후 애니메이션 시작
}

// 커피 추천
coffeeBtn.addEventListener('click', () => {
    recommend(coffeeList, coffeeResultDiv);
});

// 메뉴 추천
menuBtn.addEventListener('click', () => {
    recommend(menuList, menuResultDiv);
});


// 로또 번호 생성
generatorBtn.addEventListener('click', () => {
  lottoNumbersDiv.innerHTML = ''; // 이전 번호 삭제

  // 최근 당첨 번호에 가중치를 부여한 번호 목록 생성
  const weightedNumbers = [];
  if (typeof recentWinningNumbers !== 'undefined') {
    recentWinningNumbers.flat().forEach(number => {
        for (let i = 0; i < 3; i++) { // 가중치 3배
            weightedNumbers.push(number);
        }
    });
  }

  // 1부터 45까지의 모든 번호 추가
  for (let i = 1; i <= 45; i++) {
      weightedNumbers.push(i);
  }

  // 5개 세트의 번호를 순차적으로 생성
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      // 6개의 유니크한 번호 추첨
      const numbers = new Set();
      while (numbers.size < 6) {
        const randomIndex = Math.floor(Math.random() * weightedNumbers.length);
        numbers.add(weightedNumbers[randomIndex]);
      }

      // 번호를 오름차순으로 정렬
      const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
      
      const setDiv = document.createElement('div');
      setDiv.className = 'lotto-set';

      // 번호를 하나씩 순차적으로 표시
      sortedNumbers.forEach((number, index) => {
        setTimeout(() => {
          const numberCircle = document.createElement('div');
          numberCircle.className = 'number-circle';
          numberCircle.textContent = number;
          
          // 번호 범위에 따라 색상 지정
          if (number <= 10) {
            numberCircle.style.backgroundColor = '#fbc400'; // 노란색
          } else if (number <= 20) {
            numberCircle.style.backgroundColor = '#69c8f2'; // 파란색
          } else if (number <= 30) {
            numberCircle.style.backgroundColor = '#ff7272'; // 빨간색
          } else if (number <= 40) {
            numberCircle.style.backgroundColor = '#aaa';    // 회색
          } else {
            numberCircle.style.backgroundColor = '#b0d840'; // 녹색
          }
          numberCircle.style.color = '#fff'; // 모든 공의 글자색은 흰색

          // 애니메이션 클래스 추가
          numberCircle.classList.add('bounce-in');

          setDiv.appendChild(numberCircle);
        }, index * 100); // 0.1초 간격으로 번호 표시
      });

      lottoNumbersDiv.appendChild(setDiv);
    }, i * 600); // 0.6초 간격으로 세트 표시
  }
});
