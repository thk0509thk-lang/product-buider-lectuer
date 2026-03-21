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

// 데이터 목록 (객체 형태로 변경)
const coffeeList = [
    { name: "아메리카노", description: "에스프레소에 물을 더해 가장 기본적인 맛을 즐길 수 있는 깔끔한 커피", calories: "약 10-15 kcal" },
    { name: "카페라떼", description: "에스프레소에 스팀 우유를 섞어 부드럽고 고소한 맛이 특징인 커피", calories: "약 180-220 kcal" },
    { name: "카푸치노", description: "에스프레소, 우유, 그리고 풍성한 우유 거품으로 이루어져 부드러움을 극대화한 커피", calories: "약 120-160 kcal" },
    { name: "바닐라 라떼", description: "카페라떼에 달콤한 바닐라 시럽을 추가하여 부드러움과 달콤함을 함께 즐기는 커피", calories: "약 250-300 kcal" },
    { name: "카라멜 마끼아또", description: "달콤한 카라멜 소스와 에스프레소, 우유가 층을 이루어 달콤 쌉싸름한 맛이 매력적인 커피", calories: "약 280-340 kcal" },
    { name: "콜드브루", description: "차가운 물에 오랜 시간 우려내 쓴맛이 적고 부드러운 풍미가 특징인 커피", calories: "약 5-10 kcal" }
];

const menuList = [
    { name: "김치찌개", description: "한국인의 소울푸드! 잘 익은 김치와 돼지고기를 넣어 얼큰하고 개운하게 끓여낸 찌개", calories: "약 450-600 kcal" },
    { name: "된장찌개", description: "구수한 된장을 베이스로 두부, 애호박 등 다양한 채소를 넣어 끓인 건강하고 든든한 찌개", calories: "약 400-550 kcal" },
    { name: "비빔밥", description: "다양한 나물과 고기, 계란을 고추장 또는 간장 양념으로 비벼 먹는 균형 잡힌 한 끼 식사", calories: "약 550-700 kcal" },
    { name: "불고기", description: "얇게 썬 소고기를 달콤한 간장 양념에 재워 야채와 함께 볶거나 구워 먹는 요리", calories: "약 600-750 kcal" },
    { name: "제육볶음", description: "돼지고기를 매콤한 고추장 양념에 재워 볶아낸 요리로, 입맛을 돋우는 최고의 밥도둑", calories: "약 550-700 kcal" },
    { name: "돈까스", description: "두툼한 돼지고기를 바삭하게 튀겨내 달콤한 소스와 함께 먹는, 남녀노소 모두가 사랑하는 메뉴", calories: "약 700-900 kcal" },
    { name: "초밥", description: "신선한 해산물을 식초로 간을 한 밥 위에 얹어 먹는, 깔끔하고 다채로운 맛의 향연", calories: "약 40-70 kcal (1개)" },
    { name: "파스타", description: "토마토, 크림, 오일 등 다양한 소스와 면이 어우러져 만들어내는 이탈리아의 대표 요리", calories: "약 600-900 kcal" },
    { name: "피자", description: "쫄깃한 도우 위에 다채로운 토핑과 치즈를 얹어 구워낸, 함께 즐기기 좋은 파티 음식", calories: "약 250-400 kcal (1조각)" },
    { name: "치킨", description: "바삭한 튀김 옷과 촉촉한 속살의 완벽한 조화! 스트레스를 한 방에 날려주는 국민 간식", calories: "약 250-350 kcal (1조각)" }
];

// 추천 함수 수정
function recommend(list, resultDiv) {
    resultDiv.innerHTML = ''; // 이전 결과 삭제
    resultDiv.classList.remove('fade-in');

    // 랜덤 아이템 선택
    const randomIndex = Math.floor(Math.random() * list.length);
    const selectedItem = list[randomIndex];

    // 결과 표시 및 애니메이션
    setTimeout(() => {
        // 동적으로 HTML 구조 생성
        const nameElement = document.createElement('h3');
        nameElement.textContent = selectedItem.name;

        const descElement = document.createElement('p');
        descElement.className = 'recommend-description';
        descElement.textContent = selectedItem.description;

        const calElement = document.createElement('p');
        calElement.className = 'recommend-calories';
        calElement.textContent = `칼로리: ${selectedItem.calories}`;

        resultDiv.appendChild(nameElement);
        resultDiv.appendChild(descElement);
        resultDiv.appendChild(calElement);
        
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
