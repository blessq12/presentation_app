# 🚀 Руководство по развертыванию

## Требования к системе

### Минимальные требования

- **Node.js** 18.0.0 или выше
- **Python** 3.7+ (для HTTP сервера)
- **npm** или **yarn**
- **Порт 8080** (HTTP) и **8090** (WebSocket) должны быть свободны

### Рекомендуемые требования

- **Node.js** 20.0.0+
- **4GB RAM**
- **10GB свободного места**
- **Стабильное интернет-соединение**

## Установка

### 1. Клонирование репозитория

```bash
git clone <repository-url>
cd present
```

### 2. Установка зависимостей

```bash
npm install
```

### 3. Проверка установки

```bash
node --version  # Должен быть 18.0.0+
npm --version   # Должен быть 8.0.0+
```

## Локальное развертывание

### Быстрый старт

```bash
# 1. Запуск WebSocket сервера
npm run server

# 2. В новом терминале - запуск HTTP сервера
npm run presentation

# 3. Открытие в браузере
# Презентация: http://localhost:8080/presentation.html
# Контроллер: http://localhost:8080/controller-external.html
```

### Альтернативные порты

```bash
# WebSocket на порту 8091
npm run server:8091

# HTTP на порту 8081
npm run presentation:8081
```

## Продакшн развертывание

### 1. Настройка сервера

```bash
# Обновление системы
sudo apt update && sudo apt upgrade -y

# Установка Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Установка PM2 для управления процессами
sudo npm install -g pm2
```

### 2. Настройка файрвола

```bash
# Открытие портов
sudo ufw allow 8080/tcp
sudo ufw allow 8090/tcp
sudo ufw enable
```

### 3. Настройка NAT

Настройте проброс портов на роутере:
- **8080** → **8080** (HTTP)
- **8090** → **8090** (WebSocket)

### 4. Развертывание с PM2

```bash
# Создание конфигурации PM2
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'presentation-server',
    script: 'src/server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 8090
    }
  }]
}
EOF

# Запуск с PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 5. Настройка nginx (опционально)

```bash
# Установка nginx
sudo apt install nginx

# Создание конфигурации
sudo nano /etc/nginx/sites-available/presentation
```

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /ws {
        proxy_pass http://localhost:8090;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
```

```bash
# Активация конфигурации
sudo ln -s /etc/nginx/sites-available/presentation /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Docker развертывание

### 1. Создание Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 8080 8090

CMD ["npm", "run", "server"]
```

### 2. Создание docker-compose.yml

```yaml
version: '3.8'

services:
  presentation:
    build: .
    ports:
      - "8080:8080"
      - "8090:8090"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    volumes:
      - ./public:/app/public
```

### 3. Запуск с Docker

```bash
# Сборка и запуск
docker-compose up -d

# Просмотр логов
docker-compose logs -f

# Остановка
docker-compose down
```

## Мониторинг и логирование

### PM2 мониторинг

```bash
# Просмотр статуса
pm2 status

# Просмотр логов
pm2 logs presentation-server

# Мониторинг в реальном времени
pm2 monit
```

### Логирование

```bash
# Создание директории для логов
mkdir -p logs

# Настройка ротации логов
sudo nano /etc/logrotate.d/presentation
```

```
/var/log/presentation/*.log {
    daily
    missingok
    rotate 7
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
}
```

## Резервное копирование

### Автоматическое резервное копирование

```bash
#!/bin/bash
# backup.sh

BACKUP_DIR="/backup/presentation"
DATE=$(date +%Y%m%d_%H%M%S)

# Создание резервной копии
tar -czf "$BACKUP_DIR/backup_$DATE.tar.gz" \
    --exclude=node_modules \
    --exclude=.git \
    .

# Удаление старых резервных копий (старше 7 дней)
find $BACKUP_DIR -name "backup_*.tar.gz" -mtime +7 -delete
```

```bash
# Добавление в cron
chmod +x backup.sh
crontab -e

# Добавить строку для ежедневного резервного копирования в 2:00
0 2 * * * /path/to/backup.sh
```

## Обновление

### Автоматическое обновление

```bash
#!/bin/bash
# update.sh

cd /path/to/presentation

# Остановка сервиса
pm2 stop presentation-server

# Получение обновлений
git pull origin main

# Установка зависимостей
npm install

# Перезапуск сервиса
pm2 start presentation-server

# Проверка статуса
pm2 status
```

## Устранение неполадок

### Частые проблемы

#### 1. Порт занят

```bash
# Проверка занятых портов
sudo netstat -tulpn | grep :8080
sudo netstat -tulpn | grep :8090

# Освобождение порта
sudo kill -9 <PID>
```

#### 2. Проблемы с WebSocket

```bash
# Проверка подключения
curl -I http://localhost:8080
wscat -c ws://localhost:8090
```

#### 3. Проблемы с памятью

```bash
# Мониторинг памяти
free -h
ps aux | grep node

# Перезапуск с ограничением памяти
pm2 restart presentation-server --max-memory-restart 1G
```

### Логи для отладки

```bash
# Просмотр логов PM2
pm2 logs presentation-server --lines 100

# Просмотр системных логов
sudo journalctl -u pm2-root -f

# Проверка статуса сервисов
systemctl status nginx
systemctl status pm2-root
```

## Безопасность

### Рекомендации по безопасности

1. **Используйте HTTPS** в продакшене
2. **Настройте файрвол** (ufw/iptables)
3. **Регулярно обновляйте** зависимости
4. **Мониторьте логи** на подозрительную активность
5. **Используйте переменные окружения** для конфиденциальных данных

### Настройка SSL

```bash
# Установка Certbot
sudo apt install certbot python3-certbot-nginx

# Получение SSL сертификата
sudo certbot --nginx -d your-domain.com

# Автоматическое обновление
sudo crontab -e
# Добавить: 0 12 * * * /usr/bin/certbot renew --quiet
```
