# 📡 API документация

## WebSocket API

### Подключение

**URL:** `ws://109.197.125.39:8090`

### Типы сообщений

#### 1. Регистрация клиента

**От клиента к серверу:**
```json
{
  "type": "register_client",
  "clientType": "presentation" | "controller"
}
```

**Ответ сервера:**
```json
{
  "type": "client_registered",
  "clientType": "presentation" | "controller",
  "message": "Клиент успешно зарегистрирован"
}
```

#### 2. Приветственное сообщение

**От сервера к клиенту:**
```json
{
  "type": "welcome",
  "message": "Добро пожаловать в систему презентаций!"
}
```

#### 3. Управление слайдами

**От контроллера к серверу:**
```json
{
  "type": "next_slide"
}
```

```json
{
  "type": "prev_slide"
}
```

```json
{
  "type": "go_to_slide",
  "slideIndex": 0
}
```

**От сервера к презентации:**
```json
{
  "type": "next_slide"
}
```

```json
{
  "type": "prev_slide"
}
```

```json
{
  "type": "go_to_slide",
  "slideIndex": 0
}
```

#### 4. Статистика подключений

**От контроллера к серверу:**
```json
{
  "type": "get_status"
}
```

**Ответ сервера:**
```json
{
  "type": "status_update",
  "presentationClients": 1,
  "controllerClients": 1,
  "totalClients": 2
}
```

#### 5. Ошибки

**От сервера к клиенту:**
```json
{
  "type": "error",
  "message": "Описание ошибки",
  "code": "ERROR_CODE"
}
```

### Коды ошибок

| Код | Описание |
|-----|----------|
| `INVALID_MESSAGE_TYPE` | Неизвестный тип сообщения |
| `INVALID_CLIENT_TYPE` | Неверный тип клиента |
| `NOT_REGISTERED` | Клиент не зарегистрирован |
| `INVALID_SLIDE_INDEX` | Неверный индекс слайда |

### Примеры использования

#### JavaScript клиент

```javascript
const ws = new WebSocket('ws://109.197.125.39:8090');

ws.onopen = () => {
  console.log('Подключение установлено');
  
  // Регистрация клиента
  ws.send(JSON.stringify({
    type: 'register_client',
    clientType: 'controller'
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  switch(data.type) {
    case 'client_registered':
      console.log('Клиент зарегистрирован');
      break;
    case 'status_update':
      console.log(`Презентаций: ${data.presentationClients}`);
      console.log(`Контроллеров: ${data.controllerClients}`);
      break;
    case 'error':
      console.error('Ошибка:', data.message);
      break;
  }
};

// Отправка команды
function nextSlide() {
  ws.send(JSON.stringify({
    type: 'next_slide'
  }));
}
```

#### Python клиент

```python
import websocket
import json

def on_message(ws, message):
    data = json.loads(message)
    print(f"Получено: {data}")

def on_error(ws, error):
    print(f"Ошибка: {error}")

def on_close(ws, close_status_code, close_msg):
    print("Соединение закрыто")

def on_open(ws):
    print("Подключение установлено")
    # Регистрация клиента
    ws.send(json.dumps({
        "type": "register_client",
        "clientType": "controller"
    }))

# Создание WebSocket соединения
websocket.enableTrace(True)
ws = websocket.WebSocketApp("ws://109.197.125.39:8090",
                          on_open=on_open,
                          on_message=on_message,
                          on_error=on_error,
                          on_close=on_close)

ws.run_forever()
```

### Состояния подключения

1. **Отключен** - клиент не подключен
2. **Подключение** - установка WebSocket соединения
3. **Ожидание регистрации** - соединение установлено, ожидается регистрация
4. **Зарегистрирован** - клиент зарегистрирован и готов к работе

### Обработка ошибок

- При потере соединения клиент должен переподключиться
- При получении ошибки логируйте её для отладки
- Неизвестные типы сообщений игнорируются

### Ограничения

- Максимум 100 одновременных подключений
- Таймаут неактивности: 5 минут
- Размер сообщения: до 1KB