import moment from "moment/moment.js";
import { Member } from "../../DB_Schema/memberSchema.mjs";
import { promises as fsPromises } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const registerMember = async (req, res) => {
  const { firstName, lastName, phoneNumber, dateOfBirth, specialty } = req.body;

  const subscriptionDay = moment().format("MM-DD-YYYY");
  const endSubscriptionDay = moment().add(1, "month").format("MM-DD-YYYY");

  await fsPromises.appendFile(
    path.join(__dirname, "..", "..", "..", "..", "Members.txt"),
    `${firstName}-${lastName}\t/ ${phoneNumber}\t /${dateOfBirth}\t /${specialty}\t /${subscriptionDay}->${endSubscriptionDay}\n`,
    (err) => {
      console.log("Error has accured:", err);
    }
  );
  const newMember = new Member({
    firstName,
    lastName,
    phoneNumber,
    dateOfBirth,
    specialty,
    subscriptionDay,
    endSubscriptionDay,
  });
  newMember
    .save()
    .then(console.log("Member Saved"))
    .catch((err) => {
      console.log(err);
    });
};
export default registerMember;
