import { Schema, model, models, type Model, Types } from "mongoose";

export interface IService {
    name: string;
    description?: string;
    price: number;
    duration: number; // in minutes
    imageUrl?: string;
    barber?: Types.ObjectId; // Reference to Barber (User)
    shop: Types.ObjectId; // Reference to Shop
    category?: string; // e.g. "Haircut", "Beard Trim", "Shaving", etc.
    active: boolean;
}

const ServiceSchema = new Schema<IService>(
    {
        name: { type: String, required: true },
        description: { type: String },
        price: { type: Number, required: true },
        duration: { type: Number, required: true }, // in minutes
        imageUrl: { type: String },
        barber: { type: Schema.Types.ObjectId, ref: "User" },
        shop: { type: Schema.Types.ObjectId, ref: "Shop", required: true },
        category: { type: String },
        active: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export const Service = (models.Service as Model<IService>) || model<IService>("Service", ServiceSchema);
