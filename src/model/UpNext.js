import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UpNextSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        isTickedOff: {
            type: Boolean,
            default: false,
        },
        from: {
            type: Date,
            required: true,
        },
        to: {
            type: Date,
        }
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    }
);

const UpNext = mongoose.model('UpNext', UpNextSchema);
export default UpNext;
