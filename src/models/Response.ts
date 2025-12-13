import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IResponse extends Document {
    formId: mongoose.Types.ObjectId;
    content: any; // JSON content of the answers
    createdAt: Date;
}

const ResponseSchema: Schema = new Schema({
    formId: { type: Schema.Types.ObjectId, ref: 'Form', required: true },
    content: { type: Schema.Types.Mixed, required: true },
}, {
    timestamps: { createdAt: true, updatedAt: false },
});

const Response: Model<IResponse> = mongoose.models.Response || mongoose.model<IResponse>('Response', ResponseSchema);

export default Response;
