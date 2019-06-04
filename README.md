### Використані технології

* [React](https://github.com/facebook/react)
* [Redux](https://github.com/reactjs/redux)
* [Sass](https://github.com/sass/sass)
* [Webpack](https://github.com/webpack/webpack)
* [Babel](https://github.com/babel/babel)
* [Express](https://github.com/expressjs/express)
* [MongoDB](https://github.com/mongodb/mongo)
* [Passport](https://github.com/jaredhanson/passport)

### Опис

Цей веб-додаток використовує базу-даних MongoDB та дає можливість користувачу авторизуватись за допомогою таких сервісів як Google та Twitter.
Переді мною стояла задача створити веб-сервіс схожий на Trello, для менеджменту ІТ-проектів, з можливостей даного сервісу варто відмітити можливість користувачам системи зберігати та редагувати дошки та картки з завданнями, а також змінювати візуально кольорову-гаму.

#### Налаштування

``` в командному рядку виконати наступну команду
npm install
```

Для налаштування зв'язку з базою даних та ввімкнення можливості користуватися авторизацією в сервіси Google та Twitter. Вам потрібно створити файл з іменем `.env` в директорії з наступними змінними:

```
MONGODB_URL = "MONGODB_URL"
MONGODB_NAME = "MONGODB_NAME"
TWITTER_API_KEY = "TWITTER_API_KEY"
TWITTER_API_SECRET = "TWITTER_API_SECRET"
GOOGLE_CLIENT_ID = "GOOGLE_CLIENT_ID"
GOOGLE_CLIENT_SECRET = "GOOGLE_CLIENT_SECRET"
SESSION_SECRET = "SESSION_SECRET"

# Сервіс підіймається за адресою 127.0.0.1 (або localhost) з портом 1337.
ROOT_URL=http://127.0.0.1:1337
```

```в командному рядку виконати наступні команди
npm run build
npm run serve
```