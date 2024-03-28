let vrag = [
  'x', 'x', 'x', 'x', '' , '',  '',  '', '',  '',
  '',  '',  '',  '',  '' , '',  '',  '', '',  '',
  '',  '',  '',  '',  '' , '',  'x', '', '',  '',
  '',  '',  '',  '',  '' , '',  'x', '', '',  '',
  '',  '',  '',  '',  '' , '',  '',  '', '',  '',
  '',  '',  '',  '',  '' , '',  '',  '', '',  '',
  '',  '',  '',  '',  '' , '',  '',  '', '',  '',
  '',  '',  '',  '',  '' , '',  '',  '', '',  '',
  '',  '',  '',  '',  '' , '',  '',  '', '',  '',
  '',  '',  '',  '',  '' , '',  '',  '', '',  '',
]

let user = [
  '',  '',  '',  '',  '' , '',  '', '',  '',  '',
  '',  '',  '',  'x', '' , '',  '', '',  '',  '',
  '',  '',  '',  'x', '' , '',  '', '',  '',  '',
  '',  '',  '',  'x', '' , '',  '', '',  '',  '',
  'x', '',  '',  'x', '' , '',  '', '',  '',  '',
  'x', '',  '',  '',  '' , '',  '', '',  '',  '',
  'x', '',  '',  '',  '' , '',  '', '',  '',  '',
  'x', '',  '',  '',  '' , '',  '', '',  '',  '',
  'x', '',  '',  '',  '' , '',  '', '',  '',  '',
  '',  '',  '',  '',  '' , '',  '', '',  '',  '',
]

// Массив кораблей user
let korabliUser = [[13,23,33,43], [40,50,60,70,80]]
// Массив кораблей vrag
let korabliVrag = [[0,1,2,3], [26,36]]
// Кол-во пототленных кораблей user
let qKorableyUser = 0;
// Кол-во пототленных кораблей vrag
let qKorableyVrag = 0;
// Отрисовываем кнопки
let fieldLeft = document.querySelector('.field-left');
// Вкл/Выкл поле user
let activeFieldUser = true
// Массив ходов user
let allShotUser = [];
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

// Отрисовываем кату
let fieldRight = document.querySelector('.field-right');

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

// Все ячейки поля user
let allCellUser = fieldRight.getElementsByTagName('div')

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

// Массив ходов противника
let allShotVrag = []

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

// Все ячейки поля varg
let allCellVrag = fieldLeft.getElementsByTagName('div')

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

  if (qKorableyUser == 2) {
    document.querySelector('.title').innerHTML = 'Морской бой <b style="color: red">- победил vrag!</b>';
    fieldDisabled = true
  }

  if (qKorableyVrag == 2) {
    document.querySelector('.title').innerHTML = 'Морской бой <b style="color: green">- победил user!</b>';
    fieldDisabled = true
  }

  if (fieldDisabled) {
    for (let i=0; i<allCellVrag.length; i++) {
      allCellVrag[i].onclick = () => false;
    }
  }
}
