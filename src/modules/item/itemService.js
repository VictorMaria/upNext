import { PrismaClient, Prisma } from '@prisma/client';

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
                    console.log(`id: ${item._id}\nuserId: ${item.content}\nstartTime: ${item.from}\ntriggerTime: ${new Date()}\n\n`);
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
