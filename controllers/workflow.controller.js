import dayjs from 'dayjs'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");
import Subscription from '../models/subscription.model.js';
import { sendReminderEmail } from '../utils/send-email.js'

const REMINDERS = [7, 5, 2, 1]

export const sendReminders = serve(async (context) => {
  try {
    const { subscriptionId } = context.requestPayload;
    console.log('Processing subscription:', subscriptionId); // Debug log

    const subscription = await fetchSubscription(context, subscriptionId);

    if(!subscription) {
      console.log('Subscription not found'); // Debug log
      return;
    }

    if(subscription.status !== 'active') {
      console.log('Subscription not active:', subscription.status); // Debug log
      return;
    }

    const renewalDate = dayjs(subscription.renewalDate);

    if(renewalDate.isBefore(dayjs())) {
      console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`);
      return;
    }

    for (const daysBefore of REMINDERS) {
      const reminderDate = renewalDate.subtract(daysBefore, 'day');

      if(reminderDate.isAfter(dayjs())) {
        await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate);
      }

      if (dayjs().isSame(reminderDate, 'day')) {
        await triggerReminder(context, `${daysBefore} days before reminder`, subscription);
      }
    }
  } catch (error) {
    console.error('Workflow error:', error);
    throw error;
  }
});

const fetchSubscription = async (context, subscriptionId) => {
  const subscription = await context.run('get subscription', async () => {
    const sub = await Subscription.findById(subscriptionId).populate('user', 'name email');
    console.log('Fetched subscription:', sub); // Debug log
    return sub;
  });
  return subscription;
}

const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} reminder at ${date}`);
  await context.sleepUntil(label, date.toDate());
}

const triggerReminder = async (context, label, subscription) => {
  return await context.run(label, async () => {
    console.log(`Triggering ${label} reminder`);
    console.log('Subscription data:', {
      email: subscription.user.email,
      name: subscription.name,
      status: subscription.status
    }); // Debug log

    try {
      await sendReminderEmail({
        to: subscription.user.email,
        type: label,
        subscription,
      });
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Email sending failed:', error);
      throw error;
    }
  });
}