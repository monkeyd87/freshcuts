import { Schema, model, models, type Model, Types } from "mongoose";

export interface IAiPreview {
    user: Types.ObjectId; // Reference to User
    originalImageUrl: string;
    previewImageUrl: string;
    styleRequested: string;
    status: "pending" | "completed" | "failed";
    createdAt?: Date;
}

const AiPreviewSchema = new Schema<IAiPreview>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        originalImageUrl: { type: String, required: true },
        previewImageUrl: { type: String },
        styleRequested: { type: String, required: true },
        status: {
            type: String,
            enum: ["pending", "completed", "failed"],
            default: "pending",
        },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

export const AiPreview = (models.AiPreview as Model<IAiPreview>) || model<IAiPreview>("AiPreview", AiPreviewSchema);
