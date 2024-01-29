
class Student {
  _name = ''
  _surname = ''
  _otchestvo = ''

  _facultet = ''
  _date = ''
  _graduate = ''

  constructor(surname, name, otchestvo, facultet, date, graduate) {
    this.name = name;
    this.surname = surname;
    this.otchestvo = otchestvo;
    this.facultet = facultet;
    this.yearOld = 2023 - date.split('.')[2];
    this.dateInitial = date;
    this.date = date + ` (${this.yearOld} лет)`;
    let studyTime = parseInt(graduate) + 4;
    let courseNumber = 2023 - parseInt(graduate);
    if (studyTime > 2023) {
      this.graduate = graduate + `-${studyTime} (${courseNumber} курс)`;
    } else {
      this.graduate = graduate + `-${studyTime} (закончил)`;
    }

    this.addToServer();
  }

  // добавляем студента на сервер
  async addToServer() {
    const response = await fetch('http://localhost:3000/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.name,
        surname: this.surname,
        lastname: this.otchestvo,
        birthday: this.date,
        studyStart: this.graduate,
        faculty: this.facultet,
      })
    });
  }

  set name(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set surname(surname) {
    this._surname = surname;
  }

  get surname() {
    return this._surname;
  }

  set otchestvo(otchestvo) {
    this._otchestvo = otchestvo;
  }

  get otchestvo() {
    return this._otchestvo;
  }

  set facultet(facultet) {
    this._facultet = facultet;
  }

  get facultet() {
    return this._facultet;
  }

  set date(date) {
    this._date = date;
  }

  get date() {
    return this._date;
  }

  set graduate(graduate) {
    this._graduate = graduate;
  }

  get graduate() {
    return this._graduate;
  }
}

// new Student('Пупышев', 'Данила', 'Михайлович', 'факультет нанотехнологий', '07.10.2003', '2020');
// new Student('Ткачева', 'Карина', 'Александровна', 'факультет исскуства', '13.06.2003', '2019');
// new Student('Петров', 'Кирилл', 'Андреевич', 'факультет образования', '05.12.2004', '2021');

// создаем карточку студента
function createStudentsElement(todoItem) {
  const studentName = todoItem.name
  const studentSurname = todoItem.surname;
  const studentOtchestvo = todoItem.lastname;
  const studentFacultet = todoItem.faculty;
  const studentDate = todoItem.birthday;
  const studentStudyStart = todoItem.studyStart;

  const studentCard = document.createElement('tr');
  const tdFio = document.createElement('td');
  const tdFac = document.createElement('td');
  const tdDate = document.createElement('td');
  const tdStudyYears = document.createElement('td');

  // кнопочка удаления
  const elementDelete = document.createElement('td');
  const buttonDelete = document.createElement('button');
  buttonDelete.classList.add('btn', 'btn-delete');
  buttonDelete.textContent = 'Удалить';
  // обработчик на кнопку
  buttonDelete.addEventListener('click', function(e) {
    e.preventDefault();

    if(confirm('Вы уверены?')) {
      studentCard.remove();
      fetch(`http://localhost:3000/api/students/${todoItem.id}`, {
					method: 'DELETE',
			});
    }
  })
  elementDelete.append(buttonDelete);

  tdFio.textContent =
    studentSurname + ' ' +
    studentName + ' ' +
    studentOtchestvo;
  tdFac.textContent = studentFacultet;
  tdDate.textContent = studentDate;
  tdStudyYears.textContent = studentStudyStart;

  studentCard.append(tdFio, tdFac, tdDate, tdStudyYears, elementDelete);

  document.getElementById('tbody').append(studentCard);
}


// работа с сервером (получение данных)
async function getTodoList() {
  const response = await fetch('http://localhost:3000/api/students');
  const todoItemList = await response.json();

  console.log(todoItemList);

  todoItemList.forEach(todoItem => {
    createStudentsElement(todoItem);
  })
}


