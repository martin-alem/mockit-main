import express, { Request, Response, Express } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();

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
} );



app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ status: 404, statusText: "fail", message: "The path you are requesting does not exist" });
});

const PORT: string = process.env.PORT || `4000`;
app.listen(PORT, () => {
  console.log(`Main Server Listening On Port ${PORT}`);
});
