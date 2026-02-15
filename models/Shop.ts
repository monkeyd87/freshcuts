import { Schema, model, models, type Model, Types } from "mongoose";

export interface IShop {
    name: string;
    owner: Types.ObjectId; // Reference to User
    description?: string;
    address: string;
    location?: {
        type: string;
        coordinates: number[];
    };
    images?: string[];
    contactEmail?: string;
    contactPhone?: string;
    hours?: {
        [key: string]: { open: string; close: string; closed: boolean };
    };
    rating?: number;
    reviewsCount?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const ShopSchema = new Schema<IShop>(
    {
        name: { type: String, required: true, trim: true },
        owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
        description: { type: String },
        address: { type: String, required: true },
        location: {
            type: { type: String, enum: ["Point"], default: "Point" },
            coordinates: { type: [Number], default: [0, 0] }, // [longitude, latitude]
        },
        images: [{ type: String }],
        contactEmail: { type: String },
        contactPhone: { type: String },
        hours: { type: Map, of: new Schema({ open: String, close: String, closed: Boolean }) },
        rating: { type: Number, default: 0 },
        reviewsCount: { type: Number, default: 0 },
    },
    { timestamps: true }
);

ShopSchema.index({ location: "2dsphere" });

export const Shop = (models.Shop as Model<IShop>) || model<IShop>("Shop", ShopSchema);
