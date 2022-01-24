import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const databaseURL = process.env.DATABASE_URL;


const connectDb = async () => {
    try {
        await mongoose.connect(databaseURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useCreateIndex: true,
            //useFindAndModify: false,
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

export default connectDb;
