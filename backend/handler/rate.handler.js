import { calculateRequestsPerDay } from "../methods/rateMethods.js";

export const rateCheckHandler = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Business logic
    await calculateRequestsPerDay(email);

    return res.status(200).json({
      success: true,
      message: "Request processed successfully",
    });
  } catch (error) {
    console.error("error-rate-limit", error);
    return res.status(500).json({ error: error.message });
  }
};

export default {
  rateCheckHandler,
};
