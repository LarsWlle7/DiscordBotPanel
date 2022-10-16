import express from "express";
import ws from "ws";
import config from "./config.json";
import http from "http";
import { WSConsoleListener } from "./ws/console";
import { MainRouter } from "./routers";
import { logger } from "./managers/logger";

const app = express();
const server = http.createServer(app);
const wss = new ws.Server({ port: config.port + 1 });

wss.on("connection", (socket) => {
  socket.send(JSON.stringify({ required_resource: "path" }));
  let connected = false;
  socket.on("message", (msg) => {
    const message = JSON.parse(msg.toString());
    if (message.password === config.socketPassword && message.route === "console") {
      logger.info(`new connection with console socket.`);
      WSConsoleListener(socket);
      connected = true;
    } else {
      if (!connected) {
        socket.send(JSON.stringify({ msg: "Failed. No password and route found." }));
        logger.warn("New connection, didn't receive a password nor route.");
        socket.close(3000);
      }
    }
  });
});

app.use(express.static(__dirname.replace("src", "").replace("dist", "") + "views/global/public"));
app.set("view engine", "ejs");

app.use("/", MainRouter);

server.listen(config.port, () => {
  console.log("online.");
});
