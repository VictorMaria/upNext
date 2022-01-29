FROM node:12.14.1-alpine3.11

RUN mkdir /upNext

ADD . /upNext

WORKDIR /upNext

RUN npm install

RUN npm run build

EXPOSE 2000

CMD ["npm", "start"]