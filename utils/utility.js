import { validationResult } from "express-validator";
import client from "./twilioConnection.js";

export const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOtp = async (number,otp) => {
    try {
        const message = await client.messages.create({
            body: `Your OTP code is: ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: number,
        });
        return { success: true, otp, messageSid: message.sid };
    } catch (error) {
        console.error('Error sending OTP:', error);
        return { success: false, error: error.message };
    }
};

export const validations=(req)=>{
    const validationErr= validationResult(req)
    if (!validationErr.isEmpty()) {
      return res.status(400).json({ errors: validationErr.array() });
    }
}


