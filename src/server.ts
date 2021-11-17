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

const app: Express = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(cookieParser());

//Cors configuration
const corsOptions = {
  origin: true,
  credentials: true,
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.enable("trust proxy");
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ status: 200, statusText: "OK", message: "Main server up and running" });
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
  console.log("Client connected to socket");
});

//fallback route
app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ status: 404, statusText: "fail", message: "The path you are requesting does not exist" });
});

const PORT: string = process.env.PORT || `5000`;
httpServer.listen(PORT, () => {
  console.log(`Main Server Listening On Port ${PORT}`);
});
