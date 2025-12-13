import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
    name?: string;
    email?: string;
    image?: string;
    emailVerified?: Date;
}

const UserSchema: Schema = new Schema({
    name: { type: String },
    email: { type: String, unique: true, sparse: true },
    image: { type: String },
    emailVerified: { type: Date },
}, {
    timestamps: true,
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
