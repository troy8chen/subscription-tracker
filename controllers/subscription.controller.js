import Subscription from '../models/subscription.model.js'
import { workflowClient } from '../config/upstash.js'
import { SERVER_URL } from '../config/env.js'

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    // Calculate dates
    const startDate = new Date(req.body.startDate);
    const renewalDate = new Date(startDate);
    renewalDate.setMonth(renewalDate.getMonth() + 1);
    
    const reminderDate = new Date(renewalDate);
    reminderDate.setDate(reminderDate.getDate() - 7);

    // Trigger workflow with proper authentication
    const { workflowRunId } = await workflowClient.trigger({
      url: "http://127.0.0.1:8080/api/v1/workflows/subscription/reminder",
      body: {
        subscriptionId: subscription._id,
        renewalDate: renewalDate.toISOString()
      },
      headers: {
        'Authorization': `Bearer eyJVc2VySUQiOiJkZWZhdWx0VXNlciIsIlBhc3N3b3JkIjoiZGVmYXVsdFBhc3N3b3JkIn0=`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Workflow triggered with ID:', workflowRunId);  // Debug log

    return res.status(201).json({
      success: true,
      data: {
        subscription,
        workflowRunId  // Include this in response
      }
    });
  } catch (error) {
    console.error('Error:', error);
    next(error);
  }
}

export const getUserSubscriptions = async (req, res, next) => {
  try {
    // Check if the user is the same as the one in the token
    if(req.user.id !== req.params.id) {
      const error = new Error('You are not the owner of this account');
      error.status = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({ success: true, data: subscriptions });
  } catch (e) {
    next(e);
  }
}