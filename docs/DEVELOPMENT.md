# 👨‍💻 Руководство разработчика

## Настройка среды разработки

### Требования

- **Node.js** 18.0.0+
- **npm** или **yarn**
- **Git**
- **VS Code** (рекомендуется)
- **Vue DevTools** (расширение браузера)

### Установка зависимостей

```bash
# Клонирование репозитория
git clone <repository-url>
cd present

# Установка зависимостей
npm install

# Установка dev-зависимостей
npm install --save-dev @vitejs/plugin-vue
```

## Структура проекта

```
present/
├── src/
│   ├── components/          # Vue компоненты слайдов
│   │   ├── IntroSlide.vue
│   │   ├── ProblemsSlide.vue
│   │   ├── MVPSlide.vue
│   │   ├── MetricsSlide.vue
│   │   ├── NextStepsSlide.vue
│   │   └── ConclusionSlide.vue
│   ├── assets/             # Статические ресурсы
│   ├── App.vue             # Главный компонент
│   ├── main.js             # Точка входа Vue
│   ├── server.js           # WebSocket сервер
│   ├── controller.html     # Контроллер
│   └── style.css           # Глобальные стили
├── public/                 # Публичные файлы
├── docs/                   # Документация
├── config/                 # Конфигурации
├── presentation.html       # Основная презентация
├── controller-external.html # Внешний контроллер
├── package.json           # Зависимости и скрипты
├── vite.config.js         # Конфигурация Vite
└── README.md              # Основная документация
```

## Разработка

### Запуск в режиме разработки

```bash
# Запуск WebSocket сервера
npm run server

# В новом терминале - запуск Vite dev сервера
npm run dev

# В третьем терминале - запуск HTTP сервера (опционально)
npm run presentation
```

### Горячая перезагрузка

- **Vue компоненты** - автоматическая перезагрузка при изменении
- **WebSocket сервер** - требует перезапуска вручную
- **HTML файлы** - обновляются автоматически

### Отладка

#### Vue DevTools

1. Установите расширение Vue DevTools в браузере
2. Откройте DevTools (F12)
3. Перейдите на вкладку Vue
4. Исследуйте состояние компонентов

#### WebSocket отладка

```javascript
// В браузере консоли
const ws = new WebSocket('ws://localhost:8090');

ws.onopen = () => console.log('Подключено');
ws.onmessage = (event) => console.log('Получено:', event.data);
ws.onerror = (error) => console.error('Ошибка:', error);
ws.onclose = () => console.log('Отключено');
```

#### Логирование сервера

```javascript
// В src/server.js добавьте:
console.log('WebSocket сервер запущен на порту', PORT);
console.log('Подключенные клиенты:', clients);
```

## Создание нового слайда

### 1. Создание компонента

```vue
<!-- src/components/NewSlide.vue -->
<template>
  <div class="slide new-slide">
    <div class="slide-content">
      <h1 class="title">Новый слайд</h1>
      <p class="description">Описание слайда</p>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap';

export default {
  name: 'NewSlide',
  mounted() {
    this.animateIn();
  },
  methods: {
    animateIn() {
      gsap.from('.slide-content', {
        duration: 1,
        opacity: 0,
        y: 50,
        ease: 'power2.out'
      });
    },
    animateOut() {
      return gsap.to('.slide-content', {
        duration: 0.5,
        opacity: 0,
        y: -50,
        ease: 'power2.in'
      });
    }
  }
}
</script>

<style scoped>
.new-slide {
  @apply flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600;
}

.slide-content {
  @apply text-center text-white max-w-4xl mx-auto px-8;
}

.title {
  @apply text-6xl font-bold mb-8;
}

.description {
  @apply text-xl leading-relaxed;
}
</style>
```

### 2. Регистрация в App.vue

```vue
<!-- В src/App.vue -->
<script>
import NewSlide from './components/NewSlide.vue'

export default {
  components: {
    // ... другие компоненты
    NewSlide
  },
  data() {
    return {
      sections: [
        // ... существующие слайды
        { component: 'NewSlide', name: 'Новый слайд' }
      ]
    }
  }
}
</script>
```

### 3. Добавление в контроллер

```html
<!-- В controller-external.html -->
<button onclick="goToSlide(6)">Новый слайд</button>
```

## Расширение WebSocket API

### 1. Добавление нового типа сообщения

```javascript
// В src/server.js
function handleMessage(ws, message) {
  try {
    const data = JSON.parse(message);
    
    switch(data.type) {
      // ... существующие обработчики
      case 'new_command':
        handleNewCommand(ws, data);
        break;
      default:
        sendError(ws, 'INVALID_MESSAGE_TYPE', 'Неизвестный тип сообщения');
    }
  } catch (error) {
    sendError(ws, 'INVALID_JSON', 'Неверный формат JSON');
  }
}

function handleNewCommand(ws, data) {
  // Логика обработки новой команды
  console.log('Новая команда:', data);
  
  // Отправка всем презентациям
  broadcastToType('presentation', {
    type: 'new_event',
    data: data.payload
  });
}
```