// Этап 4. Создайте функцию отрисовки всех студентов. Аргументом функции будет массив студентов.Функция должна использовать ранее созданную функцию создания одной записи для студента.Цикл поможет вам создать список студентов.Каждый раз при изменении списка студента вы будете вызывать эту функцию для отрисовки таблицы.
function renderStudentsTable() {

  getTodoList();
  // обработчики формы
  form = document.getElementById('form-create');
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    inputSurname = document.getElementById('exampleInputFamilia');
    inputName = document.getElementById('exampleInputName');
    inputOtchestvo = document.getElementById('exampleInputOtchestvo');
    inputDate = document.getElementById('exampleInputDate');
    inputYear = document.getElementById('exampleInputYear');
    inputFacultet = document.getElementById('exampleInputFacultet');

    if (!inputSurname.value || !inputName.value || !inputOtchestvo.value
      || !inputDate.value || !inputYear.value || !inputFacultet.value) {
      return alert('Введите всю информацию о студенте.');
    }

    inputName.value = inputName.value.split('.').join(' ').trim();
    inputSurname.value = inputSurname.value.split('.').join(' ').trim();
    inputOtchestvo.value = inputOtchestvo.value.split('.').join(' ').trim();
    inputDate.value = inputDate.value.split('.').join(' ').trim();
    inputYear.value = inputYear.value.split('.').join(' ').trim();
    inputFacultet.value = inputFacultet.value.split('.').join(' ').trim();


    if (inputSurname.value == '' || inputName.value == ''
      || inputOtchestvo.value == '' || inputDate.value == ''
      || inputYear.value == '' || inputFacultet.value == '') {
      return alert('Заполните пустые строки.');
    }

    // проверяем дату
    date = inputDate.value;
    dateArr = date.split('-');
    if (dateArr[0] < 1900 || (dateArr[0] == 2023 && parseInt(dateArr[1]) > 8)
      || dateArr[0] > 2023) {
      return alert('Введите правильную дату рождения.');
    }
    console.log(dateArr);
    dateArr.reverse();
    resultDateArr = dateArr.join('.');
    console.log(resultDateArr);

    yearGrad = inputYear.value;
    if (yearGrad < 2000 || yearGrad > 2023) {
      return alert('Введите правильную дату поступления.');
    }

    if (yearGrad <= dateArr.reverse()[0]) {
      return alert('Год поступления не может быть раньше года рождения');
    }

    // преобразуем ФИО
    str = inputName.value.toLowerCase();
    splitted = str.split('');
    first = str[0].toUpperCase();
    rest = [...splitted];
    rest.splice(0, 1);
    result = [first, ...rest].join('');
    inputName.value = result;

    str = inputSurname.value.toLowerCase();
    splitted = str.split('');
    first = str[0].toUpperCase();
    rest = [...splitted];
    rest.splice(0, 1);
    result = [first, ...rest].join('');
    inputSurname.value = result;

    str = inputOtchestvo.value.toLowerCase();
    splitted = str.split('');
    first = str[0].toUpperCase();
    rest = [...splitted];
    rest.splice(0, 1);
    result = [first, ...rest].join('');
    inputOtchestvo.value = result;

    str = inputFacultet.value.toLowerCase();
    inputFacultet.value = str;

    new Student(inputSurname.value, inputName.value, inputOtchestvo.value,
      inputFacultet.value, resultDateArr, inputYear.value);

    inputName.value = '';
    inputSurname.value = '';
    inputOtchestvo.value = '';
    inputDate.value = '';
    inputYear.value = '';
    inputFacultet.value = '';
  })


  // добавляем сортировку на заголовки
  fioFilter = document.getElementById('fio');
  fioFilter.addEventListener('click', () => {
    sortArrByFio();
    // getTodoList()
  })
  facultetFilter = document.getElementById('facultet');
  facultetFilter.addEventListener('click', () => {
    sortArrByFacultet();
    // getTodoList()
  })
  vosrastFilter = document.getElementById('vosrast');
  vosrastFilter.addEventListener('click', () => {
    sortArrByVosrast();
    // getTodoList()
  })
  studyYearsFilter = document.getElementById('studyYears');
  studyYearsFilter.addEventListener('click', () => {
    sortArrByStudyYears();
    // getTodoList()
  })


  // фильтры по содержанию
  btnFilter = document.getElementById('btnFilter');
  btnFilter.addEventListener('click', async function (e) {
    e.preventDefault();

    fioFinder = document.getElementById('exampleInputFioFilter');
    facFinder = document.getElementById('exampleInputFacultetFilter');
    dateFinder = document.getElementById('exampleInputDateFilter');
    yearFinder = document.getElementById('exampleInputYearFilter');

    const response = await fetch('http://localhost:3000/api/students');
    const todoItemList = await response.json();

    if (fioFinder.value) {
      let arr = [];
      str = fioFinder.value.toLowerCase();
      splitted = str.split('');
      first = str[0].toUpperCase();
      rest = [...splitted];
      rest.splice(0, 1);
      result = [first, ...rest].join('');
      fioFinder.value = result;

      for (element of todoItemList) {
        let tdFio = element.surname + ' ' + element.name + ' ' + element.lastname;
        if (tdFio.includes(fioFinder.value)) {
          arr.push(element);
        }
      }
      document.getElementById('tbody').innerHTML = '';
      for (obj of arr) {
        createStudentsElement(obj);
      }
    }

    if (facFinder.value) {
      let arr = [];
      str = facFinder.value.toLowerCase();
      facFinder.value = str;

      for (element of todoItemList) {
        let tdFac = element.faculty;
        if (tdFac.includes(facFinder.value)) {
          arr.push(element);
        }
      }
      document.getElementById('tbody').innerHTML = '';
      for (obj of arr) {
        createStudentsElement(obj);
      }
    }

    if (dateFinder.value) {
      let arr = [];
      for (element of todoItemList) {
        if (element.birthday.includes(dateFinder.value)) {
          arr.push(element);
        }
      }
      document.getElementById('tbody').innerHTML = '';
      for (obj of arr) {
        createStudentsElement(obj);
      }
    }

    if (yearFinder.value) {
      let arr = [];
      for (element of todoItemList) {
        if (element.studyStart.includes(yearFinder.value)) {
          arr.push(element);
        }
      }
      document.getElementById('tbody').innerHTML = '';
      for (obj of arr) {
        createStudentsElement(obj);
      }
    }

    if (!fioFinder.value && !facFinder.value && !dateFinder.value
      && !yearFinder.value) {
      document.getElementById('tbody').innerHTML = '';
      for (obj of todoItemList) {
        createStudentsElement(obj);
      }
    }

  })

  btnClear = document.getElementById('btnClear');
  btnClear.addEventListener('click', function (e) {
    e.preventDefault();

    fioFinder = document.getElementById('exampleInputFioFilter');
    facFinder = document.getElementById('exampleInputFacultetFilter');
    dateFinder = document.getElementById('exampleInputDateFilter');
    yearFinder = document.getElementById('exampleInputYearFilter');

    fioFinder.value = '';
    facFinder.value = '';
    dateFinder.value = '';
    yearFinder.value = '';
  })
}

