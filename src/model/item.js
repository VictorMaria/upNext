import mongoose from'mongoose';

const Schema = mongoose.Schema;

const ItemSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        content: {
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

const Item = mongoose.model('Item', ItemSchema);

export default Item;
