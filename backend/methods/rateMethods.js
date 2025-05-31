import User from "../models/user.model.js";

export const calculateRequestsPerDay = async (userEmail) => {
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    return;
  }

  const now = new Date();
  const lastRequest = user.lastRequestAt || new Date(0);
  const twentyFourHours = 24 * 60 * 60 * 1000;

  if (now - lastRequest > twentyFourHours) {
    user.requestCount = 1;
    user.lastRequestAt = now;
    await user.save();
  } else {
    if (user.requestCount >= 3) {
      throw new Error(
        "Rate limit exceeded 😬. You can only make 3 calls per 24 hours."
      );
    }

    user.requestCount += 1;
    user.lastRequestAt = now;
    await user.save();
  }
};