// запуск
renderStudentsTable();



// Этап 5. Функции сортировки массива

async function sortArrByFio() {
  const response = await fetch('http://localhost:3000/api/students');
  const todoItemList = await response.json();

  todoItemList.sort((a, b) => a.surname > b.surname ? 1 : -1);

  document.getElementById('tbody').innerHTML = '';
  todoItemList.forEach(todoItem => {
    createStudentsElement(todoItem);
  })
}

async function sortArrByFacultet() {
  const response = await fetch('http://localhost:3000/api/students');
  const todoItemList = await response.json();

  todoItemList.sort((a, b) => a.faculty > b.faculty ? 1 : -1);

  document.getElementById('tbody').innerHTML = '';
  todoItemList.forEach(todoItem => {
    createStudentsElement(todoItem);
  })
}
// правильно отсортировать
async function sortArrByVosrast() {
  const response = await fetch('http://localhost:3000/api/students');
  const todoItemList = await response.json();

  todoItemList.sort((a, b) => {
    let birthdayA = a.birthday.split(' ')[0];
    let birthdayB = b.birthday.split(' ')[0];

    let aDate = birthdayA.split('.').reverse();
    let bDate = birthdayB.split('.').reverse();
    if (aDate[2] < bDate[2]) {
      return 1;
    } else if (aDate[2] > bDate[2]) {
      return -1;
    } else if (aDate[2] == bDate[2]) {
      if (aDate[1] < bDate[1]) {
        return 1;
      } else if (aDate[1] > bDate[1]) {
        return -1;
      } else if (aDate[1] == bDate[1]) {
        if (aDate[0] < bDate[0]) {
          return 1;
        } else if (aDate[0] > bDate[0]) {
          return -1;
        }
      }
    }
  })

  document.getElementById('tbody').innerHTML = '';
  todoItemList.forEach(todoItem => {
    createStudentsElement(todoItem);
  })
}
// правильно отсортировать
async function sortArrByStudyYears() {
  const response = await fetch('http://localhost:3000/api/students');
  const todoItemList = await response.json();

  todoItemList.sort((a, b) => a.studyStart > b.studyStart ? 1 : -1);

  document.getElementById('tbody').innerHTML = '';
  todoItemList.forEach(todoItem => {
    createStudentsElement(todoItem);
  })
}

