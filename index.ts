import cors from "cors";
import { configDotenv } from "dotenv";
import Express, {
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { checkAuthentication } from "./middlewares/auth.middleware";
import authRoutes from "./routes/auth.route";
import jobRoutes from "./routes/job.route";

configDotenv();

const app = Express();
app.disable("x-powered-by");
app.use(cors({ origin: "*" }));
app.use(json());
app.use(urlencoded({ extended: true }));

// Routes
app.get(
  "/verify-token",
  checkAuthentication,
  async (_: Request, res: Response, __: NextFunction) => {
    res.status(StatusCodes.OK).json({
      status: StatusCodes.ACCEPTED,
      message: ReasonPhrases.ACCEPTED,
    });
  }
);
app.use(authRoutes);
app.use(jobRoutes);

app.use((error: Error, _: Request, res: Response) => {
  res.status(500).json({
    error: 500,
    name: error.name,
    message: error.message,
    stack: error.stack,
  });
});

async function runServer() {
  const PORT = 3001;

  try {
    // Use this to create table
    // await sequelize.sync({ force: true });
    // await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
  }
}

runServer();
