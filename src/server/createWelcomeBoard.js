import shortid from "shortid";

// Give every card in a list an _id and the color white UNLESS those properties already exist
const appendAttributes = list =>
  list.map(card => ({
    color: "white",
    _id: shortid.generate(),
    ...card
  }));

// Generate the initial showcase board that every user and guest gets when they first log in
const createWelcomeBoard = userId => {
  const list1 = [{
      text: "### Освоїти технології в React Native",
      color: '#f66',
      date: new Date('2019-07-06')
    },
    {
      text: `### Створювати групи для спільного менеджменту`,
      color: "#f66",
      date: new Date('2019-06-30')
    },
    {
      text: `### Додати можливість редагування для груп людей за спільною дошкою`,
      color: "#f66",
      date: new Date('2019-07-05')
    }
  ];

  const list2 = [{
    text: `### Поліпшити навички для верстки
[x] Освоїти всі можливі методи для створення адаптивного дизайну.
[ ] Вибрати найкращі з них (ті які підтримуються більшістю браузерами)
[ ] Ознайомитися з бібліотеками, які допомагають в створені складних анімацій`,
    color: "#fa4",
    date: new Date('2019-06-04')
  }];

  const list3 = [{
      text: `### Тестування програмного рішення`,
      rate: 4,
      color: "#6df",
      date: new Date('2019-05-30')
    },
    {
      text: `### Реалізація ПЗ
  [x] Створити **БД**.
  [x] Спроектувати **інтерфейс** системи.
  [x] Розробити **бекенд** для прив'язки інтерфейсної частини з БД.
  `,
      rate: 4,
      color: "#6df",
      date: new Date('2019-05-30')
    }, {
      text: `### Вхід в систему за допомогою OAuth 2.0.
  [x] Підключити бібліотеку **passport** та **OAuth**.
  [x] Створити секретний користувацький ключ з **Google API**.
  [x] Створити секретний користувацький ключ з **Twitter API**.
  [x] Реалізувати авторизацію та збереження **токена** користувача в *БД*.
  `,
      rate: 4,
      color: "#6df",
      date: new Date('2019-05-07')
    },    
    {
      text: `### Проектування веб-сервісу`,
      rate: 3,
      color: "#6df",
      date: new Date('2019-05-06')
    },
    {
      text: `### Підтримка мобільних пристроїв...`,
      rate: 4,
      color: "#6df",
      date: new Date('2019-04-29')
    }
  ];


  const list4 = [{
      text: `### Стилізації тексту подібна до стилізації в GitHub.
* Маркери
* Пункт1
* Шрифти **жирний** і *курсив*
* Посилання на [Trello](https://trello.com/)
* \`\`\`
    functionZ() => {
        // Блок для коду
    }
\`\`\`
    `,
      color: "#ff6"
    },
    {
      text: `### Для редагування картки
Вам необхідно спершу натиснути на картку, далі можна редагувати текст. Для переходу на наступний рядок використовуйте Shift + Enter.`
    },
    {
      text: `### Перетягувати картки, або списки
Ви можете змінювати позицію карток, або списків просто перетягуючи їх використовуючи курсор, або тач панель на смартфоні.`
    },
    {
      text: `### Створити картку, чи список
Для створення нової картки натисніть на кнопку +, яка знаходиться внизу списка. Ви можете також додати новий список, якщо натисните на кнопку "Додати новий список...", що знаходиться вгорі зправа.`
    },
    {
      text: `### Додати список з вибором
Для створення картки з декількома підзавданнями, ви можете скористатись створенням списка з вибором.
      [x] Прямо так
      [ ] Натисни сюди`
    },
    {
      text: `### Змінюйте дошку
Ви також можеше змінювати заголовок дошки, просто натиснувши на назву. Окрім цього вам доступна можливість змінити кольорову гаму дошки, а також окремо взятих карток.`
    }
  ];

  // Append a warning message to the top of list3 for guest users only
  if (!userId) {
    list4.unshift({
      text: `### Ввійдіть в систему, аби зберегти ваші зміни
*Зараз ви знаходитеся в режимі **Гостя***.
Всі ваші зміни не будуть збережені після того, як ви покините цей сайт. Поверніться на початкову сторінку, аби авторизуватись в системі.`,
      color: "#6df"
    });
  }

  return {
    _id: shortid.generate(),
    title: "Дошка для прикладу",
    color: "green",
    lists: [{
        _id: shortid.generate(),
        title: "Виконати (To Do)",
        cards: appendAttributes(list1)
      },
      {
        _id: shortid.generate(),
        title: "Виконується (Doing)",
        cards: appendAttributes(list2)
      },
      {
        _id: shortid.generate(),
        title: "Завершено (Done)",
        cards: appendAttributes(list3)
      },
      {
        _id: shortid.generate(),
        title: "Як користуватись? (FAQ)",
        cards: appendAttributes(list4)
      }
    ],
    users: userId ? [userId] : []
  };
};

export default createWelcomeBoard;