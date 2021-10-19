import emailjs from "emailjs-com";
import { init } from "emailjs-com";

export const sendEmail = async (templateId, variables) => {
  init(process.env.REACT_APP_EMAIL_ID);
  return await emailjs.send("gmail", templateId, {
    subject: variables.subject,
    message: variables.message,
    contact_name: variables.name,
    reply_to: variables.email,
    contact_mail: variables.email
  });
};
