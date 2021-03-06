import { config } from 'dotenv';
import { sendEmail } from '../../helpers/emailService';
import UpNext from '../../model/UpNext.js';

config();

const { SENDER_EMAIL } = process.env;

const toDo = {};
toDo.items = [];
let timerId;

const getNext = async () => {
    try {
        const result = await UpNext.aggregate(
            [
                {
                    $match: {
                        from: {
                            $gte: new Date()
                        }
                    }
                },
                 {
                     $group: {
                         _id: { group: "$from" },
                         upNexts: { $push: "$$ROOT" }
                     }
                 },
                {
                    $sort : { _id : 1}
                }, 
                {
                     $limit: 1
                 }
                ]
        );

        if (result.length === 0) {
            return 'Nothing to tick off'
        }
        
    return {
        timeToTickOff: result[0]._id.group,
        items: result[0].upNexts,
        }
    } catch (error) {
        console.log(error)
    }
};

export const tickOff = async () => {
    const { timeToTickOff, items } = await getNext();
    if (items && items.length > 0) {
        toDo.timeToTickOff = timeToTickOff;
        toDo.items = items;
        const timeLeft = new Date(timeToTickOff).getTime() - new Date().getTime();
        console.log(timeToTickOff, timeLeft)
        clearTimeout(timerId);
        
        timerId = setTimeout(() => {
            const requests = items.map(async(item) => {
                const { email, content, from, createdAt } = item;
                if (item && timeLeft > 0) {
                    const emailDetails = {
                        templateName: 'upNextReminder',
                        sender: SENDER_EMAIL,
                        receiver: email,
                        name: email.slice(0, email.indexOf('@')),
                        meta: `You whispered this on ${createdAt} and we echoed it when you wanted ${from}`,
                        content: `${content}`,
                      };
                      const dispatch = await sendEmail(emailDetails);
                      requests.push(dispatch)
                      toDo.items.splice(0, toDo.items.length);
                      console.log('done')
                } else {
                    console.log('no');
                }
        })
        Promise.all(requests)
    tickOff()
    }, timeLeft);

    } else {
        console.log('No Up Nexts')
    }
};

const lineUp = async (upNext) => {
    if (upNext && new Date(upNext.from) < new Date(toDo.timeToTickOff)) {
        await tickOff();
    } else 
    if (upNext && new Date(upNext.from).getTime() === new Date(toDo.timeToTickOff).getTime()) {
        
        toDo.items.push(upNext);
    }
    else {
        await tickOff();
    }
    
};

export const add = async (details) => {
    const { email, content, from, to } = details;
        const newItem = await UpNext.create({
            email,
            content,
            from: new Date(from),
        });
    await lineUp(newItem);

    return newItem;
};
