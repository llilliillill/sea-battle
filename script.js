let vrag = [
  'x', 'x', 'x', 'x',  '', 'x',  '', 'x',  '', 'x',
   '',  '',  '',  '',  '', 'x',  '',  '',  '', 'x',
  'x', 'x', 'x',  '',  '',  '',  '', 'x',  '', 'x',
   '',  '',  '',  '', 'x',  '',  '',  '',  '',  '',
   '', 'x', 'x',  '',  '',  '',  '',  '', 'x',  '',
   '',  '',  '',  '',  '',  '', 'x',  '',  '',  '',
  'x',  '', 'x', 'x',  '',  '', 'x',  '',  '', 'x',
  'x',  '',  '',  '',  '',  '', 'x',  '',  '',  '',
  'x',  '', 'x', 'x', 'x',  '', 'x',  '', 'x',  '',
  'x',  '',  '',  '',  '',  '', 'x',  '', 'x',  '',
]

let user = [
 'x',  '', 'x', 'x', 'x', 'x',  '', 'x',  '', 'x',
  '',  '',  '',  '',  '',  '',  '',  '',  '', 'x',
 'x', 'x', 'x',  '', 'x',  '', 'x', 'x',  '', 'x',
  '',  '',  '',  '',  '',  '',  '',  '',  '', 'x',
  '',  '',  '', 'x', 'x', 'x',  '',  '',  '',  '',
  '', 'x',  '',  '',  '',  '',  '',  '',  '',  '',
  '', 'x',  '',  '',  '',  '', 'x', 'x',  '', 'x',
  '', 'x',  '', 'x',  '',  '',  '',  '',  '', 'x',
  '',  '',  '',  '',  '',  '',  '', 'x',  '',  '',
  '', 'x', 'x', 'x', 'x', 'x',  '', 'x',  '', 'x',
]

// Массив кораблей user
let korabliUser = [
  [0], [2,3,4,5], [7], [9,19,29,39], [20,21,22],
  [24], [26,27], [43,44,45], [51,61,71], [73],
  [66,67], [69,79], [91,92,93,94,95], [87,97], [99]
]
// Массив кораблей vrag
let korabliVrag = [
  [0,1,2,3], [5,15], [7], [9,19,29], [20,21,22],
  [27], [34], [41,42], [48], [56,66,76,86,96],
  [60,70,80,90], [62,63], [82,83,84], [88,98], [69]
]
// Кол-во пототленных кораблей user
let qKorableyUser = 0;
// Кол-во пототленных кораблей vrag
let qKorableyVrag = 0;
// Отрисовываем кнопки
let fieldLeft = document.querySelector('.field-left');
// Отрисовываем кату пользователя
let fieldRight = document.querySelector('.field-right');
// Все ячейки поля user
let allCellUser = fieldRight.getElementsByTagName('div');
// Все ячейки поля varg
let allCellVrag = fieldLeft.getElementsByTagName('div')
// Вкл/Выкл поле user
let activeFieldUser = true
// Массив ходов user
let allShotUser = [];
// Массив ходов противника
let allShotVrag = [];
// Сообщаем что первым ходит user
document.querySelector('.info').innerHTML = 'ходит: user'

for (let i=0; i<100; i++) {
  // Создаем ячейку море
  let more = document.createElement('div');
  more.setAttribute('class', 'more');
  more.style.cursor = 'pointer';
  fieldLeft.appendChild(more);

  more.onclick = () => {
    if (activeFieldUser) {

      // Запоминаем ход
      allShotUser.push(i)

      if (vrag[i] == 'x') {
        more.setAttribute('class', 'vzriv');

        let indexes = null;
        // Получаем корабль в который попали, 
        // все его индексы - indexes
        for (let j=0; j<korabliVrag.length; j++) {
          if (korabliVrag[j].includes(i)) {
            indexes = korabliVrag[j]
          }
        }

        let popadanie = 0
        // Проверяем сколько попаданий сденано popadanie 
        // и проверяем не потоплен ли он
        for (let i=0; i<allShotUser.length; i++) {
          let index = allShotUser[i]

          // Если попал
          if (indexes.includes(index)) {
            popadanie += 1;
          }

          // Если потопил
          if (popadanie == indexes.length) {
            qKorableyVrag += 1;
            animatYnichtozen(indexes, allCellVrag)
          }
        }
      }
    
      if (vrag[i] == '') {
        more.setAttribute('class', 'mimo')
        // Сообщаем о смене хода
        document.querySelector('.info').innerHTML = 'ходит: vrag'
        // Блокируем поле
        activeFieldUser = false
        // Передаем ход vrag
        attackVrag();
      }

      // Блокируем ячейку которую уже нажимали
      more.onclick = () => false;
    }

  }
}

