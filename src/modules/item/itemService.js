import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import { generateId } from '../../helpers/generateId';
import { sendEmail } from '../../helpers/emailService';

config();

const { SENDER_EMAIL } = process.env;

const prisma = new PrismaClient();

const toDo = {};
toDo.items = [];
let timerId;

const getNext = async () => {
    try {
        const items = await prisma.item.findMany(
            {
                where: {
                    from: {
                        gte: new Date(),
                    },
                },
            }
        );
    
    return items;
    } catch (error) {
        console.log(error)
    }
};

export const tickOff = async () => {
    const items = await getNext();
    
    if (items && items.length > 0) {
        const { from: timeToTickOff } = items[0];
        toDo.timeToTickOff = timeToTickOff;
        toDo.items = items;
        const timeLeft = new Date(timeToTickOff).getTime() - new Date().getTime();
        clearTimeout(timerId);
        
        timerId = setTimeout(() => {
            for (let item of items) {
                
                if (item && timeLeft > 0) {
                    const { email, content, createdAt, from } = item;
                    const emailDetails = {
                        templateName: 'upNextReminder',
                        sender: SENDER_EMAIL,
                        receiver: email,
                        name: `${email.slice(0, email.indexOf('@'))}`,
                        meta: `You whispered this on ${createdAt} and we echoed it when you wanted ${from}`,
                        content: `${content}`,
                      };
                      sendEmail(emailDetails); 
                } else {
                    console.log('no');
                }
        }
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

export const add = async(details) => {
    const { email, content, from, to } = details;
    const newItem = await prisma.item.create({
        data: {
            id: generateId(),
            email,
            content,
            from: new Date(from),
        }
    });
        await lineUp(newItem);

        return newItem;
};
