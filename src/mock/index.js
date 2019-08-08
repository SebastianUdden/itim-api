import models from "../models";
import { uuidv4 } from "../utils/uuid";

export const createMockModel = async model => {
  // USERS
  const user0 = new models.User({
    username: "Default",
    tims: 0,
    createdAt: new Date()
  });

  // SWITCH
  switch (model) {
    case "User":
      await user0.save();
      break;
    default:
      return;
  }
};
