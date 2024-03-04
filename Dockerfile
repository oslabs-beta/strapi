#DO NOT USE: Docker implementation not available. Wrk2 not easily implementable
FROM node:18.15

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN apt-get -y update \
    && apt-get -y install build-essential libssl-dev git zlib1g-dev

RUN git clone https://github.com/giltene/wrk2.git wrk2 \
    && cd wrk2 \
    && make

RUN mv wrk2/wrk /usr/local/bin/wrk2

COPY . .

EXPOSE 3100

CMD npm run dev