import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IForm extends Document {
    userId?: string;
    title: string;
    description?: string;
    content: any[]; // JSON content of the form
    published: boolean;
    slug?: string;
    visits: number;
    submissions: number;
    shareUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

const FormSchema: Schema = new Schema({
    userId: { type: String, required: false }, // Store generic string ID for now
    title: { type: String, required: true },
    description: { type: String },
    content: { type: Schema.Types.Mixed, required: true }, // Store array of fields
    published: { type: Boolean, default: false },
    slug: { type: String, unique: true, sparse: true },
    visits: { type: Number, default: 0 },
    submissions: { type: Number, default: 0 },
    shareUrl: { type: String },
}, {
    timestamps: true,
});

const Form: Model<IForm> = mongoose.models.Form || mongoose.model<IForm>('Form', FormSchema);

export default Form;
