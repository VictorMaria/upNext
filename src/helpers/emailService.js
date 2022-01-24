import sendGrid from '@sendgrid/mail';
import { config } from 'dotenv';

config();

const { SENDGRID_API_KEY, UPNEXT_REMINDER_TEMPLATE } = process.env;

sendGrid.setApiKey(SENDGRID_API_KEY);

const upNextReminder = UPNEXT_REMINDER_TEMPLATE;
const templates = {
  upNextReminder,
};

export const sendEmail = async (data) => {
  const message = {
    from: data.sender,
    to: data.receiver,
    templateId: templates[data.templateName],
    dynamic_template_data: {
      name: data.name,
      meta: data.meta,
      content: data.content,
    },
  };
  try {
    await sendGrid.send(message); 
  } catch (error) {
    console.log(error);
  }
};
