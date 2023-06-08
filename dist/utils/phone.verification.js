"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtp = void 0;
const twilio_1 = __importDefault(require("twilio"));
const otp_generator_1 = __importDefault(require("otp-generator"));
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
const client = (0, twilio_1.default)(accountSid, authToken);
function sendOtp(phoneNumber) {
    const otp = otp_generator_1.default.generate(6, { digits: true, specialChars: false });
    client.messages.create({
        body: `Your one time OTP is: ${otp}`,
        from: twilioNumber,
        to: '+234' + phoneNumber.slice(1, phoneNumber.length)
    })
        .then((message) => {
        console.log(`OTP sent successfully. Message ID: ${message.sid}`);
    })
        .catch((error) => {
        console.error(`Error sending OTP: ${error}`);
    });
    return;
}
exports.sendOtp = sendOtp;
//# sourceMappingURL=phone.verification.js.map