for (let i=0; i<user.length; i++) {
  // Море
  if (user[i] == '') {
    fieldRight.innerHTML += `<div class="more"></div>`;
  } 

  // Корабль
  if (user[i] == 'x') {
    fieldRight.innerHTML += `<div class="korabl"></div>`;
  }
}

// Ход противника
function attackVrag(i) {
  setTimeout(() => {
    let shot = null;

    // Кол-во попаданий
    let popadanie = 1;

    // Если не указано куда стрелять, то случайный выстрел
    if (!i) {
      shot = rand(); 
    } else {
      shot = i
      allShotVrag.push(i);
    }

    // Если попал
    if (user[shot] == 'x') {
      allCellUser[shot].setAttribute('class', 'vzriv')

      let indexes = null;
      // Получаем корабль в который попали, 
      // все его индексы - indexes
      for (let i=0; i<korabliUser.length; i++) {
        if (korabliUser[i].includes(shot)) {
          indexes = korabliUser[i]
        }
      }

      // Проверяем уничтожен ли корабль для однопалубных
      if (popadanie == indexes.length) {
        qKorableyUser += 1;
        animatYnichtozen(indexes, allCellUser)
        attackVrag();
      }

      // Достать следующий индекс в который не попали
      // и выстрелить туда, до тех пор пока корабль не 
      // будет уничтожен
      for (let i=0; i<indexes.length; i++) {
        let index = indexes[i];

        if (!allShotVrag.includes(index)) {
          setTimeout(() => {
            allShotVrag.push(index);
            allCellUser[index].setAttribute('class', 'vzriv')
            popadanie += 1;

            // Если корабль уничтожен
            if (popadanie == indexes.length) {
              qKorableyUser += 1;
              animatYnichtozen(indexes, allCellUser)
              attackVrag();
            }
          }, (i > 0 ? 800 * i : 1600))
        } 
      }
    }

    // Промох
    if (user[shot] == '') {
      allCellUser[shot].setAttribute('class', 'mimo')
        
      // Передаем ход user
      activeFieldUser = true

      // Сообщаем что ходит противник
      document.querySelector('.info').innerHTML = 'ходит: user'
    }

  }, 800)
}

// Случайное уникальное целое число от 0 до 100
function rand() {
  let index = Math.floor(Math.random() * 100);
  
  if (allShotVrag.includes(index)) {
    return rand()
  } else {
    allShotVrag.push(index);
    return index;
  }
}

// Анимация уничтожения корабля
function animatYnichtozen(indexes, cell) {

  // Мигание
  for (let i=0; i<indexes.length; i++) {
    let index = indexes[i];
    cell[index].setAttribute('class', 'miganie')  
  }

  // Убрать мигание
  setTimeout(() => {
    for (let i=0; i<indexes.length; i++) {
      let index = indexes[i];
      cell[index].setAttribute('class', 'vzriv')  
    } 
  }, 3000)

  checkPobeda()
}

// Проверяем кто победил
function checkPobeda() {
  let fieldDisabled = false

  if (qKorableyUser == 15) {
    document.querySelector('.title').innerHTML = 'Морской бой <b style="color: red">- победил vrag!</b>';
    fieldDisabled = true
  }

  if (qKorableyVrag == 15) {
    document.querySelector('.title').innerHTML = 'Морской бой <b style="color: green">- победил user!</b>';
    fieldDisabled = true
  }

  if (fieldDisabled) {
    for (let i=0; i<allCellVrag.length; i++) {
      allCellVrag[i].onclick = () => false;
    }
  }
}
