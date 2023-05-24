
import { Document, Schema, model } from 'mongoose';

export interface UserDocument extends Document {
    name: string;
    avatar: string;
    cloudinary_id: string;
    email: string;
    password: string;
}

const userSchema = new Schema<UserDocument>({
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    cloudinary_id: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

export default model<UserDocument>('User', userSchema);

