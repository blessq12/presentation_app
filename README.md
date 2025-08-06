# 🎮 Система презентаций с WebSocket

Интерактивная система для управления презентациями через WebSocket с двумя типами клиентов:

- **📊 Презентация** - Vue.js приложение с GSAP анимациями для отображения слайдов
- **🎮 Контроллер** - HTML интерфейс для управления презентацией

## 🏗️ Архитектура

### Основные сущности и потоки

```mermaid
graph TB
    subgraph "🌐 Внешний мир"
        User[👤 Пользователь]
        Internet[🌐 Интернет<br/>109.197.125.39]
    end

    subgraph "🔧 Сетевая инфраструктура"
        NAT[NAT / Роутер<br/>Проброс портов]
    end

    subgraph "🖥️ Серверная часть"
        WS[WebSocket сервер<br/>localhost:8090]
        HTTP[HTTP сервер<br/>localhost:8080]
        Clients[Хранилище клиентов<br/>presentation: Set<br/>controller: Set]
    end

    subgraph "📱 Клиентские приложения"
        Presentation[📊 Презентация<br/>Vue.js + GSAP<br/>presentation.html]
        Controller[🎮 Контроллер<br/>HTML + WebSocket<br/>controller-external.html]
    end

    subgraph "🎨 Компоненты презентации"
        Slides[Слайды<br/>IntroSlide<br/>ProblemsSlide<br/>MVPSlide<br/>MetricsSlide<br/>NextStepsSlide<br/>ConclusionSlide]
        State[Состояние<br/>activeSection<br/>isTransitioning]
        Animations[GSAP анимации<br/>Переходы между слайдами]
    end

    User --> Internet
    Internet --> NAT
    NAT --> WS
    NAT --> HTTP
    HTTP --> Presentation
    HTTP --> Controller
    Controller -.->|Команды управления| WS
    WS -.->|События слайдов| Presentation
    WS --> Clients
    Presentation --> Slides
    Slides --> State
    State --> Animations

    style WS fill:#e1f5fe
    style HTTP fill:#f3e5f5
    style Presentation fill:#e8f5e8
    style Controller fill:#fff3e0
    style Clients fill:#fff8e1
    style Slides fill:#f1f8e9
    style State fill:#e0f2f1
    style Animations fill:#fce4ec
```

### Поток данных

```mermaid
sequenceDiagram
    participant U as 👤 Пользователь
    participant C as 🎮 Контроллер
    participant S as 🖥️ WebSocket сервер
    participant P as 📊 Презентация
    participant A as 🎨 Анимации

    Note over U,A: 🔄 Подключение клиентов
    C->>S: WebSocket подключение
    S->>C: { type: "welcome" }
    C->>S: { type: "register_client", clientType: "controller" }
    S->>C: { type: "client_registered" }

    P->>S: WebSocket подключение
    S->>P: { type: "welcome" }
    P->>S: { type: "register_client", clientType: "presentation" }
    S->>P: { type: "client_registered" }

    Note over U,A: 🎯 Управление слайдами
    U->>C: Нажимает "Вперед ➡️"
    C->>S: { type: "next_slide" }
    S->>P: { type: "next_slide" }
    P->>A: Запуск анимации перехода
    A->>P: Обновление activeSection
    P->>P: Рендер нового слайда

    Note over U,A: 📊 Статистика
    S->>C: { type: "status_update", presentationClients: 1, controllerClients: 1 }
```

### WebSocket сообщения

```mermaid
graph LR
    subgraph "📤 Команды от контроллера"
        C1[next_slide]
        C2[prev_slide]
        C3[go_to_slide]
        C4[register_client]
        C5[get_status]
    end

    subgraph "📥 Ответы сервера"
        S1[client_registered]
        S2[welcome]
        S3[status_update]
        S4[error]
    end

    subgraph "🎯 События для презентации"
        P1[next_slide]
        P2[prev_slide]
        P3[go_to_slide]
    end

    C1 --> P1
    C2 --> P2
    C3 --> P3
    C4 --> S1
    C5 --> S3
```

## 🚀 Быстрый старт

### 1. Запуск WebSocket сервера

```bash
npm run server
```

Сервер запустится на `ws://109.197.125.39:8090`

### 2. Запуск HTTP сервера

