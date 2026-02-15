import { Schema, model, models, type Model, Types } from "mongoose";

export interface ISubscription {
    user: Types.ObjectId; // Reference to User
    plan: "free" | "pro" | "enterprise";
    status: "active" | "canceled" | "past_due" | "incomplete";
    stripeSubscriptionId: string;
    stripePriceId: string;
    currentPeriodEnd: Date;
    cancelAtPeriodEnd: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const SubscriptionSchema = new Schema<ISubscription>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
        plan: {
            type: String,
            enum: ["free", "pro", "enterprise"],
            required: true,
        },
        status: {
            type: String,
            enum: ["active", "canceled", "past_due", "incomplete"],
            required: true,
        },
        stripeSubscriptionId: { type: String, required: true, index: true },
        stripePriceId: { type: String, required: true },
        currentPeriodEnd: { type: Date, required: true },
        cancelAtPeriodEnd: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const Subscription = (models.Subscription as Model<ISubscription>) || model<ISubscription>("Subscription", SubscriptionSchema);
