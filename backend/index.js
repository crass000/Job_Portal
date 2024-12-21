import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user_route.js";
import companyRoute from "./routes/company_route.js";
import jobRoute from "./routes/job_routes.js";
import applicationRoute from "./routes/application_route.js";

dotenv.config({});
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
// const corsOptions = {
//   origin: ["https://jobportalfrontend-six.vercel.app", "http://localhost:5173"], // Replace with your frontend domains
//   credentials: true, // Allow credentials
// };
// app.use(cors(corsOptions));

app.use(cors({
  origin:"https://jobportalfrontend-six.vercel.app",
  credentials:true,
}))

app.use(cors());

const PORT = process.env.PORT || 3000;

//api's
app.get("/", (req,res)=> {
  res.status(200).json({msg : 'Welcome from backend'})
})
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at Port ${PORT}`);
});
