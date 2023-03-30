#DO NOT USE: Docker implementation not available. Wrk2 not easily implementable
FROM node:18.15

WORKDIR /app

COPY package*.json .

RUN npm install

CMD ["npm", "run", "dev"]