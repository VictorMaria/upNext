import crypto from 'crypto';

export const generateId = () => {
    return `${crypto.randomBytes(17).toString('hex')}`;
};
