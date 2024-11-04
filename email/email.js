import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.EMAIL_PASS
    }
});

const mailOption = (email, otp, subject, text) => {
    return {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: subject,
        text: otp ? `Your OTP is ${otp}` : text,
    };
};

export const sendMail = async (email, otp, subject, text) => {
    try {
        const data = mailOption(email, otp, subject, text);
        const info = await transporter.sendMail(data);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
