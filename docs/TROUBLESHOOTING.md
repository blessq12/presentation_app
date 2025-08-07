# 🔧 Устранение неполадок

## Частые проблемы и решения

### WebSocket подключение

#### Проблема: WebSocket не подключается

**Симптомы:**
- В консоли браузера: `WebSocket connection to 'ws://localhost:8090' failed`
- Презентация не реагирует на команды контроллера

**Решения:**

1. **Проверьте, запущен ли сервер:**
```bash
# Проверка процессов
ps aux | grep node

# Проверка порта
netstat -tulpn | grep :8090
```

2. **Перезапустите WebSocket сервер:**
```bash
# Остановка
pkill -f "node src/server.js"

# Запуск
npm run server
```

3. **Проверьте файрвол:**
```bash
# Ubuntu/Debian
sudo ufw status
sudo ufw allow 8090

# CentOS/RHEL
sudo firewall-cmd --list-all
sudo firewall-cmd --permanent --add-port=8090/tcp
sudo firewall-cmd --reload
```

#### Проблема: WebSocket отключается

**Симптомы:**
- Периодические отключения
- Сообщения "WebSocket connection closed"

**Решения:**

1. **Добавьте автоматическое переподключение:**
```javascript
function initWebSocket() {
  const ws = new WebSocket('ws://localhost:8090');
  
  ws.onclose = () => {
    console.log('WebSocket отключен, переподключение через 1 секунду...');
    setTimeout(initWebSocket, 1000);
  };
  
  return ws;
}
```

2. **Проверьте таймауты:**
```javascript
// В server.js
const wss = new WebSocket.Server({ 
  port: PORT,
  keepalive: true,
  keepaliveInterval: 30000
});
```

### HTTP сервер

#### Проблема: Презентация не загружается

**Симптомы:**
- `ERR_CONNECTION_REFUSED` в браузере
- Страница не открывается

**Решения:**

1. **Проверьте HTTP сервер:**
```bash
# Проверка порта 8080
netstat -tulpn | grep :8080

# Запуск HTTP сервера
python3 -m http.server 8080
```

2. **Проверьте файлы:**
```bash
# Проверка существования файлов
ls -la presentation.html
ls -la controller-external.html
```

3. **Альтернативный HTTP сервер:**
```bash
# Использование npx
npx http-server -p 8080

# Или Node.js
npx serve -p 8080
```

### Презентация

#### Проблема: Слайды не переключаются

**Симптомы:**
- Анимации не работают
- Слайды не меняются при командах

**Решения:**

1. **Проверьте GSAP:**
```javascript
// В консоли браузера
console.log('GSAP версия:', gsap.version);

// Проверка анимаций
gsap.to('.test', { duration: 1, x: 100 });
```

2. **Проверьте Vue компоненты:**
```javascript
// В App.vue добавьте логирование
methods: {
  nextSlide() {
    console.log('Переход к следующему слайду');
    // ... код
  }
}
```

3. **Проверьте WebSocket сообщения:**
```javascript
// В консоли браузера
ws.onmessage = (event) => {
  console.log('Получено сообщение:', event.data);
  // ... обработка
};
```

#### Проблема: Анимации тормозят

**Симптомы:**
- Низкий FPS
- Анимации прерываются

**Решения:**

1. **Оптимизируйте GSAP:**
```javascript
// Используйте will-change
gsap.set('.element', { willChange: 'transform' });

// Очищайте анимации
gsap.killTweensOf('.element');
```

2. **Проверьте производительность:**
```javascript
// В консоли браузера
console.log('FPS:', performance.now());
```

### Контроллер

#### Проблема: Кнопки не работают

**Симптомы:**
- Клики не отправляют команды
- Нет реакции на нажатия

**Решения:**

1. **Проверьте JavaScript:**
```javascript
// В консоли браузера
console.log('WebSocket состояние:', ws.readyState);

// Проверка функций
console.log('Функция nextSlide:', typeof nextSlide);
```

2. **Проверьте HTML:**
```html
<!-- Убедитесь, что onclick привязан -->
<button onclick="nextSlide()">Вперед</button>
```

3. **Добавьте обработку ошибок:**
```javascript
function nextSlide() {
  try {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'next_slide' }));
    } else {
      console.error('WebSocket не подключен');
    }
  } catch (error) {
    console.error('Ошибка отправки команды:', error);
  }
}
```

### Сервер

#### Проблема: Высокое потребление памяти

**Симптомы:**
- Сервер медленно работает
- Ошибки "JavaScript heap out of memory"

**Решения:**

1. **Увеличьте лимит памяти:**
```bash
# Запуск с большим лимитом памяти
node --max-old-space-size=4096 src/server.js
```

2. **Проверьте утечки памяти:**
```javascript
// В server.js добавьте мониторинг
setInterval(() => {
  const used = process.memoryUsage();
  console.log('Память:', {
    rss: `${Math.round(used.rss / 1024 / 1024)} MB`,
    heapTotal: `${Math.round(used.heapTotal / 1024 / 1024)} MB`,
    heapUsed: `${Math.round(used.heapUsed / 1024 / 1024)} MB`
  });
}, 30000);
```

