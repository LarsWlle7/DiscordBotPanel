import { WebSocket } from "ws";
import { Events } from "../managers/EventManager";
import { logger } from "../managers/logger";

const messages: {}[] = [];

Events.on("console_message", (time, type, message) => {
  messages.push({ time, type, message });
});

export const WSConsoleListener = (socket: WebSocket) => {
  socket.send(JSON.stringify({ msg: "Done", action: "SOCKET_CONSOLE_CONNECTED" }));
  socket.send(JSON.stringify({ messages, type: "INITIAL" }));
  socket.on("message", (message) => {
    logger.warn(`Unexpectedly got message: ${message.toString()}`);
    logger.warn(`Closing socket: unexpectedly received message.`);
    socket.close(1003);
  });
  Events.on("console_message", (time, type, message) => {
    if (!socket) return;
    socket.send(JSON.stringify({ data: { time, type, message }, origin: "console", type: "NEW" }));
  });
};
