import { Schema, model, models, type Model, Types } from "mongoose";

export type AppointmentStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface IAppointment {
    client: Types.ObjectId; // Reference to User
    barber: Types.ObjectId; // Reference to User (Role: barber)
    service: Types.ObjectId; // Reference to Service
    shop: Types.ObjectId; // Reference to Shop
    startTime: Date;
    endTime: Date;
    status: AppointmentStatus;
    recurring: boolean;
    recurringFrequency?: "weekly" | "biweekly" | "monthly";
    notes?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const AppointmentSchema = new Schema<IAppointment>(
    {
        client: { type: Schema.Types.ObjectId, ref: "User", required: true },
        barber: { type: Schema.Types.ObjectId, ref: "User", required: true },
        service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
        shop: { type: Schema.Types.ObjectId, ref: "Shop", required: true },
        startTime: { type: Date, required: true },
        endTime: { type: Date, required: true },
        status: {
            type: String,
            enum: ["pending", "confirmed", "cancelled", "completed"],
            default: "pending",
            required: true,
        },
        recurring: { type: Boolean, default: false },
        recurringFrequency: {
            type: String,
            enum: ["weekly", "biweekly", "monthly"],
        },
        notes: { type: String },
    },
    { timestamps: true }
);

// Indexing for faster queries
AppointmentSchema.index({ client: 1, startTime: 1 });
AppointmentSchema.index({ barber: 1, startTime: 1 });
AppointmentSchema.index({ shop: 1, startTime: 1 });

export const Appointment = (models.Appointment as Model<IAppointment>) || model<IAppointment>("Appointment", AppointmentSchema);