```bash
python3 -m http.server 8080
```

Или используй любой HTTP сервер на порту 8080

### 3. Открытие клиентов

- **Презентация:** `http://109.197.125.39:8080/presentation.html`
- **Контроллер:** `http://109.197.125.39:8080/controller-external.html`

## 📋 Доступные команды

### Контроллер

- **⬅️ Назад** - предыдущий слайд
- **Вперед ➡️** - следующий слайд
- **Перейти к слайду** - переход к конкретному слайду (0-5)
- **Копировать ссылку** - копирование URL презентации

### WebSocket команды

```json
{
  "type": "register_client",
  "clientType": "presentation|controller"
}
{
  "type": "next_slide"
}
{
  "type": "prev_slide"
}
{
  "type": "go_to_slide",
  "slideIndex": 0
}
```

## 🎨 Слайды презентации

Система включает 6 интерактивных слайдов:

1. **IntroSlide** - Вступление
2. **ProblemsSlide** - Проблемы и профиты
3. **MVPSlide** - План действий (MVP за 2 недели)
4. **MetricsSlide** - Метрики прогресса
5. **NextStepsSlide** - Следующие шаги
6. **ConclusionSlide** - Заключение

Каждый слайд использует GSAP для плавных анимаций и переходов.

## 🔧 Технический стек

### Backend

- **Node.js** - WebSocket сервер
- **ws** - WebSocket библиотека
- **HTTP сервер** - статические файлы

### Frontend

- **Vue.js 3** - реактивность и компоненты
- **GSAP** - анимации и переходы
- **Tailwind CSS** - стилизация
- **Vite** - сборка

### Сеть

- **WebSocket** - real-time коммуникация
- **NAT** - внешний доступ
- **HTTP** - статические файлы

## 🌐 Внешний доступ

**IP:** `109.197.125.39`

| Порт | Назначение       | URL                          |
| ---- | ---------------- | ---------------------------- |
| 8090 | WebSocket сервер | `ws://109.197.125.39:8090`   |
| 8080 | HTTP презентация | `http://109.197.125.39:8080` |

## 📁 Структура проекта

```
client/
├── src/
│   ├── server.js              # WebSocket сервер
│   ├── App.vue               # Vue.js презентация
│   ├── components/           # Слайды презентации
│   │   ├── IntroSlide.vue
│   │   ├── ProblemsSlide.vue
│   │   ├── MVPSlide.vue
│   │   ├── MetricsSlide.vue
│   │   ├── NextStepsSlide.vue
│   │   └── ConclusionSlide.vue
│   └── controller.html       # Контроллер
├── presentation.html         # Основная презентация
├── controller-external.html  # Внешний контроллер
├── config/                   # Конфигурации портов
└── architecture.md          # Детальная архитектура
```

## 🎯 Использование

1. **Запусти сервер:** `npm run server`
2. **Запусти HTTP:** `python3 -m http.server 8080`
3. **Открой презентацию:** `http://109.197.125.39:8080/presentation.html`
4. **Открой контроллер:** `http://109.197.125.39:8080/controller-external.html`
5. **Управляй презентацией** через контроллер

## 🔧 Альтернативные порты

```bash
# WebSocket серверы
npm run server:8090
npm run server:8091
npm run server:8092

# HTTP серверы
npm run presentation:8081
npm run presentation:8082
```

## 📊 Статистика подключений

Сервер отслеживает:

- Количество подключенных презентаций
- Количество подключенных контроллеров
- Статус каждого клиента

## 🛠️ Разработка

### Добавление нового слайда

1. Создай компонент в `src/components/`
2. Добавь в `sections` в `App.vue`
3. Реализуй GSAP анимации

### Изменение WebSocket логики

1. Отредактируй `src/server.js`
2. Добавь новые типы сообщений
3. Обнови обработчики в клиентах

## 🔒 Безопасность

- WebSocket сервер принимает подключения с любого IP
- Нет аутентификации (для демо)
- Рекомендуется добавить авторизацию для продакшена

## 📝 Логи

Сервер выводит:

- Подключения/отключения клиентов
- Полученные команды
- Статистику подключений
- Ошибки WebSocket

---

**Создано для демонстрации интерактивных презентаций с real-time управлением** 🚀