3. **Очищайте отключенные клиенты:**
```javascript
// В server.js
wss.on('connection', (ws) => {
  ws.on('close', () => {
    // Удаление клиента из хранилища
    removeClient(ws);
  });
});
```

#### Проблема: Много одновременных подключений

**Симптомы:**
- Ошибки "Too many open files"
- Сервер не принимает новые подключения

**Решения:**

1. **Увеличьте лимиты системы:**
```bash
# Проверка лимитов
ulimit -n

# Увеличение лимита файлов
ulimit -n 4096
```

2. **Добавьте ограничения:**
```javascript
// В server.js
const MAX_CLIENTS = 100;
let clientCount = 0;

wss.on('connection', (ws) => {
  if (clientCount >= MAX_CLIENTS) {
    ws.close(1013, 'Too many clients');
    return;
  }
  clientCount++;
  
  ws.on('close', () => {
    clientCount--;
  });
});
```

### Сеть

#### Проблема: Внешний доступ не работает

**Симптомы:**
- Локально работает, извне нет
- Таймауты подключения

**Решения:**

1. **Проверьте NAT:**
```bash
# Проверка проброса портов
telnet 109.197.125.39 8080
telnet 109.197.125.39 8090
```

2. **Проверьте файрвол:**
```bash
# Ubuntu/Debian
sudo ufw status
sudo ufw allow 8080
sudo ufw allow 8090

# Проверка с внешнего IP
curl -I http://109.197.125.39:8080
```

3. **Проверьте DNS:**
```bash
# Проверка резолвинга
nslookup 109.197.125.39
ping 109.197.125.39
```

### Браузер

#### Проблема: CORS ошибки

**Симптомы:**
- `Access to WebSocket at 'ws://...' from origin 'http://...' has been blocked by CORS policy`

**Решения:**

1. **Настройте CORS на сервере:**
```javascript
// В server.js
const wss = new WebSocket.Server({ 
  port: PORT,
  verifyClient: (info) => {
    // Разрешить все подключения
    return true;
  }
});
```

2. **Используйте HTTPS:**
```javascript
// Для продакшена используйте WSS
const ws = new WebSocket('wss://your-domain.com');
```

#### Проблема: Браузер не поддерживает WebSocket

**Симптомы:**
- `WebSocket is not defined`
- Ошибки в старых браузерах

**Решения:**

1. **Добавьте полифилл:**
```html
<script src="https://cdn.jsdelivr.net/npm/websocket-polyfill@latest/dist/websocket-polyfill.min.js"></script>
```

2. **Проверьте поддержку:**
```javascript
if (typeof WebSocket === 'undefined') {
  console.error('WebSocket не поддерживается');
  // Fallback на polling
}
```

### Логирование

#### Включение подробного логирования

```javascript
// В server.js
const DEBUG = process.env.NODE_ENV !== 'production';

function log(message, data = null) {
  if (DEBUG) {
    console.log(`[${new Date().toISOString()}] ${message}`, data);
  }
}

// Использование
log('Новое подключение', { clientType: 'presentation' });
```

#### Логирование в браузере

```javascript
// В презентации и контроллере
const DEBUG = true;

function log(message, data = null) {
  if (DEBUG) {
    console.log(`[${new Date().toISOString()}] ${message}`, data);
  }
}

// Использование
log('Отправка команды', { type: 'next_slide' });
```

### Диагностика

#### Скрипт диагностики

```bash
#!/bin/bash
# diagnostic.sh

echo "=== Диагностика системы презентаций ==="

echo "1. Проверка процессов..."
ps aux | grep -E "(node|python)" | grep -v grep

echo "2. Проверка портов..."
netstat -tulpn | grep -E ":(8080|8090)"

echo "3. Проверка файлов..."
ls -la presentation.html controller-external.html

echo "4. Проверка зависимостей..."
npm list --depth=0

echo "5. Проверка памяти..."
free -h

echo "6. Проверка диска..."
df -h

echo "=== Диагностика завершена ==="
```

#### Мониторинг в реальном времени

```bash
# Мониторинг процессов
watch -n 1 'ps aux | grep -E "(node|python)"'

# Мониторинг портов
watch -n 1 'netstat -tulpn | grep -E ":(8080|8090)"'

# Мониторинг логов
tail -f /var/log/presentation/*.log
```

### Контакты для поддержки

Если проблема не решается:

1. **Соберите информацию:**
   - Версия Node.js: `node --version`
   - Версия npm: `npm --version`
   - Логи ошибок
   - Скриншоты проблемы

2. **Создайте issue:**
   - Описание проблемы
   - Шаги для воспроизведения
   - Ожидаемое поведение
   - Фактическое поведение

3. **Проверьте документацию:**
   - README.md
   - API.md
   - DEVELOPMENT.md