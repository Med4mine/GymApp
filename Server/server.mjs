import express from "express";
const app = express();
import cookieParser from "cookie-parser";
app.use(cookieParser());
app.use(express.json());
//.env
import dotenv from "dotenv";
dotenv.config();
const port = process.env.port || 3000;
//midlwate
import authMiddleware from "./Functions/AuthFunctions/authMiddleware.mjs";
//data base related
import mongoose from "mongoose";
mongoose.connect(process.env.MongooseLink);
//Cros platform
import cors from "cors";

const corsOptions = {
  origin: [
    "http://localhost:5173", // for local dev
    "https://gym-app-frontend-omega.vercel.app", // deployed frontend
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

//routes import
import RegisterRoute from "./Routes/AuthRoutes/registerRoute.mjs";
import LoginRoute from "./Routes/AuthRoutes/loginRoute.mjs";
import RefreshAdminTokenRoute from "./Routes/AdminRoutes/RefreshAdminTokenRoute.mjs";
import AddMemberRoute from "./Routes/MemberRoutes/addmemberRoute.mjs";
import GetAllMembersRoute from "./Routes/MemberRoutes/GetAllMembersRoute.mjs";
import RenewSubscriptionRoute from "./Routes/MemberRoutes/RenewSubscriptionRoute.mjs";
import DeleteSubscriptionRoute from "./Routes/MemberRoutes/DeleteSubscriptionRoute.mjs";
import EndedSubscriptionRoute from "./Routes/MemberRoutes/EndedSubscriptionRoute.mjs";
import NbreOfMembersRoute from "./Routes/MemberRoutes/NbreOfMembersRoute.mjs";
import NbreOfEndedSubMembersRoute from "./Routes/MemberRoutes/NbreOfEndedSubRoute.mjs";
//Routes
app.use("/register", RegisterRoute);
app.use("/login", LoginRoute);
app.use("/refreshAdminToken", RefreshAdminTokenRoute);
app.use("/addMember", authMiddleware, AddMemberRoute);
app.use("/getAllMembers", authMiddleware, GetAllMembersRoute);
app.use("/renewSubscription", authMiddleware, RenewSubscriptionRoute);
app.use("/deleteSubscription", authMiddleware, DeleteSubscriptionRoute);
app.use("/endedSubscription", authMiddleware, EndedSubscriptionRoute);
app.use("/nbreOfMembers", NbreOfMembersRoute);
app.use("/nbreOfEndedSubMembers", NbreOfEndedSubMembersRoute);

//Admin dashboard
app.post("/AdminDashboard", authMiddleware, (req, res) => {
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  return res.status(200).json({ AccessToken: token });
});

app.listen(port, () => {
  console.log("server running ...");
});