### 2. Обновление клиентов

```javascript
// В презентации (App.vue)
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  switch(data.type) {
    // ... существующие обработчики
    case 'new_event':
      this.handleNewEvent(data.data);
      break;
  }
};

methods: {
  handleNewEvent(data) {
    // Обработка нового события
    console.log('Новое событие:', data);
  }
}
```

## Стилизация

### Tailwind CSS

Проект использует Tailwind CSS для стилизации:

```vue
<template>
  <div class="bg-gradient-to-r from-blue-500 to-purple-600 p-8 rounded-lg shadow-xl">
    <h1 class="text-4xl font-bold text-white mb-4">Заголовок</h1>
    <p class="text-lg text-gray-100">Описание</p>
  </div>
</template>
```

### GSAP анимации

```javascript
import { gsap } from 'gsap';

// Простая анимация
gsap.to('.element', {
  duration: 1,
  x: 100,
  opacity: 0,
  ease: 'power2.out'
});

// Timeline анимация
const tl = gsap.timeline();
tl.from('.title', { duration: 0.8, y: -50, opacity: 0 })
  .from('.description', { duration: 0.6, y: 30, opacity: 0 }, '-=0.4')
  .from('.button', { duration: 0.4, scale: 0 }, '-=0.2');
```

## Тестирование

### Unit тесты

```bash
# Установка Jest
npm install --save-dev jest @vue/test-utils

# Создание теста
```

```javascript
// tests/components/NewSlide.test.js
import { mount } from '@vue/test-utils';
import NewSlide from '@/components/NewSlide.vue';

describe('NewSlide', () => {
  it('рендерит заголовок', () => {
    const wrapper = mount(NewSlide);
    expect(wrapper.find('.title').text()).toBe('Новый слайд');
  });
  
  it('запускает анимацию при монтировании', () => {
    const wrapper = mount(NewSlide);
    // Проверка анимации
  });
});
```

### E2E тесты

```bash
# Установка Playwright
npm install --save-dev @playwright/test

# Создание теста
```

```javascript
// tests/e2e/presentation.spec.js
import { test, expect } from '@playwright/test';

test('пользователь может управлять презентацией', async ({ page }) => {
  await page.goto('http://localhost:8080/presentation.html');
  
  // Проверка загрузки
  await expect(page.locator('.slide')).toBeVisible();
  
  // Проверка WebSocket подключения
  await page.waitForFunction(() => {
    return window.ws && window.ws.readyState === WebSocket.OPEN;
  });
});
```

## Оптимизация

### Производительность

1. **Ленивая загрузка компонентов**
```javascript
const NewSlide = () => import('./components/NewSlide.vue');
```

2. **Оптимизация изображений**
```html
<img src="image.webp" loading="lazy" alt="Описание">
```

3. **Кэширование WebSocket**
```javascript
// Переподключение при потере соединения
function reconnect() {
  setTimeout(() => {
    initWebSocket();
  }, 1000);
}
```

### Бандл анализ

```bash
# Анализ размера бандла
npm run build
npx vite-bundle-analyzer dist
```

## Git workflow

### Создание feature ветки

```bash
# Создание новой ветки
git checkout -b feature/new-slide

# Разработка
# ... изменения ...

# Коммит
git add .
git commit -m "feat: добавить новый слайд"

# Пуш
git push origin feature/new-slide

# Создание Pull Request
```

### Commit conventions

```
feat: новая функция
fix: исправление бага
docs: документация
style: форматирование
refactor: рефакторинг
test: тесты
chore: обновления зависимостей
```

## Публикация

### Сборка для продакшена

```bash
# Сборка
npm run build

# Предварительный просмотр
npm run preview

# Проверка размера
du -sh dist/
```

### Деплой

```bash
# Копирование файлов на сервер
scp -r dist/* user@server:/var/www/presentation/

# Перезапуск сервисов
ssh user@server 'pm2 restart presentation-server'
```

## Полезные команды

```bash
# Очистка кэша
npm run clean

# Проверка зависимостей
npm audit

# Обновление зависимостей
npm update

# Линтинг
npm run lint

# Форматирование
npm run format
```

## Ресурсы

- [Vue.js документация](https://vuejs.org/)
- [GSAP документация](https://greensock.com/docs/)
- [Tailwind CSS документация](https://tailwindcss.com/docs)
- [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [Vite документация](https://vitejs.dev/)