import express, { Request, Response, Express } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectionToDatabase from "./database/connection.js";
import questionRouter from "./routes/questionRouter.js";
import userRouter from "./routes/userRouter.js";
import profileRouter from "./routes/profileRouter.js";
import interviewRouter from "./routes/interviewRouter.js";

dotenv.config();

connectionToDatabase();

//Cors configuration
const corsOptions = {
  origin: true,
  credentials: true,
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app: Express = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "http://192.168.0.71:3000"],
    methods: ["GET", "POST"],
  },
});

app.use(cookieParser());

app.enable("trust proxy");
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ status: 200, statusText: "OK", payload: "Main server up and running" });
});

//Question resource
app.use("/api/v1/question", questionRouter);

//User resource
app.use("/api/v1/user", userRouter);

//Profile resource
app.use("/api/v1/profile", profileRouter);

//Interview resource
app.use("/api/v1/interview", interviewRouter);

// Socket io
io.on("connect", socket => {
  socket.on("create-room", payload => {
    const { roomId } = payload;
    socket.join(roomId);
    // const n = io.sockets.adapter.rooms.get(roomId);
    // if(n?.size === 1){}
    socket.to(roomId).emit("friend-in-lobby");
    socket.to(roomId).emit("friend-join");

    socket.on("sdp-offer", offer => {
      socket.to(roomId).emit("sdp-offer", offer);
    });
    socket.on("sdp-answer", answer => {
      socket.to(roomId).emit("sdp-answer", answer);
    });

    socket.on("ice-candidate", candidate => {
      socket.to(roomId).emit("ice-candidate", candidate);
    });

    socket.on("leave", () => {
      socket.to(roomId).emit("leave");
    });
  });
});

//fallback route
app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ status: 404, statusText: "fail", payload: "The path you are requesting does not exist" });
});

const PORT: string = process.env.PORT || `5000`;
httpServer.listen(PORT, () => {
  console.log(`Main Server Listening On Port ${PORT}`);
});
