import { createServer } from "http";
import { WebSocketServer } from "ws";

const server = createServer();
const wss = new WebSocketServer({ server });

// Хранилище клиентов по типам
const clients = {
  presentation: new Set(), // Клиенты для просмотра слайдов
  controller: new Set(), // Клиенты-контроллеры
};

wss.on("connection", (ws) => {
  console.log("Новый клиент подключился");

  // Отправляем приветствие
  ws.send(
    JSON.stringify({
      type: "welcome",
      message: "Добро пожаловать! Укажите тип клиента.",
      timestamp: new Date().toISOString(),
    })
  );

  ws.on("message", (data) => {
    try {
      const message = JSON.parse(data);
      console.log("Получено сообщение:", message);

      switch (message.type) {
        case "register_client":
          // Регистрация типа клиента
          const clientType = message.clientType;
          if (clientType === "presentation" || clientType === "controller") {
            clients[clientType].add(ws);
            ws.clientType = clientType;

            ws.send(
              JSON.stringify({
                type: "client_registered",
                clientType: clientType,
                timestamp: new Date().toISOString(),
              })
            );

            console.log(`Клиент зарегистрирован как: ${clientType}`);
            console.log(`Статистика: ${clients.presentation.size} презентаций, ${clients.controller.size} контроллеров`);
          }
          break;

        case "next_slide":
          broadcastToType("presentation", {
            type: "next_slide",
            timestamp: new Date().toISOString(),
          });
          break;

        case "prev_slide":
          broadcastToType("presentation", {
            type: "prev_slide",
            timestamp: new Date().toISOString(),
          });
          break;

        case "go_to_slide":
          broadcastToType("presentation", {
            type: "go_to_slide",
            slideIndex: message.slideIndex,
            timestamp: new Date().toISOString(),
          });
          break;

        case "get_status":
          // Отправляем статус всем контроллерам
          broadcastToType("controller", {
            type: "status_update",
            presentationClients: clients.presentation.size,
            controllerClients: clients.controller.size,
            timestamp: new Date().toISOString(),
          });
          break;

        default:
          ws.send(
            JSON.stringify({
              type: "error",
              message: "Неизвестный тип сообщения",
              timestamp: new Date().toISOString(),
            })
          );
      }
    } catch (error) {
      console.error("Ошибка парсинга сообщения:", error);
      ws.send(
        JSON.stringify({
          type: "error",
          message: "Неверный формат JSON",
          timestamp: new Date().toISOString(),
        })
      );
    }
  });

  ws.on("close", () => {
    console.log("Клиент отключился");
    // Удаляем из соответствующего типа
    if (ws.clientType && clients[ws.clientType]) {
      clients[ws.clientType].delete(ws);
      console.log(`Клиент ${ws.clientType} отключен. Осталось: ${clients[ws.clientType].size}`);
    }
  });

  ws.on("error", (error) => {
    console.error("Ошибка WebSocket:", error);
  });
});

function broadcastToType(clientType, message) {
  const messageStr = JSON.stringify(message);
  clients[clientType].forEach((client) => {
    if (client.readyState === 1) {
      // WebSocket.OPEN = 1
      client.send(messageStr);
    }
  });
}

// Периодическая отправка статуса контроллерам
setInterval(() => {
  broadcastToType("controller", {
    type: "status_update",
    presentationClients: clients.presentation.size,
    controllerClients: clients.controller.size,
    timestamp: new Date().toISOString(),
  });
}, 5000);

const PORT = process.env.PORT || 8090;
const HOST = process.env.HOST || "0.0.0.0";

server.listen(PORT, HOST, () => {
  console.log(`🎮 WebSocket сервер запущен на ${HOST}:${PORT}`);
  console.log(`🌐 Внешний доступ: ws://109.197.125.39:${PORT}`);
  console.log("📋 Доступные команды:");
  console.log("- register_client: регистрация типа клиента (presentation/controller)");
  console.log("- next_slide: следующий слайд");
  console.log("- prev_slide: предыдущий слайд");
  console.log("- go_to_slide: перейти к слайду");
  console.log("- get_status: получить статус подключений");
});
