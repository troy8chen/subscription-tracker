import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription name is required'],
        trim: true,
        minlength: [2, 'Subscription name must be at least 3 characters long'],
        maxlength: [100, 'Subscription name must be less than 100 characters'],
    },
    price: {
        type: Number,
        required: [true, 'Subscription price is required'],
        min: [0, 'Subscription price must be greater than 0'],
        max: [1000, 'Subscription price must be less than 1000'],
    },
    currency: {
        type: String,
        required: [true, 'Subscription currency is required'],
        enum: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'NZD', 'CHF', 'JPY', 'CNY', 'INR', 'BRL', 'ARS', 'CLP', 'COP', 'MXN', 'PEN', 'PYG', 'UYU', 'VEF', 'VND', 'ZAR'],
    },
    frequency: {
        type: String,
        required: [true, 'Subscription frequency is required'],
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
    },
    category: {
        type: String,
        required: [true, 'Subscription category is required'],
        enum: ['sport', 'lifestyle', 'news', 'finance', 'technology', 'food', 'entertainment', 'transportation', 'shopping', 'other'],
    },
    paymentMethod: {
        type: String,
        required: [true, 'Subscription payment method is required'],
        trim: true,
    },
    status: {
        type: String,
        required: [true, 'Subscription status is required'],
        enum: ['active', 'inactive', 'cancelled', 'paused', 'expired'],
        default: 'active',
    },
    startDate: {
        type: Date,
        required: [true, 'Subscription start date is required'],
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start date must be in the past',
        },
    },
    renewalDate: {
        type: Date,
        required: [true, 'Subscription renewal date is required'],
        validate: {
            validator: function(value) {
                return value >= this.startDate;
            },
            message: 'Renewal date must be after start date',
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Subscription user is required'],
        index: true,
    },
}, { timestamps: true });

// Auto-calculate renewal date based on frequency
subscriptionSchema.pre('save', function(next) { 
    if (!this.renewalDate) {
        const renewlPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewlPeriods[this.frequency]);
    }

    // Auto-update status if renewal date has passed
    if (this.renewalDate < new Date()) {
        this.status = 'expired';
    }

    next();
});



const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default subscriptionSchema;