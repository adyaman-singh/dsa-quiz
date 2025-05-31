import nodemailer from "nodemailer";
import dotenv from "dotenv";
import CryptoJS from "crypto-js";

dotenv.config({ path: '../.env' }); 

export const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendOTP = (recipientEmail, otp) => {
  if (!recipientEmail) return;
  const mailOptions = {
    from: process.env.EMAIL,
    to: recipientEmail,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
  };
  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error:", error);
      } else {
        console.log("OTP sent:", info.response);
      }
    });
  } catch (error) {
    console.log("error", error);
  }
};

export const decryptOTP = (encryptedOtp) => {
  const bytes = CryptoJS.AES.decrypt(encryptedOtp, process.env.secretKey);
  const decryptedOtp = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedOtp;
};
