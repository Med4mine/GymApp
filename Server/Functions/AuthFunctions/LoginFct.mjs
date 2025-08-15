import { Admin } from "../../DB_Schema/adminSchema.mjs";
import { Member } from "../../DB_Schema/memberSchema.mjs";
import { Trainer } from "../../DB_Schema/trainerSchema.mjs";
import jwt from "jsonwebtoken";
const Login = async (req, res) => {
  const { username, password } = req.body;

  const foundAdmin = await Admin.findOne({ username: username });
  if (!foundAdmin) {
    console.log("Admin Doen't exist at all!");
    return res.status(400).send(false);
  } else if (foundAdmin && foundAdmin.password != password) {
    console.log("Password uncorrect!");
    return res.status(400).send(false);
  }

  console.log(username);
  const AccessToken = jwt.sign(
    { username: username },
    process.env.SecretAccessToken,
    { expiresIn: "1m" }
  );
  const RefreshToken = jwt.sign(
    { username: username },
    process.env.SecretRefreshToken,
    { expiresIn: "7d" }
  );
  res.cookie("jwt", RefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });
  return res.status(200).json({ AccessToken: AccessToken });
};

export default Login;
