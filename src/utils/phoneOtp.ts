import { log } from 'console';
import twilio from 'twilio';

const accountSid =  process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER
const client = twilio(accountSid, authToken);

export function sendOtp (phoneNumber: string, otp: string): void {

  client.messages.create({
    body: `Your one time OTP is: ${otp}`,
    from: twilioNumber,
    to: '+234' + phoneNumber.slice(1, phoneNumber.length)
  })
  .then((message: any) => {
    // console.log(`OTP sent successfully. Message ID: ${message.sid}`);
  })
  .catch((error: any) => {
    console.error(`Error sending OTP: ${error}`);
  });
  return
}

