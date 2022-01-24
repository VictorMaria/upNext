import express from 'express';
import cors from 'cors';
import { tickOff } from './modules/item/itemService';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get('/', (req, res) => {
    res.status(200).json({ message: 'You whisper, we echo when you want' });
});

tickOff();

setInterval(() => {
    console.log('Time flees like a thief, tick by tick');
}, 1800000);

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => console.log(`It's Up Next on Port ${PORT}`));
