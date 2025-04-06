FROM node:latest
WORKDIR /petmatch-api

COPY package.json yarn.lock ./


COPY . .
RUN rm -rf node_modules

RUN apt-get update && apt-get install -y python3 make g++
RUN yarn install

RUN npx prisma generate

# RUN yarn seed

CMD ["yarn", "start"]
EXPOSE 3333